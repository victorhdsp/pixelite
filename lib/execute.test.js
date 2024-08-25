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
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const index_1 = __importDefault(require("./index"));
const sharp_1 = __importDefault(require("../tests/__mocks__/sharp"));
const fs_1 = __importDefault(require("../tests/__mocks__/fs"));
describe("Execute the program", () => {
    const Sharp = sharp_1.default;
    const Fs = fs_1.default;
    const testDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/out");
    const tmpDir = node_path_1.default.join((0, node_process_1.cwd)(), "/tests/files/", "/tmp/out");
    const metadataDir = node_path_1.default.join(tmpDir, "/metadata.json");
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, node_fs_1.cpSync)(testDir, tmpDir, { recursive: true });
        yield new index_1.default(Sharp, Fs, tmpDir).execute();
    }));
    afterAll(() => (0, node_fs_1.rmSync)(tmpDir, { recursive: true }));
    it("Deve ter um backup em history.", () => {
        const backupDir = node_path_1.default.join((0, node_process_1.cwd)(), "/history/out");
        const backup = (0, node_fs_1.readdirSync)(backupDir);
        expect(backup).toBeTruthy();
    });
    it("Deve ter um arquivo de 'metadados' na pasta do arquivo.", () => {
        const metadata = (0, node_fs_1.readFileSync)(metadataDir);
        expect(metadata).toBeTruthy();
    });
    it("Não deve gerar um 'alt' pois ele já existe 'metadados'.", () => {
        const metadata = JSON.parse((0, node_fs_1.readFileSync)(metadataDir).toString());
        expect(metadata[1].alt).toBe("Priscila Jucá");
    });
    it("Deve gerar um 'alt' nos 'metadados'.", () => {
        const metadata = JSON.parse((0, node_fs_1.readFileSync)(metadataDir).toString());
        expect(metadata[0].alt).toBe("sem acesso a api para criar o 'alt'.");
    });
    it("Deve ter um 'width', 'height' nos 'metadados'.", () => {
        const metadata = JSON.parse((0, node_fs_1.readFileSync)(metadataDir).toString());
        const data1 = metadata[1].responsive[0];
        expect(data1.width).toBe(330);
        expect(data1.height).toBe(457);
    });
    it("Os arquivos HTML devem ter sido alterados.", () => {
        const htmlFile = node_path_1.default.join(tmpDir, "/index.html");
        const html = (0, node_fs_1.readFileSync)(htmlFile).toString();
        expect(html.includes("<picture")).toBe(true);
    });
    it("Deve ter um '.avif' e '.webp' nos 'metadados'.", () => {
        const metadata = JSON.parse((0, node_fs_1.readFileSync)(metadataDir).toString());
        const data1 = metadata[0].responsive[0];
        expect(data1.extensions.toString()).toBe("webp,avif,png");
    });
});
