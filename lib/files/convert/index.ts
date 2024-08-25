import _fs, { existsSync } from "node:fs";
import path from "node:path";
import _sharp from "sharp";
import { UseMetadata } from "../metadata";
import { ImageMetadata } from "../metadata/type";
import { stdout } from "node:process";

type Sharp = typeof _sharp;
type Fs = typeof _fs;

export default class Converter {
    private sharp: Sharp;
    private fs: Fs;
    private useMetadata: UseMetadata;

    constructor (sharp: Sharp, fs:Fs, root:string) {
        this.sharp = sharp;
        this.fs = fs;
        this.useMetadata = new UseMetadata(root);
    }

    async all () {
        const metadata = this.useMetadata.read();
        if (!metadata) throw new Error("Metadata não existe.");

        const altedMetadata:ImageMetadata[] = [];

        for (let i = 0; i < metadata.length; i++) {
            const item = metadata[i];
            const { src } = item.responsive[0];

            item.responsive = item.responsive.map((responsive) => {
                return {
                    ...responsive,
                    src: responsive.src.split(".").shift() || "",
                    extensions: ["webp", "avif", "png"]
                };
            })

            const responsive = item.responsive[0];
            let hasExist = true;
            responsive.extensions.forEach((ext) => {
                if (!existsSync(`${responsive.src}.${ext}`)) 
                    hasExist = false;
            })

            if (!hasExist) {
                const y = [".", "..", "..."];
                let x = 0;
                const loading = setInterval(() => {
                    stdout.write("\r"+y[x++]);
                    stdout.clearLine(1);
                    if (x >= y.length) x = 0;
                }, 200)
                await this.convertImage(src);
                clearInterval(loading);
                console.log("Imagem convertida com sucesso:", src.split("/").pop());
            }
            
            altedMetadata.push(item);
        }
        return this.useMetadata.write(altedMetadata);
    }
    
    async convertImage(file: string) {
        const newFileName = file.replace(".", "_temp.");
        this.fs.renameSync(file, newFileName)
        const type = file.split(".")[1];
        const image = this.sharp(newFileName);
        await image.png({ quality: 98 }).toFile(file.replace(type, "png"))
        await image.webp({ quality: 98 }).toFile(file.replace(type, "webp"))
        await image.avif({ quality: 98 }).toFile(file.replace(type, "avif"))
        this.fs.rmSync(newFileName);
    }
}