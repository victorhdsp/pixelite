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
const generative_ai_1 = require("@google/generative-ai");
const node_fs_1 = require("node:fs");
const metadata_1 = require("../metadata");
const prompt_1 = require("./prompt");
class CreateCaption {
    constructor(root) {
        const API_KEY = process.env.API_KEY;
        this.useMetadata = new metadata_1.UseMetadata(root);
        if (API_KEY) {
            this.genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
        }
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = this.useMetadata.read();
            if (!metadata)
                throw new Error("Metadata não existe.");
            const altedMetadata = [];
            for (let i = 0; i < metadata.length; i++) {
                const item = metadata[i];
                let altedItem = item;
                if (!item.alt) {
                    altedItem = yield this.unique(item);
                }
                altedMetadata.push(altedItem);
            }
            return this.useMetadata.write(altedMetadata);
        });
    }
    unique(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const src = data.responsive[0].src;
            const extension = src.split(".").reverse()[0];
            if (!this.genAI) {
                data.alt = "sem acesso a api para criar o 'alt'.";
                return data;
            }
            const model = this.genAI.getGenerativeModel({
                model: "gemini-1.5-pro"
            });
            const result = yield model.generateContent([
                { inlineData: {
                        data: (0, node_fs_1.readFileSync)(src, "base64"),
                        mimeType: `image/${extension}`
                    } },
                prompt_1.promptWriteAlt,
                prompt_1.promptAltRules
            ]);
            data.alt = result.response.text();
            return data;
        });
    }
}
exports.default = CreateCaption;
