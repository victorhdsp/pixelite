import { ImageMetadata } from "./type";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

export default class CreateMetadata {
    private root: string;
    private useMetadata: UseMetadata;

    constructor (root:string) {
        this.root = root;
        this.useMetadata = new UseMetadata(root);
    }

    hasInFile(image:string): ImageMetadata | undefined {
        const metadata = this.useMetadata.read();
        if (!metadata) return undefined;

        return metadata.find(({responsive, updatedAt}) => (
            responsive[0].src === image &&  updatedAt === statSync(image).mtimeMs
        ))
    }

    start(images: string[]): boolean {
        const metadata: ImageMetadata[] = [];
    
        images.forEach((filename) => {
            const file = path.join(this.root, filename);
            if (!this.hasInFile(file)) {
                metadata.push({
                    responsive: [{
                        src: file,
                        width: 0,
                        height: 0,
                        extensions: []
                    }],
                    alt: "",
                    updatedAt: statSync(file).mtimeMs
                })
            }
        })
    
        return this.useMetadata.write(metadata);
    }
}

export class UseMetadata {
    private root: string;
    private metadataDir: string;

    constructor (root:string) {
        this.root = root;
        this.metadataDir = path.join(this.root, '/metadata.json');
    }

    public write(metadata:ImageMetadata[]): boolean {
        if(metadata.length > 0) {
            writeFileSync(this.metadataDir, JSON.stringify(metadata));
        }

        const hasCreated = existsSync(this.metadataDir);
        if (!hasCreated) throw new Error("Metadata não foi criado.");
        
        return hasCreated;
    }

    public read(): ImageMetadata[] | undefined {
        try {
            const metadata = readFileSync(this.metadataDir).toString();
            return JSON.parse(metadata)
        } catch (error) {
            return undefined;
        }
    }
}