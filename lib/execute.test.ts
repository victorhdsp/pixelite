import fs, { cpSync, readdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import Pixelite from "./index";

import _Sharp from "../tests/__mocks__/sharp";
import _Fs from "../tests/__mocks__/fs";

describe("Execute the program", () => {
    const Sharp:any = _Sharp;
    const Fs:any = _Fs;
    
    const testDir = path.join(cwd(), "/tests/files/", "/out");
    const tmpDir = path.join(cwd(), "/tests/files/", "/tmp/out");
    const metadataDir = path.join(tmpDir, "/metadata.json");
    
    
    beforeAll(async () => {
        cpSync(testDir, tmpDir, { recursive: true });
        await new Pixelite(Sharp, Fs, tmpDir).execute();
    });
    afterAll(() => rmSync(tmpDir, { recursive: true }));
    
    
    it("Deve ter um backup em history.", () => {
        const backupDir = path.join(cwd(), "/history/out");
        const backup = readdirSync(backupDir);
        expect(backup).toBeTruthy();
    });
    
    it("Deve ter um arquivo de 'metadados' na pasta do arquivo.", () => {
        const metadata = readFileSync(metadataDir);
        expect(metadata).toBeTruthy();
    });

    it("Não deve gerar um 'alt' pois ele já existe 'metadados'.", () => {
        const metadata = JSON.parse(readFileSync(metadataDir).toString());
        expect(metadata[1].alt).toBe("Priscila Jucá");
    });

    it("Deve gerar um 'alt' nos 'metadados'.", () => {
        const metadata = JSON.parse(readFileSync(metadataDir).toString());
        expect(metadata[0].alt).toBe("sem acesso a api para criar o 'alt'.");
    });
    
    it("Deve ter um 'width', 'height' nos 'metadados'.", () => {
        const metadata = JSON.parse(readFileSync(metadataDir).toString());
        const data1 = metadata[1].responsive[0];
        expect(data1.width).toBe(330);
        expect(data1.height).toBe(457);
    });
    
    it("Os arquivos HTML devem ter sido alterados.", () => {
        const htmlFile = path.join(tmpDir, "/index.html");
        const html = readFileSync(htmlFile).toString();
        expect(html.includes("<picture")).toBe(true)
    });
    
    it("Deve ter um '.avif' e '.webp' nos 'metadados'.", () => {
        const metadata = JSON.parse(readFileSync(metadataDir).toString());
        const data1 = metadata[0].responsive[0];
        expect(data1.extensions.toString()).toBe("webp,avif,png");
    });
})