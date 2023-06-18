import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testPathIgnorePatterns: ["/node_modules", "/build"],
  preset: 'ts-jest'
}

export default config;