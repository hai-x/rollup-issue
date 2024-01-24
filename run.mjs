import { rollup } from "rollup";
import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { deleteAsync } from "del";
deleteAsync(["dist/*"]);

// see below for details on these options
// const inputOptions = {...};

// you can create multiple outputs from the same input to generate e.g.
// different formats like CommonJS and ESM
// const outputOptionsList = [{...}, {...}];
const entry = path.resolve("./src/main.js");

const outputOptionsList = [
  {
    dir: "dist/rollup",
    // preserveModules: true,
    format: "esm",
    manualChunks(id, { getModuleInfo }) {
      if (id.includes("common")) return "common";
    },
    generatedCode: {
      preset: "es5",
      arrowFunctions: false,
    },
  },
];

async function build() {
  try {
    await generateOutputs(
      await rollup({
        input: {
          entry,
        },
        plugins: [nodeResolve(), commonjs()],
      })
    );
  } catch (error) {
    console.log(error);
  }
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    await bundle.write(outputOptions);
  }
  return bundle;
}

build();
