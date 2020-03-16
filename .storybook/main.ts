module.exports = {
  stories: ['../src/**/*.story.(tsx|jsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
};
