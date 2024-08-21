import { rmSync, renameSync } from "fs";
import sharp from "sharp";
import { typeImages, verifyTypeFile } from "../files";

async function convertImage(file: string) {
    const newFileName = file.replace(".", "_temp.");
    renameSync(file, newFileName)
    const type = file.split(".")[1];
    const image = sharp(newFileName);
    await image.png({ quality: 98 }).toFile(file.replace(type, "png"))
    await image.webp({ quality: 98 }).toFile(file.replace(type, "webp"))
    await image.avif({ quality: 98 }).toFile(file.replace(type, "avif"))
    rmSync(newFileName);
}

export async function convertImages (files: string[]) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (verifyTypeFile(typeImages, file))
            await convertImage(file);
        console.log("Convertendo imagem: ", file);
    }
    console.log("Todas as imagens foram convertidas.");
}