var rimraf = require("rimraf"),
  path = require("path");

rimraf.sync(path.resolve(__dirname, "../dist/*"));
console.log(" 💥 Cleaned build artifacts.\n");
