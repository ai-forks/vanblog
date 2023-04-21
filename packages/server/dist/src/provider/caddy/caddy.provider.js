"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CaddyProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaddyProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const setting_provider_1 = require("../setting/setting.provider");
let CaddyProvider = CaddyProvider_1 = class CaddyProvider {
    constructor(settingProvider) {
        this.settingProvider = settingProvider;
        this.subjects = [];
        this.logger = new common_1.Logger(CaddyProvider_1.name);
        this.init();
    }
    async init() {
        const configInDB = await this.settingProvider.getHttpsSetting();
        let txt = '初始化 caddy 配置完成！';
        if (configInDB === null || configInDB === void 0 ? void 0 : configInDB.redirect) {
            await this.setRedirect(true);
            txt = txt + 'https 自动重定向已开启';
        }
        else {
            await this.setRedirect(false);
            txt = 'https 自动重定向已关闭';
        }
        this.logger.log(txt);
    }
    clearLog() {
        try {
            fs.writeFileSync('/var/log/caddy.log', '');
        }
        catch (err) { }
    }
    async addSubject(domain) {
        if (!this.subjects.includes(domain)) {
            this.subjects.push(domain);
            await this.updateSubjects(this.subjects);
        }
    }
    async setRedirect(redirect) {
        if (!redirect) {
            try {
                await axios_1.default.delete('http://127.0.0.1:2019/config/apps/http/servers/srv1/listener_wrappers');
                this.logger.log('https 自动重定向已关闭');
                return '关闭成功！';
            }
            catch (err) {
                this.logger.error('关闭 https 自动重定向失败');
                return false;
            }
        }
        else {
            try {
                await axios_1.default.post('http://127.0.0.1:2019/config/apps/http/servers/srv1/listener_wrappers', [
                    {
                        wrapper: 'http_redirect',
                    },
                ]);
                this.logger.log('https 自动重定向已关闭');
                return '开启成功！';
            }
            catch (err) {
                this.logger.error('开启 https 自动重定向失败');
                return false;
            }
        }
    }
    async getSubjects() {
        try {
            const res = await axios_1.default.get('http://127.0.0.1:2019/config/apps/tls/automation/policies/subjects');
            return res === null || res === void 0 ? void 0 : res.data;
        }
        catch (err) {
            this.logger.error('更新 subjects 失败，通过 IP 进行 https 访问可能受限');
        }
    }
    async getAutomaticDomains() {
        try {
            const res = await axios_1.default.get('http://127.0.0.1:2019/config/apps/tls/certificates/automate');
            return res === null || res === void 0 ? void 0 : res.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateSubjects(domains) {
        var _a;
        try {
            const res = await axios_1.default.patch('http://127.0.0.1:2019/config/apps/tls/automation/policies/0/subjects', domains);
            if (res.status == 200) {
                return true;
            }
        }
        catch (err) {
            console.log(((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.error) || err);
        }
        return false;
    }
    async applyHttpsChange(domains) {
        return await this.updateHttpsDomains([...domains, ...this.subjects]);
    }
    async updateHttpsDomains(domains) {
        try {
            const res = await axios_1.default.patch('http://127.0.0.1:2019/config/apps/tls/certificates/automate', domains);
            if (res.status == 200) {
                return true;
            }
        }
        catch (err) {
            console.log(err);
        }
        return false;
    }
    async getConfig() {
        try {
            const res = await axios_1.default.get('http://127.0.0.1:2019/config');
            return res === null || res === void 0 ? void 0 : res.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getLog() {
        try {
            const data = fs.readFileSync('/var/log/caddy.log', { encoding: 'utf-8' });
            return data.toString();
        }
        catch (err) {
            return '';
        }
    }
};
CaddyProvider = CaddyProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_provider_1.SettingProvider])
], CaddyProvider);
exports.CaddyProvider = CaddyProvider;
