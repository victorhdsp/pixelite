#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = require("node:process");
const index_1 = require("../lib/index");
const root = (0, node_process_1.cwd)();
const states = {
    src: null,
};
node_process_1.argv.forEach((arg) => {
    const [key, value] = arg.split("=");
    switch (key) {
        case "src":
            states.src = node_path_1.default.join(root, value);
            break;
        default: break;
    }
});
// Validação
try {
    if (!states.src)
        throw new Error("Você não enviou o campo: src");
    (0, index_1.execute)(states.src);
}
catch (e) {
    const error = e;
    console.error(error.message);
}
