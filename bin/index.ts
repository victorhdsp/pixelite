#!/usr/bin/env node
import path from "node:path";
import { argv, cwd } from "node:process";
import { execute } from "../lib/index";

const root = cwd();

const states: Record<string, null|string> = {
    src: null,
}

argv.forEach((arg) => {
    const [key, value] = arg.split("=");

    switch (key) {
        case "src": states.src = path.join(root, value); break;
    
        default: break;
    }
})

// Validação
try {
    if (!states.src) throw new Error("Você não enviou o campo: src");
    execute(states.src)
} catch (e:any) {
    const error: Error = e;
    console.error(error.message);
}