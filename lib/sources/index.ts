import { readFileSync, writeFileSync } from "fs";
import { typeMarking, verifyTypeFile } from "../files";
import * as cheerio from "cheerio";

export function getTagsImage(file:string) {
    const $ = cheerio.load(readFileSync(file, "utf8"));
    $("img").each((index, img) => {
        const filenameUntyped = img.attribs.src.split(".")[0];

        $(img).replaceWith(`
            <picture>
                <source 
                    srcset="${filenameUntyped+'.avif'}" 
                    type="image/avif" 
                />
                <source 
                    srcset="${filenameUntyped+'.webp'}" 
                    type="image/webp" 
                />
                <img
                    src="${filenameUntyped+'.png'}"
                    width="${img.attribs.width}"
                    height="${img.attribs.height}"
                    alt="${img.attribs.alt}" 
                />
            </picture>
        `)
    })

    writeFileSync(file, $.html());
}