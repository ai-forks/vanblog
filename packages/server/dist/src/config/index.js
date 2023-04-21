"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.loadMongoUrl = void 0;
const loadConfig_1 = require("../utils/loadConfig");
const loadMongoUrl = () => {
    return (0, loadConfig_1.loadConfig)('database.url', () => {
        const db = {
            host: (0, loadConfig_1.loadConfig)('database.host', 'mongo'),
            port: (0, loadConfig_1.loadConfig)('database.port', '27017'),
            user: (0, loadConfig_1.loadConfig)('database.user', ''),
            passwd: (0, loadConfig_1.loadConfig)('database.passwd', ''),
            name: (0, loadConfig_1.loadConfig)('database.name', 'vanBlog'),
        };
        let authInfo = '';
        if (db.user !== '' && db.passwd === '')
            authInfo = `${db.user}@`;
        if (db.user !== '' && db.passwd !== '')
            authInfo = `${db.user}:${db.passwd}@`;
        return `mongodb://${authInfo}${db.host}:${db.port}/${db.name}?authSource=admin`;
    });
};
exports.loadMongoUrl = loadMongoUrl;
exports.config = {
    mongoUrl: (0, exports.loadMongoUrl)(),
    staticPath: (0, loadConfig_1.loadConfig)('static.path', '/app/static'),
    demo: (0, loadConfig_1.loadConfig)('demo', false),
    walineDB: (0, loadConfig_1.loadConfig)('waline.db', 'waline'),
    log: (0, loadConfig_1.loadConfig)('log', '/var/log'),
    codeRunnerPath: (0, loadConfig_1.loadConfig)('codeRunner.path', '/app/codeRunner'),
    pluginRunnerPath: (0, loadConfig_1.loadConfig)('pluginRunner.path', '/app/pluginRunner'),
};
//# sourceMappingURL=index.js.map