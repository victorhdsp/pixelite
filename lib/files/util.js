"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
class Files {
    constructor() { }
    getInDir(src) {
        const files = (0, node_fs_1.readdirSync)(src, { recursive: true });
        return files.filter(file => file.includes(".")).map(file => file.toString());
    }
    filterByType(files, type) {
        return files.filter(file => file.includes(type));
    }
}
exports.default = Files;
