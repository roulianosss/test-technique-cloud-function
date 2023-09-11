"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prepareData_1 = __importDefault(require("./utils/prepareData"));
const parseFiles_1 = __importDefault(require("./utils/parseFiles"));
const generateResponse_1 = __importDefault(require("./utils/generateResponse"));
exports.helloHttp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Préparation des données: fetch google storage (j'ai mis les fichiers de l exercice sur un bucket) + convert excel to csv
        yield (0, prepareData_1.default)();
        // Parse les fichiers et retourne les données en objet js
        const data = yield (0, parseFiles_1.default)();
        // Calculs des probabilités et génération de la réponse
        const response = (0, generateResponse_1.default)(...data);
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Une erreur s'est produite : ", error);
        res.status(500).send("Une erreur s'est produite.");
    }
});
