"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const cheerio = __importStar(require("cheerio"));
const metadata_1 = require("../metadata");
const path_1 = __importDefault(require("path"));
class Sources {
    constructor(root) {
        this.root = root;
        this.useMetadata = new metadata_1.UseMetadata(root);
    }
    all(pages) {
        for (let i = 0; i < pages.length; i++) {
            const file = path_1.default.join(this.root, pages[i]);
            this.generate(file);
        }
        return true;
    }
    generate(page) {
        const metadata = this.useMetadata.read();
        if (!metadata)
            throw new Error("Metadata não existe.");
        const $ = cheerio.load((0, fs_1.readFileSync)(page, "utf8"));
        $("img").each((index, img) => {
            const filename = img.attribs.src.split(".").shift() || "";
            const data = metadata.find(item => item.responsive[0].src.includes(filename));
            if (data) {
                const { src, width, height, extensions } = data.responsive[0];
                const alt = data.alt;
                const makeSource = (ext) => `<source srcset="${src}" type="image/${ext}" />`;
                const makeImg = () => `<img src="${src}.png" width="${width}" height="${height}" alt="${alt}" />`;
                const makePicture = () => (`<picture>${extensions.map((ext) => {
                    return ext === "png" ?
                        makeImg() :
                        makeSource(ext);
                }).join("")}</picture>`);
                $(img).replaceWith(makePicture());
            }
        });
        (0, fs_1.writeFileSync)(page, $.html());
    }
}
exports.default = Sources;
