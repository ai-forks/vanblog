"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJwt = void 0;
const config_1 = require("../config");
const mongodb_1 = require("mongodb");
const crypto_1 = require("./crypto");
const initJwt = async () => {
    const mongoUrl = await (0, config_1.loadMongoUrl)();
    const client = new mongodb_1.MongoClient(mongoUrl);
    await client.connect();
    const db = client.db();
    const collection = db.collection('settings');
    const jwtSetting = await collection.findOne({ type: 'jwt' });
    if (jwtSetting) {
        return jwtSetting.value.secret;
    }
    else {
        const secret = (0, crypto_1.makeSalt)();
        await collection.insertOne({ type: 'jwt', value: { secret } });
        return secret;
    }
};
exports.initJwt = initJwt;
