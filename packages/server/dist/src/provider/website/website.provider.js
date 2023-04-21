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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WebsiteProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteProvider = void 0;
const common_1 = require("@nestjs/common");
const node_child_process_1 = require("node:child_process");
const node_path_1 = __importDefault(require("node:path"));
const meta_provider_1 = require("../meta/meta.provider");
const setting_provider_1 = require("../setting/setting.provider");
const ignoreWebsiteWarnings = [
    'Experimental features are not covered by semver',
    'You have enabled experimental feature',
    'Invalid next.config.js options',
    'The value at .experimental has an',
    '(node:62) ExperimentalWarning',
    'null',
];
let WebsiteProvider = WebsiteProvider_1 = class WebsiteProvider {
    constructor(metaProvider, settingProvider) {
        this.metaProvider = metaProvider;
        this.settingProvider = settingProvider;
        this.ctx = null;
        this.logger = new common_1.Logger(WebsiteProvider_1.name);
    }
    async init() {
        this.run();
    }
    async loadEnv() {
        const meta = await this.metaProvider.getAll();
        const isrConfig = await this.settingProvider.getISRSetting();
        const isrEnv = isrConfig.mode == 'delay'
            ? {
                VAN_BLOG_REVALIDATE: 'true',
                VAN_BLOG_REVALIDATE_TIME: isrConfig.delay,
            }
            : {
                VAN_BLOG_REVALIDATE: 'false',
            };
        if (!(meta === null || meta === void 0 ? void 0 : meta.siteInfo))
            return Object.assign({}, isrEnv);
        const siteinfo = meta.siteInfo;
        const socials = meta.socials;
        const urls = [];
        const addEach = (u) => {
            if (!u)
                return null;
            try {
                const url = new URL(u);
                if (url === null || url === void 0 ? void 0 : url.host) {
                    if (!urls.includes(url === null || url === void 0 ? void 0 : url.host)) {
                        urls.push(url === null || url === void 0 ? void 0 : url.host);
                    }
                }
            }
            catch (err) {
                return null;
            }
        };
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.baseUrl);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.siteLogo);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.authorLogo);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.authorLogoDark);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.payAliPay);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.payAliPayDark);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.payWechat);
        addEach(siteinfo === null || siteinfo === void 0 ? void 0 : siteinfo.payWechatDark);
        const wechatItem = socials.find((s) => s.type == 'wechat');
        if (wechatItem) {
            addEach(wechatItem === null || wechatItem === void 0 ? void 0 : wechatItem.value);
        }
        const wechatDarkItem = socials.find((s) => s.type == 'wechat-dark');
        if (wechatDarkItem) {
            addEach(wechatDarkItem === null || wechatDarkItem === void 0 ? void 0 : wechatDarkItem.value);
        }
        return Object.assign({ VAN_BLOG_ALLOW_DOMAINS: urls.join(',') }, isrEnv);
    }
    async restart(reason) {
        this.logger.log(`${reason}重启 website`);
        if (this.ctx) {
            await this.stop();
        }
    }
    async restore(reason) {
        this.logger.log(`${reason}`);
        if (this.ctx)
            this.ctx = null;
        await this.run();
    }
    async stop(noMessage) {
        if (this.ctx) {
            this.ctx.unref();
            process.kill(-this.ctx.pid);
            this.ctx = null;
            if (noMessage)
                return;
            this.logger.log('website 停止成功！');
        }
    }
    async run() {
        if (process.env['VANBLOG_DISABLE_WEBSITE'] === 'true') {
            this.logger.log('无 website 模式');
            return;
        }
        let cmd = 'pnpm';
        let args = ['dev'];
        if (process.env.NODE_ENV == 'production') {
            cmd = 'node';
            args = ['./packages/website/server.js'];
        }
        const loadEnvs = await this.loadEnv();
        this.logger.log(JSON.stringify(loadEnvs, null, 2));
        if (this.ctx == null) {
            this.ctx = (0, node_child_process_1.spawn)(cmd, args, {
                env: Object.assign(Object.assign({}, process.env), loadEnvs),
                cwd: node_path_1.default.join(node_path_1.default.resolve(process.cwd(), '..'), 'website'),
                detached: true,
                shell: process.platform === 'win32',
            });
            this.ctx.on('message', (message) => {
                this.logger.log(message);
            });
            this.ctx.on('exit', async () => {
                await this.restore('website 进程退出，自动重启');
            });
            this.ctx.stdout.on('data', (data) => {
                const t = data.toString();
                this.logger.log(t.substring(0, t.length - 1));
            });
            this.ctx.stderr.on('data', (data) => {
                const t = data.toString();
                let showLog = true;
                for (const each of ignoreWebsiteWarnings) {
                    if (t.includes(each))
                        showLog = false;
                }
                if (showLog) {
                    this.logger.error(t.substring(0, t.length - 1));
                }
            });
        }
        else {
            this.logger.log('Website 启动成功！');
        }
    }
};
WebsiteProvider = WebsiteProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meta_provider_1.MetaProvider,
        setting_provider_1.SettingProvider])
], WebsiteProvider);
exports.WebsiteProvider = WebsiteProvider;
