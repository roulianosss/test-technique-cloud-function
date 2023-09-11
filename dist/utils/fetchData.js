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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const readline_1 = require("readline");
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const jsonlFileName = "betinSportEvents.jsonl";
    const cv1FileName = "bookmakerBets1.csv";
    const cv2FileName = "bookmakerBets2.csv";
    const parsedJsonl = yield parseJSONL(`./src/assets/${jsonlFileName}`);
    const parsedCsv1 = yield parseCSV(`./src/assets/${cv1FileName}`);
    const parsedCsv2 = yield parseCSV(`./src/assets/${cv2FileName}`);
    return [parsedJsonl, parsedCsv1, parsedCsv2];
});
const parseJSONL = (jsonlFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const stream = fs.createReadStream(jsonlFilePath, "utf-8");
    const rl = (0, readline_1.createInterface)({
        input: stream,
        crlfDelay: Infinity
    });
    const parsedObjects = [];
    try {
        for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
            _c = rl_1_1.value;
            _d = false;
            const line = _c;
            try {
                const object = JSON.parse(line);
                parsedObjects.push(object);
            }
            catch (error) {
                console.error("Erreur de parsing JSONL:", error);
                throw new Error("Erreur de parsing JSONL");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return parsedObjects;
});
const parseCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const dataCSV = [];
        fs.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (row) => {
            dataCSV.push(row);
        })
            .on("end", () => {
            resolve(dataCSV);
        })
            .on("error", (error) => {
            console.error("Erreur lors de la lecture du fichier CSV:", error);
            reject(error);
        });
    });
});
exports.default = fetchData;
