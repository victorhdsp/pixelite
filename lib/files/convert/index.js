"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const metadata_1 = require("../metadata");
const node_process_1 = require("node:process");
class Converter {
    constructor(sharp, fs, root) {
        this.sharp = sharp;
        this.fs = fs;
        this.useMetadata = new metadata_1.UseMetadata(root);
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = this.useMetadata.read();
            if (!metadata)
                throw new Error("Metadata não existe.");
            const altedMetadata = [];
            for (let i = 0; i < metadata.length; i++) {
                const item = metadata[i];
                const { src } = item.responsive[0];
                item.responsive = item.responsive.map((responsive) => {
                    return Object.assign(Object.assign({}, responsive), { src: responsive.src.split(".").shift() || "", extensions: ["webp", "avif", "png"] });
                });
                const responsive = item.responsive[0];
                let hasExist = true;
                responsive.extensions.forEach((ext) => {
                    if (!(0, node_fs_1.existsSync)(`${responsive.src}.${ext}`))
                        hasExist = false;
                });
                if (!hasExist) {
                    const y = [".", "..", "..."];
                    let x = 0;
                    const loading = setInterval(() => {
                        node_process_1.stdout.write("\r" + y[x++]);
                        node_process_1.stdout.clearLine(1);
                        if (x >= y.length)
                            x = 0;
                    }, 200);
                    yield this.convertImage(src);
                    clearInterval(loading);
                    console.log("Imagem convertida com sucesso:", src.split("/").pop());
                }
                altedMetadata.push(item);
            }
            return this.useMetadata.write(altedMetadata);
        });
    }
    convertImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFileName = file.replace(".", "_temp.");
            this.fs.renameSync(file, newFileName);
            const type = file.split(".")[1];
            const image = this.sharp(newFileName);
            yield image.png({ quality: 98 }).toFile(file.replace(type, "png"));
            yield image.webp({ quality: 98 }).toFile(file.replace(type, "webp"));
            yield image.avif({ quality: 98 }).toFile(file.replace(type, "avif"));
            this.fs.rmSync(newFileName);
        });
    }
}
exports.default = Converter;
