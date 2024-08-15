/* TEST BY GPT */

import sharp from "sharp";
import { convertImages } from "./index"; // Substitua pelo caminho do seu módulo

jest.mock("fs");
jest.mock("sharp");

describe("convertImages", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa o estado dos mocks antes de cada teste
  });

  it("should convert images to png, webp, and avif", async () => {
    const mockSharp = sharp as unknown as jest.Mock;

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

    await convertImages(files);
    
    expect(mockPng).toHaveBeenCalled();
    expect(mockWebp).toHaveBeenCalled();
    expect(mockAvif).toHaveBeenCalled();

    expect(mockToFile).toHaveBeenCalledTimes(6); // 3 formatos para cada imagem
  });

  it("should log each image conversion", async () => {
    console.log = jest.fn(); // Mock da função console.log

    const files = ["image1.jpg"];
    
    await convertImages(files);

    expect(console.log).toHaveBeenCalledWith("Convertendo imagem: ", "image1.jpg");
  });
});
