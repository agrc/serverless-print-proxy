import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 80000,
    retry: 10,
    env: {
      OPEN_QUAD_WORD: 'secret-test-quad-word',
      FIRESTORE_EMULATOR_HOST: '127.0.0.1:8081',
    },
  },
});
