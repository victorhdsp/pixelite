import { readdirSync, cpSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

export function filter(files:string[]) {
    return files.filter((file) => {
        return file.includes("png") || 
                file.includes("jpg");
    })
}

export function getForFiles(dir: string) {
    function serchingFile (dir: string) {
        const dirs = readdirSync(dir)
        let files: string[] = [];
    
        for (let i = 0; i < dirs.length; i++) {
            const name = dirs[i];
            if (name.includes(".")) {
                files.push(path.join(dir, name));
            } else {
                const newFiles = serchingFile(path.join(dir, name));
                newFiles.forEach((file) => files.push(file))
            }
        }
    
        return filter(files);
    }

    const result = serchingFile(dir);
    console.log("Todas as imagens foram selecionadas.");
    return result;
}

export function makeBackup(dir: string) {
    const name = dir.split("/").reverse()[0];
    const backupDir = path.join(cwd(), "/history", name);
    const hasExist = existsSync(backupDir);
    if (hasExist) rmSync(backupDir, { recursive: true });
    cpSync(dir, backupDir, { recursive: true });
    console.log("Backup criado em " + backupDir);
}