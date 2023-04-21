"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const passport_1 = require("@nestjs/passport");
const access_guard_1 = require("../access/access.guard");
const token_guard_1 = require("./token.guard");
exports.AdminGuard = [(0, passport_1.AuthGuard)('jwt'), token_guard_1.TokenGuard, access_guard_1.AccessGuard];
//# sourceMappingURL=auth.guard.js.map