import { getForFiles } from "./index";

jest.mock("node:fs/promises", () => ({
    readdir: async (dir: string) => {
        if (dir === "/rootDir") {
            return [
                "file1.txt", 
                "image.png", 
                "subdir"
            ];
        } else if (dir === "/rootDir/subdir") {
            return [
                "file2.png", 
                "file3.txt"
            ];
        }
        return [];
    }
}));

describe("getForFiles", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("Deve retornar apenas os arquivos do tipo .png", async () => {
        const result = await getForFiles("/rootDir");

        expect(result).toEqual([
            "/rootDir/image.png",
            "/rootDir/subdir/file2.png"
        ]);
    });
});