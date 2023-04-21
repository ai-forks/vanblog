"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PipelineProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineProvider = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_1 = require("../../types/event");
const sleep_1 = require("../../utils/sleep");
const child_process_1 = require("child_process");
const index_1 = require("../../config/index");
const fs_1 = require("fs");
const child_process_2 = require("child_process");
const log_provider_1 = require("../log/log.provider");
let PipelineProvider = PipelineProvider_1 = class PipelineProvider {
    constructor(pipelineModel, logProvider) {
        this.pipelineModel = pipelineModel;
        this.logProvider = logProvider;
        this.logger = new common_2.Logger(PipelineProvider_1.name);
        this.idLock = false;
        this.runnerPath = index_1.config.codeRunnerPath;
        this.init();
    }
    checkEvent(eventName) {
        if (event_1.VanblogSystemEventNames.includes(eventName)) {
            return true;
        }
        return false;
    }
    async checkAllDeps() {
        this.logger.log('初始化流水线代码库，这可能需要一段时间');
        const pipelines = await this.getAll();
        const deps = [];
        for (const pipeline of pipelines) {
            for (const dep of pipeline.deps) {
                if (!deps.includes(dep)) {
                    deps.push(dep);
                }
            }
        }
        await this.addDeps(deps);
    }
    async saveAllScripts() {
        const pipelines = await this.getAll();
        for (const pipeline of pipelines) {
            await this.saveOrUpdateScriptToRunnerPath(pipeline.id, pipeline.script);
        }
    }
    async init() {
        this.checkAllDeps();
        await this.saveAllScripts();
    }
    async getNewId() {
        while (this.idLock) {
            await (0, sleep_1.sleep)(10);
        }
        this.idLock = true;
        const maxObj = await this.pipelineModel.find({}).sort({ id: -1 }).limit(1);
        let res = 1;
        if (maxObj.length) {
            res = maxObj[0].id + 1;
        }
        this.idLock = false;
        return res;
    }
    async createPipeline(pipeline) {
        if (!this.checkEvent(pipeline.eventName)) {
            throw new common_1.NotFoundException('Event not found in VanblogEventNames');
        }
        const id = await this.getNewId();
        let script = pipeline.script;
        if (!script || !script.trim()) {
            script = `
// 异步任务，请在脚本顶层使用 await，不然会直接被忽略
// 请使用 input 变量获取数据（如果有）
// 直接修改 input 里的内容即可
// 脚本结束后 input 将被返回

`;
        }
        const newPipeline = await this.pipelineModel.create(Object.assign(Object.assign({ id }, pipeline), { script }));
        await newPipeline.save();
        await this.saveOrUpdateScriptToRunnerPath(id, newPipeline.script);
        await this.addDeps(newPipeline.deps);
    }
    async updatePipelineById(id, updateDto) {
        await this.pipelineModel.updateOne({ id: id }, updateDto);
        if (updateDto.script) {
            await this.saveOrUpdateScriptToRunnerPath(id, updateDto.script);
        }
        if (updateDto.deps) {
            await this.addDeps(updateDto.deps);
        }
    }
    async deletePipelineById(id) {
        await this.pipelineModel.updateOne({ id: id }, {
            deleted: true,
        });
        await this.deleteScriptById(id);
    }
    async getAll() {
        return await this.pipelineModel.find({
            deleted: false,
        });
    }
    async getPipelineById(id) {
        return await this.pipelineModel.findOne({ id: id });
    }
    async getPipelinesByEvent(eventName) {
        return await this.pipelineModel.find({
            eventName,
            deleted: false,
        });
    }
    async triggerById(id, data) {
        const result = await this.runCodeByPipelineId(id, data);
        return result;
    }
    async dispatchEvent(eventName, data) {
        const pipelines = await this.getPipelinesByEvent(eventName);
        const results = [];
        for (const pipeline of pipelines) {
            if (pipeline.enabled) {
                try {
                    const result = await this.runCodeByPipelineId(pipeline.id, data);
                    results.push(result);
                }
                catch (e) {
                    this.logger.error(e);
                }
            }
        }
        return results;
    }
    getPathById(id) {
        return `${this.runnerPath}/${id}.js`;
    }
    async runCodeByPipelineId(id, data) {
        const pipeline = await this.getPipelineById(id);
        if (!pipeline) {
            throw new common_1.NotFoundException('Pipeline not found');
        }
        const traceId = new Date().getTime();
        this.logger.log(`[${traceId}]开始运行流水线: ${id} ${JSON.stringify(data, null, 2)}`);
        const run = new Promise((resolve, reject) => {
            const subProcess = (0, child_process_2.fork)(this.getPathById(id));
            subProcess.send(data || {});
            subProcess.on('message', (msg) => {
                if (msg.status === 'error') {
                    subProcess.kill('SIGINT');
                    reject(msg);
                }
                else {
                    resolve(msg);
                }
            });
        });
        try {
            const result = (await run);
            this.logger.log(`[${traceId}]运行流水线成功: ${id} ${JSON.stringify(result, null, 2)}`);
            this.logProvider.runPipeline(pipeline, data, result);
            return result;
        }
        catch (err) {
            this.logger.error(`[${traceId}]运行流水线失败: ${id} ${JSON.stringify(err, null, 2)}`);
            this.logProvider.runPipeline(pipeline, data, undefined, err);
            throw err;
        }
    }
    async addDeps(deps) {
        for (const dep of deps) {
            try {
                const r = (0, child_process_1.spawnSync)(`pnpm`, ['add', dep], {
                    cwd: this.runnerPath,
                    shell: process.platform === 'win32',
                    env: Object.assign({}, process.env),
                });
                console.log(r.output.toString());
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async deleteScriptById(id) {
        const filePath = this.getPathById(id);
        try {
            (0, fs_1.rmSync)(filePath);
        }
        catch (err) {
            this.logger.error(err);
        }
    }
    async saveOrUpdateScriptToRunnerPath(id, script) {
        const filePath = this.getPathById(id);
        const scriptToSave = `
      let input = {};
      let logs = [];
      const oldLog = console.log;
      console.log = (...args) => {
        const logArr = [];
        for (const each of args) {
          if (typeof each === 'object') {
            logArr.push(JSON.stringify(each,null,2));
          } else {
            logArr.push(each);
          }
        }
        logs.push(logArr.join(" "));
        oldLog(...args);
      };
      process.on('message',async (msg) => {
        input = msg;
        try {
          ${script}
          process.send({
            status: 'success',
            output: input,
            logs,
          });
        } catch(err) {
          process.send({
            status: 'error',
            output: err,
            logs,
          });
        }
      });
    `;
        (0, fs_1.writeFileSync)(filePath, scriptToSave, { encoding: 'utf-8' });
    }
};
PipelineProvider = PipelineProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Pipeline')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        log_provider_1.LogProvider])
], PipelineProvider);
exports.PipelineProvider = PipelineProvider;
