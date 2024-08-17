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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const process_1 = require("process");
const convert_1 = require("./convert");
const index_1 = require("./files/index");
function execute(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield (0, index_1.getForFiles)(src);
        console.log("Todas as imagens foram selecionadas.");
        yield (0, convert_1.convertImages)(files);
        console.log("Todas as imagens foram convertidas.");
        (0, process_1.exit)(process_1.exitCode);
    });
}
