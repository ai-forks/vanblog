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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const meta_provider_1 = require("./provider/meta/meta.provider");
const index_1 = require("./config/index");
const checkFolder_1 = require("./utils/checkFolder");
const path = __importStar(require("path"));
const isr_provider_1 = require("./provider/isr/isr.provider");
const waline_provider_1 = require("./provider/waline/waline.provider");
const init_provider_1 = require("./provider/init/init.provider");
const express_1 = require("express");
const user_provider_1 = require("./provider/user/user.provider");
const setting_provider_1 = require("./provider/setting/setting.provider");
const website_provider_1 = require("./provider/website/website.provider");
const initJwt_1 = require("./utils/initJwt");
async function bootstrap() {
    const jwtSecret = await (0, initJwt_1.initJwt)();
    global.jwtSecret = jwtSecret;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.useStaticAssets(index_1.config.staticPath, {
        prefix: '/static/',
    });
    (0, checkFolder_1.checkOrCreate)(index_1.config.codeRunnerPath);
    (0, checkFolder_1.checkOrCreate)(index_1.config.staticPath);
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'img'));
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'tmp'));
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'export'));
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'customPage'));
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'rss'));
    app.useStaticAssets(path.join(index_1.config.staticPath, 'rss'), {
        prefix: '/rss/',
    });
    (0, checkFolder_1.checkOrCreate)(path.join(index_1.config.staticPath, 'sitemap'));
    app.useStaticAssets(path.join(index_1.config.staticPath, 'sitemap'), {
        prefix: '/sitemap/',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VanBlog API Reference')
        .setDescription('API Token 请在后台设置页面获取，请添加到请求头的 token 字段中进行鉴权。')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(3000);
    const websiteProvider = app.get(website_provider_1.WebsiteProvider);
    websiteProvider.init();
    const initProvider = app.get(init_provider_1.InitProvider);
    initProvider.initVersion();
    initProvider.initRestoreKey();
    if (await initProvider.checkHasInited()) {
        await initProvider.washStaticSetting();
        await initProvider.washCustomPage();
        await initProvider.washCategory();
        const userProvider = app.get(user_provider_1.UserProvider);
        userProvider.washUserWithSalt();
        const settingProvider = app.get(setting_provider_1.SettingProvider);
        settingProvider.washDefaultMenu();
        const metaProvider = app.get(meta_provider_1.MetaProvider);
        metaProvider.updateTotalWords('首次启动');
        const walineProvider = app.get(waline_provider_1.WalineProvider);
        walineProvider.init();
        process.on('SIGINT', async () => {
            await walineProvider.stop();
            await websiteProvider.stop();
            console.log('检测到关闭信号，优雅退出！');
            process.exit();
        });
        const isrProvider = app.get(isr_provider_1.ISRProvider);
        isrProvider.activeAll('首次启动触发全量渲染！', 1000, {
            forceActice: true,
        });
    }
    setTimeout(() => {
        console.log('应用已启动，端口: 3000');
        console.log('API 端点地址: http://<domain>/api');
        console.log('swagger 地址: http://<domain>/swagger');
        console.log('项目主页: https://vanblog.mereith.com');
        console.log('开源地址: https://github.mereith/mereithhh/van-blog');
    }, 3000);
}
bootstrap();
