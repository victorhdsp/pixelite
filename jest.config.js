module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ['ts', 'tsx', "js"],
    testMatch: ['**/lib/*.test.(ts|tsx)'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    }
};
