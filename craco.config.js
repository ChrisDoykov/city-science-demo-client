module.exports = {
  style: {
    postcss: {
      plugins: [
        require("cssnano")({
          preset: "default",
        }),
      ],
    },
  },
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
};
