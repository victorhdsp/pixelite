"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const node_fs_1 = require("node:fs");
const index_1 = require("./index");
describe("getForFiles", () => {
    const testDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/out");
    const tmpDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/tmp/files");
    beforeEach(() => {
        (0, node_fs_1.cpSync)(testDir, tmpDir, { recursive: true });
    });
    afterEach(() => {
        (0, node_fs_1.rmSync)(tmpDir, { recursive: true });
    });
    it("Deve retornar apenas os arquivos do tipo .png", () => {
        console.log = jest.fn();
        const result = (0, index_1.getForFiles)(tmpDir);
        expect(result).toEqual([
            node_path_1.default.join(tmpDir, "/404.html"),
            node_path_1.default.join(tmpDir, "/img/favicon.png"),
            node_path_1.default.join(tmpDir, "/img/home/aboutus.png"),
            node_path_1.default.join(tmpDir, "/img/home/contact.png"),
            node_path_1.default.join(tmpDir, "/img/home/hero.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/bh-1.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/bh-3.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/carol-1.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/carol-2.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/carol-3.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/karina-1.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/michelle-1.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/michelle-2.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/pamella-1.png"),
            node_path_1.default.join(tmpDir, "/img/home/portfolio/pamella-2.png"),
            node_path_1.default.join(tmpDir, "/index.html"),
        ]);
        expect(console.log).toHaveBeenCalledWith("Todas as imagens foram selecionadas.");
    });
});
describe("makeBackup", () => {
    const testDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/out");
    it("Deve retornar o backup no history", () => {
        const testHistory = node_path_1.default.join((0, node_process_1.cwd)(), "/history");
        (0, index_1.makeBackup)(testDir);
        const history = (0, node_fs_1.readdirSync)(testHistory);
        expect(history).toContain("out");
        (0, node_fs_1.rmSync)(node_path_1.default.join(testHistory, "/out"), { recursive: true });
    });
});
