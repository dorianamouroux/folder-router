var path = require('path');
var fs = require('fs');

function exist (location) {
  try {
    const stat = fs.statSync(location);
    return (stat.isFile() || stat.isDirectory());
  } catch (err) {
    return false;
  }
}

function handleFolder (app, config) {
  const { location: folder } = config;
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const absolutePathFile = path.join(folder, file);
    analyzeFile(app, Object.assign({}, config, { location: absolutePathFile }));
  });
}

function getRoute (fileContent, config) {
  const { root, location: filepath, useFilenameAsRoot } = config;

  if (useFilenameAsRoot) {
    const {name, dir} = path.parse(filepath);
    if (name === 'index') {
      return dir.substr(root.length);
    }
    return path.join(dir, name).substr(root.length);
  }

  if (fileContent.root) {
    return fileContent.root;
  }

  return path
    .dirname(filepath)
    .substr(root.length);
}

function handleFile (app, config) {
  const { location: filepath } = config;
  const fileContent = require(filepath);
  let middlewareRoot = getRoute(fileContent, config);

  app.use(middlewareRoot, require(filepath));
}

function analyzeFile (app, config) {
  const { location } = config;
  const stat = fs.statSync(location);

  if (stat.isFile()) {
    handleFile(app, config);
  } else if (stat.isDirectory()) {
    handleFolder(app, config);
  }
}

function getConfig (config) {
  if (typeof config === 'string') {
    config = { location: config };
  }
  const { location = './routes', useFilenameAsRoot = false } = config;
  const root = path.resolve(location);
  return {
    location: root,
    root,
    useFilenameAsRoot
  };
}

module.exports = (app, options) => {
  const config = getConfig(options);

  if (!exist(config.location)) {
    throw new Error('Cannot find routes folder');
  }
  analyzeFile(app, config);
};
