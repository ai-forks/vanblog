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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_2 = require("mongoose");
let VisitProvider = class VisitProvider {
    constructor(visitModel) {
        this.visitModel = visitModel;
    }
    async add(createViewerDto) {
        // 先找一下有没有今天的，有的话就在今天的基础上加1。
        const { isNew, pathname } = createViewerDto;
        // 这里的 isNew 代表是对于这个文章来说有没有访问过。
        const today = (0, dayjs_1.default)().format('YYYY-MM-DD');
        const todayData = await this.findByDateAndPath(today, pathname);
        if (todayData) {
            // 有今天的，直接在今天的基础上 +1 就行了
            return await this.visitModel.updateOne({ _id: todayData._id }, {
                viewer: todayData.viewer + 1,
                visited: isNew ? todayData.visited + 1 : todayData.visited,
                lastVisitedTime: new Date(),
            });
        }
        else {
            // 没有今天的，找到能找到的上一天，然后加一，并创建今天的。
            const lastData = await this.getLastData(pathname);
            const lastVisit = (lastData === null || lastData === void 0 ? void 0 : lastData.visited) || 0;
            const lastViewer = (lastData === null || lastData === void 0 ? void 0 : lastData.viewer) || 0;
            const createdData = new this.visitModel({
                date: today,
                viewer: lastViewer + 1,
                visited: isNew ? lastVisit + 1 : lastVisit,
                pathname: pathname,
                lastVisitedTime: new Date(),
            });
            return await createdData.save();
        }
    }
    async rewriteToday(pathname, viewer, visited) {
        const today = (0, dayjs_1.default)().format('YYYY-MM-DD');
        const todayData = await this.findByDateAndPath(today, pathname);
        if (todayData) {
            await this.visitModel.updateOne({ _id: todayData.id }, { viewer, visited });
        }
        else {
            await this.visitModel.create({
                date: today,
                viewer,
                visited,
                pathname,
            });
        }
    }
    async getLastData(pathname) {
        const lastData = await this.visitModel
            .find({ pathname })
            .sort({ date: -1 })
            .limit(1);
        if (lastData && lastData.length > 0) {
            return lastData[0];
        }
        return null;
    }
    async getAll() {
        return this.visitModel.find({}).exec();
    }
    async findByDateAndPath(date, pathname) {
        return this.visitModel.findOne({ date, pathname }).exec();
    }
    async getByArticleId(id) {
        const pathname = id == 0 ? `/about` : `/post/${id}`;
        const result = await this.visitModel
            .find({
            pathname,
        })
            .sort({ date: -1 })
            .limit(1);
        if (result && result.length) {
            return result[0];
        }
        return null;
    }
    async getLastVisitItem() {
        const result = await this.visitModel
            .find({
            lastVisitedTime: { $exists: true },
        })
            .sort({ lastVisitedTime: -1 })
            .limit(1);
        if (result && result.length) {
            return result[0];
        }
        return null;
    }
    async import(data) {
        for (const each of data) {
            const oldData = await this.visitModel.findOne({
                pathname: each.pathname,
                date: each.date,
            });
            if (oldData) {
                await this.visitModel.updateOne({ _id: oldData._id }, each);
            }
            else {
                const newData = new this.visitModel(each);
                await newData.save();
            }
        }
    }
};
VisitProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Visit')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VisitProvider);
exports.VisitProvider = VisitProvider;
