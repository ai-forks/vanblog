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
var WalineProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalineProvider = void 0;
const common_1 = require("@nestjs/common");
const node_child_process_1 = require("node:child_process");
const config_1 = require("../../config");
const crypto_1 = require("../../utils/crypto");
const meta_provider_1 = require("../meta/meta.provider");
const setting_provider_1 = require("../setting/setting.provider");
let WalineProvider = WalineProvider_1 = class WalineProvider {
    constructor(metaProvider, settingProvider) {
        this.metaProvider = metaProvider;
        this.settingProvider = settingProvider;
        this.ctx = null;
        this.logger = new common_1.Logger(WalineProvider_1.name);
        this.env = {};
    }
    mapConfig2Env(config) {
        const walineEnvMapping = {
            'smtp.port': 'SMTP_PORT',
            'smtp.host': 'SMTP_HOST',
            'smtp.user': 'SMTP_USER',
            'sender.name': 'SENDER_NAME',
            'sender.email': 'SENDER_EMAIL',
            'smtp.password': 'SMTP_PASS',
            authorEmail: 'AUTHOR_EMAIL',
            webhook: 'WEBHOOK',
            forceLoginComment: 'LOGIN',
        };
        const result = {};
        if (!config) {
            return result;
        }
        for (const key of Object.keys(config)) {
            if (key == 'forceLoginComment') {
                if (config.forceLoginComment) {
                    result['LOGIN'] = 'force';
                }
            }
            else if (key == 'otherConfig') {
                if (config.otherConfig) {
                    try {
                        const data = JSON.parse(config.otherConfig);
                        for (const [k, v] of Object.entries(data)) {
                            result[k] = v;
                        }
                    }
                    catch (err) { }
                }
            }
            else {
                const rKey = walineEnvMapping[key];
                if (rKey) {
                    result[rKey] = config[key];
                }
            }
        }
        if (!config['smtp.enabled']) {
            const r2 = {};
            for (const [k, v] of Object.entries(result)) {
                if (![
                    'SMTP_PASS',
                    'SMTP_USER',
                    'SMTP_HOST',
                    'SMTP_PORT',
                    'SENDER_NAME',
                    'SENDER_EMAIL',
                ].includes(k)) {
                    r2[k] = v;
                }
            }
            return r2;
        }
        return result;
    }
    async loadEnv() {
        const url = new URL(config_1.config.mongoUrl);
        const mongoEnv = {
            MONGO_HOST: url.hostname,
            MONGO_PORT: url.port,
            MONGO_USER: url.username,
            MONGO_PASSWORD: url.password,
            MONGO_DB: config_1.config.walineDB,
            MONGO_AUTHSOURCE: 'admin',
        };
        const siteInfo = await this.metaProvider.getSiteInfo();
        const otherEnv = {
            SITE_NAME: (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.siteName) || undefined,
            SITE_URL: (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.baseUrl) || undefined,
            JWT_TOKEN: global.jwtSecret || (0, crypto_1.makeSalt)(),
        };
        const walineConfig = await this.settingProvider.getWalineSetting();
        const walineConfigEnv = this.mapConfig2Env(walineConfig);
        this.env = Object.assign(Object.assign(Object.assign({}, mongoEnv), otherEnv), walineConfigEnv);
        this.logger.log(`waline 配置： ${JSON.stringify(this.env, null, 2)}`);
    }
    async init() {
        this.run();
    }
    async restart(reason) {
        this.logger.log(`${reason}重启 waline`);
        if (this.ctx) {
            await this.stop();
        }
        await this.run();
    }
    async stop() {
        if (this.ctx) {
            this.ctx.unref();
            process.kill(-this.ctx.pid);
            this.ctx = null;
            this.logger.log('waline 停止成功！');
        }
    }
    async run() {
        await this.loadEnv();
        const base = '../waline/node_modules/@waline/vercel/vanilla.js';
        if (this.ctx == null) {
            this.ctx = (0, node_child_process_1.spawn)('node', [base], {
                env: Object.assign(Object.assign({}, process.env), this.env),
                cwd: process.cwd(),
                detached: true,
            });
            this.ctx.on('message', (message) => {
                this.logger.log(message);
            });
            this.ctx.on('exit', () => {
                this.ctx = null;
                this.logger.warn('Waline 进程退出');
            });
            this.ctx.stdout.on('data', (data) => {
                const t = data.toString();
                if (!t.includes('Cannot find module')) {
                    this.logger.log(t.substring(0, t.length - 1));
                }
            });
            this.ctx.stderr.on('data', (data) => {
                const t = data.toString();
                this.logger.error(t.substring(0, t.length - 1));
            });
        }
        else {
            await this.stop();
            await this.run();
        }
        this.logger.log('Waline 启动成功！');
    }
};
WalineProvider = WalineProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        setting_provider_1.SettingProvider])
], WalineProvider);
exports.WalineProvider = WalineProvider;
//# sourceMappingURL=waline.provider.js.map