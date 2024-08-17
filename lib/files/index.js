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
exports.filter = filter;
exports.getForFiles = getForFiles;
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
function filter(files) {
    return files.filter((file) => {
        if (file.includes("png")) {
            return true;
        }
    });
}
function getForFiles(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirs = yield (0, promises_1.readdir)(dir);
        let files = [];
        for (let i = 0; i < dirs.length; i++) {
            const name = dirs[i];
            if (name.includes(".")) {
                files.push(node_path_1.default.join(dir, name));
            }
            else {
                const newFiles = yield getForFiles(node_path_1.default.join(dir, name));
                newFiles.forEach((file) => files.push(file));
            }
        }
        return filter(files);
    });
}
