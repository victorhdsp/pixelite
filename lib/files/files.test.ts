import { cwd } from "node:process";
import path from "node:path";
import { cpSync, rmSync } from "node:fs";
import { getForFiles } from "./index";

describe("getForFiles", () => {
    const testDir = path.join(cwd(), "/tests/files/", "/out");
    const tmpDir = path.join(cwd(), "/tests/files/", "/tmp/files");

    beforeEach(() => {
        cpSync(testDir, tmpDir, { recursive: true });
    });

    afterEach(() => {
        rmSync(tmpDir, { recursive: true });
    })

    it("Deve retornar apenas os arquivos do tipo .png", () => {
        console.log = jest.fn();
        const result = getForFiles(tmpDir);

        expect(result).toEqual([
            path.join(tmpDir, "/img/favicon.png"),
            path.join(tmpDir, "/img/home/aboutus.png"),
            path.join(tmpDir, "/img/home/contact.png"),
            path.join(tmpDir, "/img/home/hero.png"),
            path.join(tmpDir, "/img/home/portfolio/bh-1.png"),
            path.join(tmpDir, "/img/home/portfolio/bh-3.png"),
            path.join(tmpDir, "/img/home/portfolio/carol-1.png"),
            path.join(tmpDir, "/img/home/portfolio/carol-2.png"),
            path.join(tmpDir, "/img/home/portfolio/carol-3.png"),
            path.join(tmpDir, "/img/home/portfolio/karina-1.png"),
            path.join(tmpDir, "/img/home/portfolio/michelle-1.png"),
            path.join(tmpDir, "/img/home/portfolio/michelle-2.png"),
            path.join(tmpDir, "/img/home/portfolio/pamella-1.png"),
            path.join(tmpDir, "/img/home/portfolio/pamella-2.png"),
        ]);

        expect(console.log).toHaveBeenCalledWith("Todas as imagens foram selecionadas.");
    });
});