"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const index_1 = require("./config/index");
const article_schema_1 = require("./scheme/article.schema");
const draft_schema_1 = require("./scheme/draft.schema");
const meta_schema_1 = require("./scheme/meta.schema");
const article_provider_1 = require("./provider/article/article.provider");
const category_provider_1 = require("./provider/category/category.provider");
const draft_provider_1 = require("./provider/draft/draft.provider");
const meta_provider_1 = require("./provider/meta/meta.provider");
const tag_provider_1 = require("./provider/tag/tag.provider");
const public_controller_1 = require("./controller/public/public.controller");
const about_meta_controller_1 = require("./controller/admin/about/about.meta.controller");
const link_meta_controller_1 = require("./controller/admin/link/link.meta.controller");
const reward_meta_controller_1 = require("./controller/admin/reward/reward.meta.controller");
const site_meta_controller_1 = require("./controller/admin/site/site.meta.controller");
const social_meta_controller_1 = require("./controller/admin/social/social.meta.controller");
const tag_controller_1 = require("./controller/admin/tag/tag.controller");
const article_controller_1 = require("./controller/admin/article/article.controller");
const draft_controller_1 = require("./controller/admin/draft/draft.controller");
const category_controller_1 = require("./controller/admin/category/category.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./controller/admin/auth/auth.controller");
const user_provider_1 = require("./provider/user/user.provider");
const auth_provider_1 = require("./provider/auth/auth.provider");
const user_schema_1 = require("./scheme/user.schema");
const local_strategy_1 = require("./provider/auth/local.strategy");
const jwt_strategy_1 = require("./provider/auth/jwt.strategy");
const init_controller_1 = require("./controller/admin/init/init.controller");
const init_provider_1 = require("./provider/init/init.provider");
const init_middleware_1 = require("./provider/auth/init.middleware");
const backup_controller_1 = require("./controller/admin/backup/backup.controller");
const menu_meta_controller_1 = require("./controller/admin/menu/menu.meta.controller");
const schedule_1 = require("@nestjs/schedule");
const viewer_schema_1 = require("./scheme/viewer.schema");
const viewer_provider_1 = require("./provider/viewer/viewer.provider");
const visit_schema_1 = require("./scheme/visit.schema");
const visit_provider_1 = require("./provider/visit/visit.provider");
const meta_controller_1 = require("./controller/admin/meta/meta.controller");
const analysis_controller_1 = require("./controller/admin/analysis/analysis.controller");
const analysis_provider_1 = require("./provider/analysis/analysis.provider");
const setting_schema_1 = require("./scheme/setting.schema");
const static_schema_1 = require("./scheme/static.schema");
const setting_provider_1 = require("./provider/setting/setting.provider");
const static_provider_1 = require("./provider/static/static.provider");
const img_controller_1 = require("./controller/admin/img/img.controller");
const local_provider_1 = require("./provider/static/local.provider");
const setting_controller_1 = require("./controller/admin/setting/setting.controller");
const picgo_provider_1 = require("./provider/static/picgo.provider");
const viewer_task_1 = require("./schedule/viewer.task");
const caddy_controller_1 = require("./controller/admin/caddy/caddy.controller");
const caddy_provider_1 = require("./provider/caddy/caddy.provider");
const log_provider_1 = require("./provider/log/log.provider");
const log_controller_1 = require("./controller/admin/log/log.controller");
const isr_provider_1 = require("./provider/isr/isr.provider");
const waline_provider_1 = require("./provider/waline/waline.provider");
const cache_provider_1 = require("./provider/cache/cache.provider");
const login_guard_1 = require("./provider/auth/login.guard");
const access_guard_1 = require("./provider/access/access.guard");
const collaborator_controller_1 = require("./controller/admin/collaborator/collaborator.controller");
const isr_controller_1 = require("./controller/admin/isr/isr.controller");
const isr_task_1 = require("./schedule/isr.task");
const customPage_schema_1 = require("./scheme/customPage.schema");
const customPage_provider_1 = require("./provider/customPage/customPage.provider");
const customPage_controller_1 = require("./controller/admin/customPage/customPage.controller");
const rss_provider_1 = require("./provider/rss/rss.provider");
const markdown_provider_1 = require("./provider/markdown/markdown.provider");
const sitemap_provider_1 = require("./provider/sitemap/sitemap.provider");
const token_provider_1 = require("./provider/token/token.provider");
const token_schema_1 = require("./scheme/token.schema");
const token_guard_1 = require("./provider/auth/token.guard");
const website_provider_1 = require("./provider/website/website.provider");
const category_schema_1 = require("./scheme/category.schema");
const customPage_controller_2 = require("./controller/customPage/customPage.controller");
const pipeline_schema_1 = require("./scheme/pipeline.schema");
const pipeline_provider_1 = require("./provider/pipeline/pipeline.provider");
const pipeline_controller_1 = require("./controller/admin/pipeline/pipeline.controller");
const token_controller_1 = require("./controller/admin/token/token.controller");
const initJwt_1 = require("./utils/initJwt");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(init_middleware_1.InitMiddleware)
            .exclude({ path: '/api/admin/img/upload', method: common_1.RequestMethod.POST }, { path: '/api/admin/init/upload', method: common_1.RequestMethod.POST }, { path: '/api/admin/caddy/ask', method: common_1.RequestMethod.GET })
            .forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(index_1.config.mongoUrl, {
                autoIndex: true,
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: article_schema_1.Article.name, schema: article_schema_1.ArticleSchema },
                { name: draft_schema_1.Draft.name, schema: draft_schema_1.DraftSchema },
                { name: meta_schema_1.Meta.name, schema: meta_schema_1.MetaSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: viewer_schema_1.Viewer.name, schema: viewer_schema_1.ViewerSchema },
                { name: visit_schema_1.Visit.name, schema: visit_schema_1.VisitSchema },
                { name: setting_schema_1.Setting.name, schema: setting_schema_1.SettingSchema },
                { name: static_schema_1.Static.name, schema: static_schema_1.StaticSchema },
                { name: customPage_schema_1.CustomPage.name, schema: customPage_schema_1.CustomPageSchema },
                { name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: pipeline_schema_1.Pipeline.name, schema: pipeline_schema_1.PipelineSchema },
            ]),
            jwt_1.JwtModule.registerAsync({
                useFactory: async () => {
                    return {
                        secret: await (0, initJwt_1.initJwt)(),
                        signOptions: {
                            expiresIn: 3600 * 24 * 7,
                        },
                    };
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [
            app_controller_1.AppController,
            public_controller_1.PublicController,
            about_meta_controller_1.AboutMetaController,
            link_meta_controller_1.LinkMetaController,
            reward_meta_controller_1.RewardMetaController,
            site_meta_controller_1.SiteMetaController,
            social_meta_controller_1.SocialMetaController,
            tag_controller_1.TagController,
            article_controller_1.ArticleController,
            draft_controller_1.DraftController,
            category_controller_1.CategoryController,
            auth_controller_1.AuthController,
            init_controller_1.InitController,
            menu_meta_controller_1.MenuMetaController,
            backup_controller_1.BackupController,
            meta_controller_1.MetaController,
            analysis_controller_1.AnalysisController,
            setting_controller_1.SettingController,
            img_controller_1.ImgController,
            caddy_controller_1.CaddyController,
            log_controller_1.LogController,
            collaborator_controller_1.CollaboratorController,
            isr_controller_1.ISRController,
            customPage_controller_1.CustomPageController,
            customPage_controller_2.PublicCustomPageController,
            customPage_controller_2.PublicOldCustomPageRedirectController,
            pipeline_controller_1.PipelineController,
            token_controller_1.TokenController,
        ],
        providers: [
            app_service_1.AppService,
            article_provider_1.ArticleProvider,
            category_provider_1.CategoryProvider,
            meta_provider_1.MetaProvider,
            draft_provider_1.DraftProvider,
            picgo_provider_1.PicgoProvider,
            visit_provider_1.VisitProvider,
            tag_provider_1.TagProvider,
            user_provider_1.UserProvider,
            auth_provider_1.AuthProvider,
            local_strategy_1.LocalStrategy,
            viewer_provider_1.ViewerProvider,
            jwt_strategy_1.JwtStrategy,
            init_provider_1.InitProvider,
            analysis_provider_1.AnalysisProvider,
            setting_provider_1.SettingProvider,
            static_provider_1.StaticProvider,
            local_provider_1.LocalProvider,
            viewer_task_1.ViewerTask,
            caddy_provider_1.CaddyProvider,
            log_provider_1.LogProvider,
            isr_provider_1.ISRProvider,
            waline_provider_1.WalineProvider,
            cache_provider_1.CacheProvider,
            login_guard_1.LoginGuard,
            access_guard_1.AccessGuard,
            isr_task_1.ISRTask,
            customPage_provider_1.CustomPageProvider,
            rss_provider_1.RssProvider,
            markdown_provider_1.MarkdownProvider,
            sitemap_provider_1.SiteMapProvider,
            token_provider_1.TokenProvider,
            token_guard_1.TokenGuard,
            website_provider_1.WebsiteProvider,
            pipeline_provider_1.PipelineProvider,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
