const fs = require("fs"),
  path = require("path"),
  root = path.resolve(__dirname, "../../.."),
  resolvePath = (file) => path.resolve(root, file),
  { blue } = require("chalk");

const writeJson = function (file, json) {
  return fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n", "utf-8");
};

function updateDependency(dependencies, name, version) {
  if (dependencies?.[name]) {
    const currentSpecifier = dependencies[name];
    dependencies[name] = currentSpecifier.startsWith("workspace:") ? "workspace:^" : "^" + version;
    return true;
  }

  return false;
}

module.exports.syncAppExt = function (both = true) {
  // make sure this project has an app-extension project
  const appExtDir = resolvePath("packages/app-extension");
  if (!fs.existsSync(appExtDir)) {
    return;
  }

  // make sure this project has an ui project
  const uiDir = resolvePath("packages/ui");
  if (!fs.existsSync(uiDir)) {
    return;
  }

  // get version and name from ui package.json
  const { name, version } = require(resolvePath("packages/ui/package.json"));

  // read app-ext package.json
  const appExtFile = resolvePath("packages/app-extension/package.json");
  const appExtJson = require(appExtFile);
  let finished = false;

  // sync version numbers
  if (both === true) {
    appExtJson.version = version;
  }

  // check dependencies
  finished =
    updateDependency(appExtJson.dependencies, name, version) ||
    updateDependency(appExtJson.devDependencies, name, version);

  if (finished === true) {
    writeJson(appExtFile, appExtJson);
    console.log(` ⭐️ App Extension version ${blue(appExtJson.name)} synced with UI version.\n`);
    return;
  }

  console.error("   App Extension version and dependency NOT synced.\n");
};
