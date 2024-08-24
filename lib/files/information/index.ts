import path from "node:path";
import { UseMetadata } from "../metadata";
import { ImageMetadata } from "../metadata/type";
import { readFileSync } from "node:fs";

export default class Information {
    private useMetadata: UseMetadata;
    private root: string;

    constructor (root:string) {
        this.root = root;
        this.useMetadata = new UseMetadata(root);
    }

    getImageTag(page: string) {
        const ignoredTags: string[] = [];
        const tags: string[] = [];
        
        page.split("<picture").forEach((part, index) => {
            if (index === 0) return;
            page.split("<img").forEach((part, index) => {
                if (index === 0) return;
                if (part.includes(">")) {
                    const content = part.split(">")[0];
                    ignoredTags.push(`<img${content}>`)
                }
            })
        })

        page.split("<img").forEach((part, index) => {
            if (index === 0) return;
            if (part.includes(">")) {
                const content = part.split(">")[0];
                if (!ignoredTags.includes(`<img${content}>`))
                    tags.push(`<img${content}>`)
            }
        })
        
        return tags;
    }

    all (pages:string[]) {
        const metadata = this.useMetadata.read();
        if (!metadata) throw new Error("Metadata não existe.");

        const altedMetadata:ImageMetadata[] = [];
        
        for (let i = 0; i < pages.length; i++) {
            const file = path.join(this.root, pages[i]);
            const page = readFileSync(file).toString();

            for (let i = 0; i < metadata.length; i++) {
                const item = metadata[i];
                this.getImageTag(page).forEach((tag) => {
                    const src = tag.split('src="')[1].split('"')[0].split(".").shift() || "";
                    const width = tag.split('width="')[1].split('"')[0];
                    const height = tag.split('height="')[1].split('"')[0];
                    const alt = tag.split('alt="')[1].split('"')[0];

                    if (item.responsive[0].src.includes(src)) {
                        item.responsive[0].width = parseInt(width);
                        item.responsive[0].height = parseInt(height);
                        item.alt = alt;
                    }
                })
                altedMetadata.push(item);
            }
        }
        
        return this.useMetadata.write(altedMetadata);
    }
}