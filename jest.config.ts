import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/tests/']
};

export default config;
