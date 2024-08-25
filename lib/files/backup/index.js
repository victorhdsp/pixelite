"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
class Backup {
    constructor() {
        this.backupDir = (name) => {
            return node_path_1.default.join((0, node_process_1.cwd)(), "/history", name);
        };
    }
    create(dir) {
        const name = dir.split("/").reverse()[0];
        const hasExist = (0, node_fs_1.existsSync)(this.backupDir(name));
        if (hasExist) {
            (0, node_fs_1.rmSync)(this.backupDir(name), { recursive: true });
        }
        ;
        (0, node_fs_1.cpSync)(dir, this.backupDir(name), { recursive: true });
        return this.backupDir(name);
    }
}
exports.default = Backup;
