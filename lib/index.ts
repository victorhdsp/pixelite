import { exit, exitCode } from "process";
import { convertImages } from "./convert";
import { getForFiles, makeBackup } from "./files/index";
import { twirlTimer } from "./utils";

export async function execute(src: string) {
    makeBackup(src);
    const files = getForFiles(src);
    await twirlTimer();
    await convertImages(files);
    exit(exitCode);
}