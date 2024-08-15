import { readdir } from "node:fs/promises"
import path from "node:path";

export function filter(files:string[]) {
    return files.filter((file) => {
        if (file.includes("png")) {
            return true;
        }
    })
}

export async function getForFiles(dir: string) {
    const dirs = await readdir(dir)
    let files: string[] = [];

    for (let i = 0; i < dirs.length; i++) {
        const name = dirs[i];
        if (name.includes(".")) {
            files.push(path.join(dir, name));
        } else {
            const newFiles = await getForFiles(path.join(dir, name));
            newFiles.forEach((file) => files.push(file))
        }
    }

    return filter(files);
}