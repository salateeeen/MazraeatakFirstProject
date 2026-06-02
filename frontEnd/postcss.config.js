import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      importFrom: "src/styles/breakpoints.css",
      features: {
        "custom-media-queries": true,
      },
    }),
  ],
};