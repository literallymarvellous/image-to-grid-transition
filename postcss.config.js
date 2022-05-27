const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("autoprefixer"),
    purgecss({
      content: ["./**/*.html"],
    }),
    require("postcss-import"),
    require("postcss-url"),
    require("postcss-custom-properties"),
  ],
};
