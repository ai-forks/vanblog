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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BackupController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_provider_1 = require("../../../provider/article/article.provider");
const auth_guard_1 = require("../../../provider/auth/auth.guard");
const category_provider_1 = require("../../../provider/category/category.provider");
const draft_provider_1 = require("../../../provider/draft/draft.provider");
const meta_provider_1 = require("../../../provider/meta/meta.provider");
const tag_provider_1 = require("../../../provider/tag/tag.provider");
const user_provider_1 = require("../../../provider/user/user.provider");
const fs = __importStar(require("fs"));
const platform_express_1 = require("@nestjs/platform-express");
const removeId_1 = require("../../../utils/removeId");
const viewer_provider_1 = require("../../../provider/viewer/viewer.provider");
const visit_provider_1 = require("../../../provider/visit/visit.provider");
const static_provider_1 = require("../../../provider/static/static.provider");
const setting_provider_1 = require("../../../provider/setting/setting.provider");
const config_1 = require("../../../config");
const token_1 = require("../../../provider/swagger/token");
let BackupController = BackupController_1 = class BackupController {
    constructor(articleProvider, categoryProvider, tagProvider, metaProvider, draftProvider, userProvider, viewerProvider, visitProvider, settingProvider, staticProvider) {
        this.articleProvider = articleProvider;
        this.categoryProvider = categoryProvider;
        this.tagProvider = tagProvider;
        this.metaProvider = metaProvider;
        this.draftProvider = draftProvider;
        this.userProvider = userProvider;
        this.viewerProvider = viewerProvider;
        this.visitProvider = visitProvider;
        this.settingProvider = settingProvider;
        this.staticProvider = staticProvider;
        this.logger = new common_1.Logger(BackupController_1.name);
    }
    async getAll(res) {
        const articles = await this.articleProvider.getAll('admin', true);
        const categories = await this.categoryProvider.getAllCategories();
        const tags = await this.tagProvider.getAllTags(true);
        const meta = await this.metaProvider.getAll();
        const drafts = await this.draftProvider.getAll();
        const user = await this.userProvider.getUser();
        // 访客记录
        const viewer = await this.viewerProvider.getAll();
        const visit = await this.visitProvider.getAll();
        // 设置表
        const staticSetting = await this.settingProvider.getStaticSetting();
        const staticItems = await this.staticProvider.exportAll();
        const data = {
            articles,
            tags,
            meta,
            drafts,
            categories,
            user,
            viewer,
            visit,
            static: staticItems,
            setting: { static: staticSetting },
        };
        // 拼接一个临时文件
        const name = `temp.json`;
        fs.writeFileSync(name, JSON.stringify(data, null, 2));
        res.download(name, (err) => {
            if (!err) {
                this.logger.log('success', 'download');
                return;
            }
            this.logger.error(err.stack);
            fs.rmSync(name);
        });
    }
    async importAll(file) {
        if (config_1.config.demo && config_1.config.demo == 'true') {
            return {
                statusCode: 401,
                message: '演示站禁止修改此项！',
            };
        }
        const json = file.buffer.toString();
        const data = JSON.parse(json);
        const { meta, user, setting } = data;
        let { articles, drafts, viewer, visit, static: staticItems } = data;
        // 去掉 id
        articles = (0, removeId_1.removeID)(articles);
        drafts = (0, removeId_1.removeID)(drafts);
        viewer = (0, removeId_1.removeID)(viewer);
        visit = (0, removeId_1.removeID)(visit);
        if (staticItems) {
            staticItems = (0, removeId_1.removeID)(staticItems);
        }
        if (setting && setting.static) {
            setting.static = Object.assign(Object.assign({}, setting.static), { _id: undefined, __v: undefined });
        }
        delete user._id;
        delete user.__v;
        delete meta._id;
        await this.articleProvider.importArticles(articles);
        await this.draftProvider.importDrafts(drafts);
        await this.userProvider.updateUser(user);
        await this.metaProvider.update(meta);
        await this.settingProvider.importSetting(setting);
        await this.staticProvider.importItems(staticItems);
        if (visit) {
            await this.visitProvider.import(visit);
        }
        if (viewer) {
            await this.viewerProvider.import(viewer);
        }
        return {
            statusCode: 200,
            data: '导入成功！',
        };
    }
};
__decorate([
    (0, common_1.Get)('export'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BackupController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('/import'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BackupController.prototype, "importAll", null);
BackupController = BackupController_1 = __decorate([
    (0, swagger_1.ApiTags)('backup'),
    (0, common_1.UseGuards)(...auth_guard_1.AdminGuard),
    token_1.ApiToken,
    (0, common_1.Controller)('/api/admin/backup'),
    __metadata("design:paramtypes", [article_provider_1.ArticleProvider,
        category_provider_1.CategoryProvider,
        tag_provider_1.TagProvider,
        meta_provider_1.MetaProvider,
        draft_provider_1.DraftProvider,
        user_provider_1.UserProvider,
        viewer_provider_1.ViewerProvider,
        visit_provider_1.VisitProvider,
        setting_provider_1.SettingProvider,
        static_provider_1.StaticProvider])
], BackupController);
exports.BackupController = BackupController;
