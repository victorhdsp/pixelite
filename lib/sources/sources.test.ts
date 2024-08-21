import { cpSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import * as cheerio from "cheerio";
import { getTagsImage } from ".";

describe("Sources", () => {
    const testDir = path.join(cwd(), "/tests/files/", "/out");
    const tmpDir = path.join(cwd(), "/tests/files/", "/tmp/sources");

    beforeEach(() => {
        cpSync(testDir, tmpDir, { recursive: true });
    });

    afterEach(() => {
        rmSync(tmpDir, { recursive: true });
    })

    it("Deve ter buscado os arquivos e adicionado os pictures", () => {
        const file = path.join(tmpDir, "index.html");
        const $old = cheerio.loadBuffer(readFileSync(file));
        getTagsImage(file);
        const $new = cheerio.loadBuffer(readFileSync(file));
        expect($old("img").get().length).toBe($new("picture").get().length)
        expect($old("img").get().length).toBe($new("img").get().length)
        expect($old("img").get().length).toBe($new("source").get().length / 2)
    });
})
