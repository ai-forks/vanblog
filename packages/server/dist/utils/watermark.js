"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWaterMark = exports.addWaterMarkToIMG = void 0;
const jimp_1 = __importDefault(require("jimp"));
const addWaterMarkToIMG = async (srcImage, waterMarkText) => {
    // 水印距离右下角百分比
    const LOGO_MARGIN_PERCENTAGE = 5 / 100;
    const logo = await (0, exports.generateWaterMark)(waterMarkText);
    const image = await jimp_1.default.read(srcImage);
    // 将 logo 等比缩小 10 倍
    // logo.resize(inputGif.width / 10, Jimp.AUTO);
    const xMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE;
    const yMargin = image.bitmap.width * LOGO_MARGIN_PERCENTAGE;
    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;
    //@ts-ignore
    const newImage = image.composite(logo, X, Y, [
        {
            mode: jimp_1.default.BLEND_SOURCE_OVER,
            opacitySource: 0.8,
            opacityDest: 1,
        },
    ]);
    return await newImage.getBufferAsync(newImage.getMIME());
};
exports.addWaterMarkToIMG = addWaterMarkToIMG;
const generateWaterMark = async (waterMark) => {
    const font = await jimp_1.default.loadFont(jimp_1.default.FONT_SANS_128_WHITE);
    const logo = await jimp_1.default.read(500, 150, 0x00000000);
    logo.print(font, 0, 0, waterMark, 500);
    //@ts-ignore
    logo.color([{ apply: 'mix', params: ['#a7a7a7', 100] }]);
    return logo;
};
exports.generateWaterMark = generateWaterMark;
