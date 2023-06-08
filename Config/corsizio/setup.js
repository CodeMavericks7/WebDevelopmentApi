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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsizio = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const rootUrl = 'https://api.corsizio.com/v1';
const apiKey = process.env.corsizioApiKey;
function corsizio(url) {
    (0, axios_1.default)({
        method: 'get',
        url: rootUrl + url,
        headers: {
            'Authorization': apiKey
        }
    })
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        return JSON.stringify(response.data);
    })
        .catch(function (error) {
        console.log(error);
        return error;
    });
}
exports.corsizio = corsizio;
// async function test(){
//     const res = await corsizio(`/events/6451d0a7623616c2e73a9ad8?include=attendees`);
// }
// test();
