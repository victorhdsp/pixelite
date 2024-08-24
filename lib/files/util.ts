import { readdirSync } from "node:fs";

export default class Files {
    constructor() {}

    getInDir(src:string) {
        const files = readdirSync(src, { recursive: true });
        return files.filter(file => file.includes(".")).map(file => file.toString());
    }

    filterByType(files:string[], type:string) {
        return files.filter(file => file.includes(type));
    }
}