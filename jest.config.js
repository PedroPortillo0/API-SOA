module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/Teste/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };

  