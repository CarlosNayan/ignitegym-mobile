module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: "./src",
          alias: {
            "@dtos": "./src/dtos",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@storage": "./src/storage",
            "@contexts": "./src/contexts",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
