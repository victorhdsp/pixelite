"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sharp = jest.fn().mockImplementation(() => ({
    png: jest.fn().mockImplementation(() => ({ toFile: jest.fn() })),
    webp: jest.fn().mockImplementation(() => ({ toFile: jest.fn() })),
    avif: jest.fn().mockImplementation(() => ({ toFile: jest.fn() })),
}));
exports.default = Sharp;
