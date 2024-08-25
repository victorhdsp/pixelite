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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const process_1 = require("process");
const util_1 = __importDefault(require("./files/util"));
const backup_1 = __importDefault(require("./files/backup"));
const metadata_1 = __importDefault(require("./files/metadata"));
const convert_1 = __importDefault(require("./files/convert"));
const sharp_1 = __importDefault(require("sharp"));
const node_fs_1 = __importDefault(require("node:fs"));
const caption_1 = __importDefault(require("./files/caption"));
const information_1 = __importDefault(require("./files/information"));
const sources_1 = __importDefault(require("./files/sources"));
class Pixelite {
    constructor(sharp, fs, src) {
        this.root = src;
        this.files = new util_1.default();
        this.backup = new backup_1.default();
        this.metadata = new metadata_1.default(this.root);
        this.information = new information_1.default(this.root);
        this.createCaption = new caption_1.default(this.root);
        this.convertImages = new convert_1.default(sharp, fs, this.root);
        this.sources = new sources_1.default(this.root);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const backupDir = this.backup.create(this.root);
            console.log("Backup criado em " + backupDir);
            const fileList = this.files.getInDir(this.root);
            const imagesName = [
                ...this.files.filterByType(fileList, ".png"),
                ...this.files.filterByType(fileList, ".jpg"),
                ...this.files.filterByType(fileList, ".jpeg"),
            ];
            const metadataStarted = this.metadata.start(imagesName);
            if (!metadataStarted)
                throw new Error("Metadata não foi criada");
            console.log("Metadata criado.");
            const pages = [
                ...this.files.filterByType(fileList, ".html")
            ];
            const metadataWithInformation = this.information.all(pages);
            if (!metadataWithInformation)
                throw new Error("Metadata não foi criada");
            console.log("Informações coletadas com sucesso!");
            const metadataWithCaption = yield this.createCaption.all();
            if (!metadataWithCaption)
                throw new Error("Metadata não foi criada");
            console.log("'Alts' gerados com sucesso!");
            const metadataWithImages = yield this.convertImages.all();
            if (!metadataWithImages)
                throw new Error("Metadata não foi criada");
            console.log("Todas as imagens foram convertidas.");
            const htmlChanged = this.sources.all(pages);
            if (!htmlChanged)
                throw new Error("Metadata não foi criada");
            console.log("As 'tags' nas paginas foram alteradas.");
            return true;
        });
    }
}
exports.default = Pixelite;
function execute(src) {
    return __awaiter(this, void 0, void 0, function* () {
        const pixelite = new Pixelite(sharp_1.default, node_fs_1.default, src);
        yield pixelite.execute();
        (0, process_1.exit)(process_1.exitCode);
    });
}
