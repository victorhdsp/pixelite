#!/usr/bin/env node
const root = process.cwd();
const path = require("path");
import converter from "../lib/index";

const args = process.argv.splice(process.execArgv.length + 2);

const props = {
  replace: false,
  src: "./public",
};

args.forEach((arg) => {
  if (arg.includes("--") && arg.includes("=")) {
    const [key, value] = arg.replace("--", "").split("=");
    if (key === 'replace') {
      props.replace = value === 'true';
    } else if (key === 'src') {
      props.src = value;
    }
  }
});

if (props.src) props.src = path.join(root, props.src);

converter.execute(props.src);
