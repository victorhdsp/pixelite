"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const metadata_1 = require("../metadata");
const node_fs_1 = require("node:fs");
class Information {
    constructor(root) {
        this.root = root;
        this.useMetadata = new metadata_1.UseMetadata(root);
    }
    getImageTag(page) {
        const ignoredTags = [];
        const tags = [];
        page.split("<picture").forEach((part, index) => {
            if (index === 0)
                return;
            page.split("<img").forEach((part, index) => {
                if (index === 0)
                    return;
                if (part.includes(">")) {
                    const content = part.split(">")[0];
                    ignoredTags.push(`<img${content}>`);
                }
            });
        });
        page.split("<img").forEach((part, index) => {
            if (index === 0)
                return;
            if (part.includes(">")) {
                const content = part.split(">")[0];
                if (!ignoredTags.includes(`<img${content}>`))
                    tags.push(`<img${content}>`);
            }
        });
        return tags;
    }
    all(pages) {
        const metadata = this.useMetadata.read();
        if (!metadata)
            throw new Error("Metadata não existe.");
        const altedMetadata = [];
        for (let i = 0; i < pages.length; i++) {
            const file = node_path_1.default.join(this.root, pages[i]);
            const page = (0, node_fs_1.readFileSync)(file).toString();
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
                });
                altedMetadata.push(item);
            }
        }
        return this.useMetadata.write(altedMetadata);
    }
}
exports.default = Information;
