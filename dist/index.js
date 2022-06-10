"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./data/store"));
class ZipMonster {
}
exports.default = ZipMonster;
ZipMonster.getStateCodeFromZipCode = (zipCode) => {
    var _a;
    return (_a = store_1.default.zipCityStateList.find(state => state.zip === zipCode)) === null || _a === void 0 ? void 0 : _a.stateCode;
};
