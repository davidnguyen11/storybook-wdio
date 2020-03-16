const path = require('path');
const webpack = require('webpack');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-modules-typescript-loader', // Build the typing for style using less
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localsConvention: 'camelCase', // Allow access css module with camelCase when use the "." to access attribute
          modules: {
            localIdentName: '[local]--[hash:base64:5]',
            // Do not add "mode: local" or "context"
            // Because it affects the "css-modules-require-hook"
            // The storybook and testing environment generates different hashes for class name
          },
        },
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../'),
    path.resolve(__dirname, '../src'),
  ];

  config.resolve.alias = {
    lib: path.resolve(__dirname, '../lib'),
  };

  config.resolve.extensions.push('.ts', '.tsx', '.less');

  config.plugins.push(
    new webpack.DefinePlugin({
      COMPONENT_PATTERN: /^.*\index.tsx$/,
      PROPS_PATTERN: /^.*\.story.([tj]sx)$/,
    })
  );

  return config;
};
