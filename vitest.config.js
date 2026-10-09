const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  // Automatic JSX runtime so components don't need `import React`
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    globals: true,
    // Default for utils + API tests. React tests opt in to jsdom with a
    // `// @vitest-environment jsdom` comment at the top of the test file.
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['utils/**/*.js', 'app.js', 'src/**/*.jsx'],
      exclude: ['**/*.test.{js,jsx}', 'server.js', 'vitest.*.js'],
    },
  },
});
