export default {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    globals: {
        'NODE_ENV': 'test',
    },
    moduleFileExtensions: ['js', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Ajuste o caminho conforme a estrutura do seu projeto
    },
};
