export default {
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./setup-tests.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
    '@configs/(.*)': ['<rootDir>/src/configs/$1'],
    '@modules/(.*)': ['<rootDir>/src/modules/$1'],
    '@user/(.*)': ['<rootDir>/src/modules/user/$1'],
    '@utils/(.*)': ['<rootDir>/src/shared/utils/$1'],
    '@infra/(.*)': ['<rootDir>/src/shared/infra/$1'],
    '@http/(.*)': ['<rootDir>/src/shared/infra/http/$1'],
    '@database/(.*)': ['<rootDir>/src/shared/infra/database/$1'],
  },
};
