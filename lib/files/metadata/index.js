"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMetadata = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
class CreateMetadata {
    constructor(root) {
        this.root = root;
        this.useMetadata = new UseMetadata(root);
    }
    hasInFile(image) {
        const metadata = this.useMetadata.read();
        if (!metadata)
            return undefined;
        return metadata.find(({ responsive, updatedAt }) => (responsive[0].src === image && updatedAt === (0, node_fs_1.statSync)(image).mtimeMs));
    }
    start(images) {
        const metadata = [];
        images.forEach((filename) => {
            const file = node_path_1.default.join(this.root, filename);
            if (!this.hasInFile(file)) {
                metadata.push({
                    responsive: [{
                            src: file,
                            width: 0,
                            height: 0,
                            extensions: []
                        }],
                    alt: "",
                    updatedAt: (0, node_fs_1.statSync)(file).mtimeMs
                });
            }
        });
        return this.useMetadata.write(metadata);
    }
}
exports.default = CreateMetadata;
class UseMetadata {
    constructor(root) {
        this.root = root;
        this.metadataDir = node_path_1.default.join(this.root, '/metadata.json');
    }
    write(metadata) {
        if (metadata.length > 0) {
            (0, node_fs_1.writeFileSync)(this.metadataDir, JSON.stringify(metadata));
        }
        const hasCreated = (0, node_fs_1.existsSync)(this.metadataDir);
        if (!hasCreated)
            throw new Error("Metadata não foi criado.");
        return hasCreated;
    }
    read() {
        try {
            const metadata = (0, node_fs_1.readFileSync)(this.metadataDir).toString();
            return JSON.parse(metadata);
        }
        catch (error) {
            return undefined;
        }
    }
}
exports.UseMetadata = UseMetadata;
