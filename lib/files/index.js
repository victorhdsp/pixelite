"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = filter;
exports.getForFiles = getForFiles;
exports.makeBackup = makeBackup;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
function filter(files) {
    return files.filter((file) => {
        return file.includes("png") ||
            file.includes("jpg");
    });
}
function getForFiles(dir) {
    function serchingFile(dir) {
        const dirs = (0, node_fs_1.readdirSync)(dir);
        let files = [];
        for (let i = 0; i < dirs.length; i++) {
            const name = dirs[i];
            if (name.includes(".")) {
                files.push(node_path_1.default.join(dir, name));
            }
            else {
                const newFiles = serchingFile(node_path_1.default.join(dir, name));
                newFiles.forEach((file) => files.push(file));
            }
        }
        return filter(files);
    }
    const result = serchingFile(dir);
    console.log("Todas as imagens foram selecionadas.");
    return result;
}
function makeBackup(dir) {
    const name = dir.split("/").reverse()[0];
    const backupDir = node_path_1.default.join((0, node_process_1.cwd)(), "/history", name);
    const hasExist = (0, node_fs_1.existsSync)(backupDir);
    if (hasExist)
        (0, node_fs_1.rmSync)(backupDir, { recursive: true });
    (0, node_fs_1.cpSync)(dir, backupDir, { recursive: true });
    console.log("Backup criado em " + backupDir);
}
