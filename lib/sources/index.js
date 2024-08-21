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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTagsImage = getTagsImage;
const fs_1 = require("fs");
const cheerio = __importStar(require("cheerio"));
function getTagsImage(file) {
    const $ = cheerio.load((0, fs_1.readFileSync)(file, "utf8"));
    $("img").each((index, img) => {
        const filenameUntyped = img.attribs.src.split(".")[0];
        $(img).replaceWith(`
            <picture>
                <source 
                    srcset="${filenameUntyped + '.avif'}" 
                    type="image/avif" 
                />
                <source 
                    srcset="${filenameUntyped + '.webp'}" 
                    type="image/webp" 
                />
                <img
                    src="${filenameUntyped + '.png'}"
                    width="${img.attribs.width}"
                    height="${img.attribs.height}"
                    alt="${img.attribs.alt}" 
                />
            </picture>
        `);
    });
    (0, fs_1.writeFileSync)(file, $.html());
}
