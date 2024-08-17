"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testMatch: ['**/*.test.(ts|tsx|js)'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
