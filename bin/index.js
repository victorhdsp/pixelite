#!/usr/bin/env node
const root = process.cwd();
const path = require("path");

const args = process.argv.splice(process.execArgv.length + 2);
const props = {
  replace: false,
  src: "./public",
};

args.forEach((arg) => {
  if (arg.includes("--") && arg.includes("=")) {
    const [key, value] = arg.replace("--", "").split("=");
    props[key] = value;
  }
});

if (props.src) props.src = path.join(root, props.src);

const converter = require("../lib/index.js");
converter.execute(props.src, {
  replace: props.replace,
});
