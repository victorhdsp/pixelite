import { exit, exitCode } from "process";
import { convertImages } from "./convert";
import { getForFiles } from "./files/index";
import { twirlTimer } from "./utils";

export async function execute(src: string) {
    await twirlTimer();
    const files = await getForFiles(src);
    console.log("Todas as imagens foram selecionadas.");
    await convertImages(files);
    console.log("Todas as imagens foram convertidas.");
    exit(exitCode);
}