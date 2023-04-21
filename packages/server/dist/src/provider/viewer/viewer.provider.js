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
exports.ViewerProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
let ViewerProvider = class ViewerProvider {
    constructor(viewerModel) {
        this.viewerModel = viewerModel;
    }
    async create(createViewerDto) {
        const createdData = new this.viewerModel(createViewerDto);
        return createdData.save();
    }
    async createOrUpdate(createViewerDto) {
        const { date } = createViewerDto;
        const oldData = await this.viewerModel.findOne({ date });
        if (!oldData) {
            const createdData = new this.viewerModel(createViewerDto);
            return createdData.save();
        }
        else {
            return this.viewerModel.updateOne({ date }, createViewerDto);
        }
    }
    async getViewerGrid(num) {
        const curDate = (0, dayjs_1.default)();
        const gridTotal = [];
        const tmpArr = [];
        const today = { viewer: 0, visited: 0 };
        const lastDay = { viewer: 0, visited: 0 };
        for (let i = num; i >= 0; i--) {
            const last = curDate.add(-1 * i, 'day').format('YYYY-MM-DD');
            const lastDayData = await this.findByDate(last);
            if (i == 0) {
                if (lastDayData) {
                    today.viewer = lastDayData.viewer;
                    today.visited = lastDayData.visited;
                }
            }
            if (i == 1) {
                if (lastDayData) {
                    lastDay.viewer = lastDayData.viewer;
                    lastDay.visited = lastDayData.visited;
                }
                if (today.viewer == 0) {
                    today.viewer = (lastDayData === null || lastDayData === void 0 ? void 0 : lastDayData.viewer) || 0;
                    today.visited = (lastDayData === null || lastDayData === void 0 ? void 0 : lastDayData.visited) || 0;
                }
            }
            if (lastDayData) {
                tmpArr.push({
                    date: last,
                    visited: lastDayData.visited,
                    viewer: lastDayData.viewer,
                });
                if (i != num + 1) {
                    gridTotal.push({
                        date: last,
                        visited: lastDayData.visited,
                        viewer: lastDayData.viewer,
                    });
                }
            }
        }
        const gridEachDay = [];
        let pre = tmpArr[0];
        for (let i = 1; i < tmpArr.length; i++) {
            const curObj = tmpArr[i];
            if (curObj) {
                if (pre) {
                    gridEachDay.push({
                        date: curObj.date,
                        visited: curObj.visited - pre.visited,
                        viewer: curObj.viewer - pre.viewer,
                    });
                }
                else {
                    gridEachDay.push({
                        date: curObj.date,
                        visited: curObj.visited,
                        viewer: curObj.viewer,
                    });
                }
            }
            pre = curObj;
        }
        return {
            grid: {
                total: gridTotal,
                each: gridEachDay,
            },
            add: {
                viewer: today.viewer - lastDay.viewer,
                visited: today.visited - lastDay.visited,
            },
            now: {
                viewer: today.viewer,
                visited: today.visited,
            },
        };
    }
    async getAll() {
        return this.viewerModel.find({}).exec();
    }
    async findByDate(date) {
        return this.viewerModel.findOne({ date }).exec();
    }
    async import(data) {
        for (const each of data) {
            const oldData = await this.viewerModel.findOne({
                date: each.date,
            });
            if (oldData) {
                await this.viewerModel.updateOne({ _id: oldData._id }, each);
            }
            else {
                const newData = new this.viewerModel(each);
                await newData.save();
            }
        }
    }
};
ViewerProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Viewer')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ViewerProvider);
exports.ViewerProvider = ViewerProvider;
//# sourceMappingURL=viewer.provider.js.map