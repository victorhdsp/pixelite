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
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const cheerio = __importStar(require("cheerio"));
const _1 = require(".");
describe("Sources", () => {
    const testDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/out");
    const tmpDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/tmp/sources");
    beforeEach(() => {
        (0, node_fs_1.cpSync)(testDir, tmpDir, { recursive: true });
    });
    afterEach(() => {
        (0, node_fs_1.rmSync)(tmpDir, { recursive: true });
    });
    it("Deve ter buscado os arquivos e adicionado os pictures", () => {
        const file = node_path_1.default.join(tmpDir, "index.html");
        const $old = cheerio.loadBuffer((0, node_fs_1.readFileSync)(file));
        (0, _1.getTagsImage)(file);
        const $new = cheerio.loadBuffer((0, node_fs_1.readFileSync)(file));
        expect($old("img").get().length).toBe($new("picture").get().length);
        expect($old("img").get().length).toBe($new("img").get().length);
        expect($old("img").get().length).toBe($new("source").get().length / 2);
    });
});
