// export {};

// module.exports = {
//   testEnvironment: 'node',
//   testMatch: ['tests/game.test.ts'],
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//   },
//   moduleFileExtensions: ['ts', 'js'],
//   coverageDirectory: 'coverage',
//   collectCoverageFrom: ['src/**/*.ts'],
// };
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}

export default config