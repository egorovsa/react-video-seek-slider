module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '.(css|less|sass|scss)$': 'identity-obj-proxy',
    '.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: [
    '@testing-library/react/dont-cleanup-after-each',
    '@testing-library/jest-dom',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
