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
exports.convertImages = convertImages;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
function convertImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const newFileName = file.replace(".", "_temp.");
        (0, fs_1.renameSync)(file, newFileName);
        const type = file.split(".")[1];
        const image = (0, sharp_1.default)(newFileName);
        yield image.png({ quality: 98 }).toFile(file.replace(type, "png"));
        yield image.webp({ quality: 98 }).toFile(file.replace(type, "webp"));
        yield image.avif({ quality: 98 }).toFile(file.replace(type, "avif"));
        (0, fs_1.rmSync)(newFileName);
    });
}
function convertImages(files) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            yield convertImage(file);
            console.log("Convertendo imagem: ", file);
        }
        console.log("Todas as imagens foram convertidas.");
    });
}
