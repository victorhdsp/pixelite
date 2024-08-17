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
const index_1 = require("./index");
jest.mock("node:fs/promises", () => ({
    readdir: (dir) => __awaiter(void 0, void 0, void 0, function* () {
        if (dir === "/rootDir") {
            return [
                "file1.txt",
                "image.png",
                "subdir"
            ];
        }
        else if (dir === "/rootDir/subdir") {
            return [
                "file2.png",
                "file3.txt"
            ];
        }
        return [];
    })
}));
describe("getForFiles", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("Deve retornar apenas os arquivos do tipo .png", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.getForFiles)("/rootDir");
        expect(result).toEqual([
            "/rootDir/image.png",
            "/rootDir/subdir/file2.png"
        ]);
    }));
});
