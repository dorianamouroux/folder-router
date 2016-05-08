var path = require('path');
var fs = require('fs');

function exist(location) {
    try {
        var stat = fs.statSync(location);
        return (stat.isFile() || stat.isDirectory());
    } catch (err) {
        return (false);
    }
}

function handleFolder(app, root, folder) {
    var files = fs.readdirSync(folder);

    files.forEach(function(file) {
        var absolutePathFile = path.join(folder, file);
        analyzeFile(app, root, absolutePathFile);
    });
}

function handleFile(app, root, filepath) {
    var fileContent = require(filepath);
    var middlewareRoot = '';

    if (fileContent.root) {
        middlewareRoot = fileContent.root;
    } else {
        var location = path.dirname(filepath);
        middlewareRoot = location.substr(root.length);
    }
    app.use(middlewareRoot, require(filepath));
}

function analyzeFile(app, root, location) {
    var stat = fs.statSync(location);

    if (stat.isFile())
        handleFile(app, root, location);
    else if (stat.isDirectory())
        handleFolder(app, root, location);
}

module.exports = function(app, location) {
    location = location || './routes';
    location = path.resolve(location);

    if (!exist(location)) {
        throw new Error('Cannot find routes folder');
    }
    analyzeFile(app, location, location);
}
