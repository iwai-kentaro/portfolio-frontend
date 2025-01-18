require('dotenv').config();

module.exports = {
  saposhifu: {
    input: {
      target: process.env.SWAGGER_PATH,
      filters: {
        tags: [/Portfolio/],
      },
    },
    output: {
      target: './src/auto-generate/api',
      client: 'axios',
      clean: true,
      override: {
        mutator: {
          path: './src/api/customAxiosInstance.ts',
          name: 'customInstance',
        },
      },
      mode: 'tags',
      schemas: './src/auto-generate/schemas',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};
