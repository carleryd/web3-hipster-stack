import jsx from "acorn-jsx";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "rollup-plugin-replace";

export default {
  input: "./src/test.jsx",
  output: [
    {
      dir: "dist",
      format: "iife",
    },
  ],
  // Necessary for passing JSX through `typescript` plugin
  // acornInjectPlugins: [jsx()],
  plugins: [
    // Bundle imports from node_modules
    resolve(),
    // Transforms CommonJS -> ES6
    // Most node_modules are in cjs, but plugins require es6
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/env", "@babel/preset-react"],
    }),
    // Converts TypeScript to JavaScript
    // typescript({ tsconfig: false }),
  ],
};
