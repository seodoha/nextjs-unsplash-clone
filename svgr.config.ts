const config = {
  typescript: true,
  outDir: './src/components/icons',
  prettier: false,
  svgProps: {
    color: 'currentColor',
  },
  memo: true,
  replaceAttrValues: {
    '#888888': 'currentColor',
  },
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            removeTitle: false,
            removeDesc: false,
            removeUselessDefs: false,
            removeUselessStrokeAndFill: false,
            removeHiddenElems: false,
          },
        },
      },
    ],
  },
};

export default config;
