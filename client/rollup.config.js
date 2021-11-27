// import jsx from "acorn-jsx";
// import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import babel from "@rollup/plugin-babel";
import replace from "rollup-plugin-replace";
import sucrase from "@rollup/plugin-sucrase";
import postcss from "rollup-plugin-postcss";
// import json from "@rollup/plugin-json";
import path from "path";
import tailwindcss from "tailwindcss";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";

export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: "dist",
      format: "iife",
    },
  ],
  plugins: [
    // Bundle imports from node_modules
    resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    // Transforms CommonJS -> ES6
    // Most node_modules are in cjs, but plugins require es6
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    postcss({
      config: false,
      plugins: [
        postcssImport,
        tailwindcss({ config: "tailwind.config.js" }),
        autoprefixer,
      ],
      extensions: [".css"],
      extract: path.resolve("dist/styles.css"),
    }),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript", "jsx"],
    }),
  ],
};
