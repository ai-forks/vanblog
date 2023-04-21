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
var UserProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_1 = require("../../utils/crypto");
let UserProvider = UserProvider_1 = class UserProvider {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UserProvider_1.name);
    }
    async getUser(isList) {
        if (isList) {
            return await this.userModel.findOne({ id: 0 }, { id: 1, name: 1, nickname: 1 });
        }
        return await this.userModel.findOne({ id: 0 }).exec();
    }
    async washUserWithSalt() {
        const users = await this.userModel.find({
            $or: [
                {
                    salt: '',
                },
                {
                    salt: { $exists: false },
                },
            ],
        });
        if (users && users.length > 0) {
            this.logger.log(`老版本清洗密码未加盐用户 ${users.length} 人`);
            for (const user of users) {
                const salt = (0, crypto_1.makeSalt)();
                const newPassword = (0, crypto_1.washPassword)(user.name, user.password, salt);
                await this.userModel.updateOne({ id: user.id }, { password: newPassword, salt });
            }
        }
    }
    async validateUser(name, password) {
        const user = await this.userModel.findOne({ name });
        if (!user) {
            return null;
        }
        else {
            const result = await this.userModel
                .findOne({ name, password: (0, crypto_1.encryptPassword)(name, password, user.salt) })
                .exec();
            if (result) {
                this.updateSalt(result, password);
            }
            return result;
        }
    }
    async updateSalt(user, passwordInput) {
        const newSalt = (0, crypto_1.makeSalt)();
        await this.userModel.updateOne({ id: user.id }, {
            salt: newSalt,
            password: (0, crypto_1.encryptPassword)(user.name, passwordInput, newSalt),
        });
    }
    async updateUser(updateUserDto) {
        const currUser = await this.getUser();
        if (!currUser) {
            throw new common_1.NotFoundException();
        }
        else {
            return this.userModel
                .updateOne({ id: currUser.id }, Object.assign(Object.assign({}, updateUserDto), { password: (0, crypto_1.encryptPassword)(updateUserDto.name, updateUserDto.password, currUser.salt) }))
                .exec();
        }
    }
    async getNewId() {
        const [lastUser] = await this.userModel.find({}).sort({ id: -1 }).limit(1);
        if (!lastUser) {
            return 1;
        }
        else {
            return lastUser.id + 1;
        }
    }
    async getCollaboratorByName(name) {
        return await this.userModel.findOne({ name: name, type: 'collaborator' });
    }
    async getCollaboratorById(id) {
        return await this.userModel.findOne({ id, type: 'collaborator' });
    }
    async getAllCollaborators(isList) {
        if (isList) {
            return await this.userModel.find({ type: 'collaborator' }, { id: 1, name: 1, nickname: 1, _id: 0 });
        }
        return await this.userModel.find({ type: 'collaborator' }, { salt: 0, password: 0, _id: 0 });
    }
    async createCollaborator(collaboratorDto) {
        const { name } = collaboratorDto;
        const oldData = await this.getCollaboratorByName(name);
        if (oldData) {
            throw new common_1.ForbiddenException('已有为该用户名的协作者，不可重复创建！');
        }
        const salt = (0, crypto_1.makeSalt)();
        return await this.userModel.create(Object.assign(Object.assign({ id: await this.getNewId(), type: 'collaborator' }, collaboratorDto), { password: (0, crypto_1.encryptPassword)(collaboratorDto.name, collaboratorDto.password, salt), salt }));
    }
    async updateCollaborator(collaboratorDto) {
        const { name } = collaboratorDto;
        const oldData = await this.getCollaboratorByName(name);
        if (!oldData) {
            throw new common_1.ForbiddenException('没有此协作者！无法更新！');
        }
        const salt = (0, crypto_1.makeSalt)();
        return await this.userModel.updateOne({
            id: oldData.id,
            type: 'collaborator',
        }, Object.assign(Object.assign({}, collaboratorDto), { password: (0, crypto_1.encryptPassword)(collaboratorDto.name, collaboratorDto.password, salt), salt }));
    }
    async deleteCollaborator(id) {
        await this.userModel.deleteOne({ id: id, type: 'collaborator' });
    }
};
UserProvider = UserProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserProvider);
exports.UserProvider = UserProvider;
