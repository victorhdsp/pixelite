import { readFileSync, writeFileSync } from "fs";
import * as cheerio from "cheerio";
import { UseMetadata } from "../metadata";
import path from "path";

export default class Sources {
    private root: string;
    private useMetadata: UseMetadata;

    constructor (root:string) {
        this.root = root;
        this.useMetadata = new UseMetadata(root);
    }

    all(pages: string[]) {
        for (let i = 0; i < pages.length; i++) {
            const file = path.join(this.root, pages[i]);
            this.generate(file);
        }
        return true;
    }

    generate(page:string) {
        const metadata = this.useMetadata.read();
        if (!metadata) throw new Error("Metadata não existe.");

        const $ = cheerio.load(readFileSync(page, "utf8"));

        $("img").each((index, img) => {
            const filename = img.attribs.src.split(".").shift() || "";
            const data = metadata.find(item => item.responsive[0].src.includes(filename));

            if (data) {
                const { src, width, height, extensions } = data.responsive[0];
                const alt = data.alt;

                const makeSource = (ext:string) => 
                    `<source srcset="${src}" type="image/${ext}" />`

                const makeImg = () => 
                    `<img src="${src}.png" width="${width}" height="${height}" alt="${alt}" />`

                const makePicture = () => (
                    `<picture>${ extensions.map((ext) => {
                            return ext === "png" ?
                            makeImg() :
                            makeSource(ext)
                        }).join("")}</picture>`
                )
                
                $(img).replaceWith(makePicture())
            }
        })
    
        writeFileSync(page, $.html());
    }
}