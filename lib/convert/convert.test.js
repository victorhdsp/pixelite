"use strict";
/* TEST BY GPT */
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
const sharp_1 = __importDefault(require("sharp"));
const index_1 = require("./index"); // Substitua pelo caminho do seu módulo
jest.mock("fs");
jest.mock("sharp");
describe("convertImages", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa o estado dos mocks antes de cada teste
    });
    it("should convert images to png, webp, and avif", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSharp = sharp_1.default;
        const mockPng = jest.fn().mockReturnThis();
        const mockWebp = jest.fn().mockReturnThis();
        const mockAvif = jest.fn().mockReturnThis();
        const mockToFile = jest.fn();
        // Mock das funções de sharp
        mockSharp.mockReturnValue({
            png: mockPng.mockReturnValue({ toFile: mockToFile }),
            webp: mockWebp.mockReturnValue({ toFile: mockToFile }),
            avif: mockAvif.mockReturnValue({ toFile: mockToFile })
        });
        const files = ["image1.jpg", "image2.png"];
        yield (0, index_1.convertImages)(files);
        expect(mockPng).toHaveBeenCalled();
        expect(mockWebp).toHaveBeenCalled();
        expect(mockAvif).toHaveBeenCalled();
        expect(mockToFile).toHaveBeenCalledTimes(6); // 3 formatos para cada imagem
    }));
    it("should log each image conversion", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log = jest.fn(); // Mock da função console.log
        const files = ["image1.jpg"];
        yield (0, index_1.convertImages)(files);
        expect(console.log).toHaveBeenCalledWith("Convertendo imagem: ", "image1.jpg");
    }));
});
