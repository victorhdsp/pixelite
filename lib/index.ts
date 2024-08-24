import { exit, exitCode } from "process";

import Files from "./files/util";
import Backup from "./files/backup";
import Metadata from "./files/metadata";
import ConvertImages from "./files/convert";
import _sharp from "sharp";
import _fs from "node:fs";
import CreateCaption from "./files/caption";
import Information from "./files/information";
import Sources from "./files/sources";

type Sharp = typeof _sharp;
type Fs = typeof _fs;

export default class Pixelite {
    private root: string;
    private files: Files;
    private backup: Backup;
    private metadata: Metadata;
    private information: Information;
    private createCaption: CreateCaption;
    private convertImages: ConvertImages;
    private sources: Sources;
    
    constructor(sharp: Sharp, fs: Fs, src: string) {
        this.root = src;
        this.files = new Files();
        this.backup = new Backup();
        this.metadata = new Metadata(this.root);
        this.information = new Information(this.root);
        this.createCaption = new CreateCaption(this.root);
        this.convertImages = new ConvertImages(sharp, fs, this.root);
        this.sources = new Sources(this.root);
    }

    async execute() {
        const backupDir = this.backup.create(this.root);
        console.log("Backup criado em " + backupDir);
    
        const fileList = this.files.getInDir(this.root);

        const imagesName: string[] = [
            ...this.files.filterByType(fileList, ".png"),
            ...this.files.filterByType(fileList, ".jpg"),
            ...this.files.filterByType(fileList, ".jpeg"),
        ];
        const metadataStarted = this.metadata.start(imagesName);
        if (!metadataStarted) throw new Error("Metadata não foi criada");
        console.log("Metadata criado.");

        const pages: string[] = [
            ...this.files.filterByType(fileList, ".html")
        ]
        const metadataWithInformation = this.information.all(pages);
        if (!metadataWithInformation) throw new Error("Metadata não foi criada");
        console.log("Informações coletadas com sucesso!");

        const metadataWithCaption = await this.createCaption.all();
        if (!metadataWithCaption) throw new Error("Metadata não foi criada");
        console.log("'Alts' gerados com sucesso!");

        const metadataWithImages = await this.convertImages.all();
        if (!metadataWithImages) throw new Error("Metadata não foi criada");
        console.log("Todas as imagens foram convertidas.");

        const htmlChanged = this.sources.all(pages);
        if (!htmlChanged) throw new Error("Metadata não foi criada");
        console.log("As 'tags' nas paginas foram alteradas.");

        return true;
    }
}

export async function execute(src: string) {
    const pixelite = new Pixelite(_sharp, _fs, src);
    await pixelite.execute()
    exit(exitCode);
}