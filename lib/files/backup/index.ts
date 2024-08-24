import { cpSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

export default class Backup {
    private backupDir: (name:string) => string;

    constructor() {
        this.backupDir = (name: string) => {
            return path.join(cwd(), "/history", name)
        };
    }

    create(dir: string) {
        const name = dir.split("/").reverse()[0];
        const hasExist = existsSync(this.backupDir(name));

        if (hasExist) {
            rmSync(this.backupDir(name), { recursive: true });
        };

        cpSync(dir, this.backupDir(name), { recursive: true });
        
        return this.backupDir(name);
    }
}