import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "node:fs";
import { UseMetadata } from "../metadata";
import { ImageMetadata } from "../metadata/type";
import { promptAltRules, promptWriteAlt } from "./prompt";

export default class CreateCaption {
    private useMetadata: UseMetadata;
    private genAI: GoogleGenerativeAI|undefined;

    constructor (root:string) {
        const API_KEY = process.env.API_KEY;
        this.useMetadata = new UseMetadata(root);
        if (API_KEY) {
            this.genAI = new GoogleGenerativeAI(API_KEY);
        }
    }
    
    async all() {
        const metadata = this.useMetadata.read();
        if (!metadata) throw new Error("Metadata não existe.");

        const altedMetadata:ImageMetadata[] = [];

        for (let i = 0; i < metadata.length; i++) {
            const item = metadata[i];
            let altedItem = item;

            if (!item.alt) {
                altedItem = await this.unique(item);
            }
            
            altedMetadata.push(altedItem);
        }
        return this.useMetadata.write(altedMetadata);
    }

    async unique(data: ImageMetadata) {
        const src: string = data.responsive[0].src;
        const extension: string = src.split(".").reverse()[0];

        if (!this.genAI) {
            data.alt = "sem acesso a api para criar o 'alt'.";
            return data;
        }

        const model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-pro"
        });
    
        const result = await model.generateContent([
            {inlineData: {
                data: readFileSync(src, "base64"),
                mimeType: `image/${extension}`
            }},
            promptWriteAlt,
            promptAltRules
        ])
        
        data.alt = result.response.text();
        return data;
    }
}