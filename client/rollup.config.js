import jsx from "acorn-jsx";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "rollup-plugin-replace";
import sucrase from "@rollup/plugin-sucrase";
import postcss from "rollup-plugin-postcss";
// import json from "@rollup/plugin-json";

export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: "dist",
      format: "iife",
    },
  ],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      extract: true,
      modules: true,
    }),
    // Bundle imports from node_modules
    resolve(),
    // Transforms CommonJS -> ES6
    // Most node_modules are in cjs, but plugins require es6
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    sucrase({
      transforms: ["typescript", "jsx"],
    }),
  ],
};
