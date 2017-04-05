module.exports = new (function () {
    const path = require('path'),
        fs = require('fs'),
        snapperTemplate = path.join(__dirname, 'Snapper.txt'),
        productTemplate = path.join(__dirname, './Product.txt'),
        geometryTemplate = path.join(__dirname, './Geometry.txt'),
        modelTemplate = path.join(__dirname, './Model.txt'),
        packageTemplate = path.join(__dirname, './Package.txt');

    this.scaffold = (name, package, location, callback) => {
        location = location || path.dirname(require.main.filename);
        package = package || extractPackage(location);

        createOrReplaceDirectory(location, err => {
            fs.readFile(snapperTemplate, 'utf-8', (err, snapperContent) => {
                if (err) return callback(err);
                fs.readFile(productTemplate, 'utf-8', (err, productContent) => {
                    if (err) return callback(err);
                    fs.readFile(geometryTemplate, 'utf-8', (err, geometryContent) => {
                        if (err) return callback(err);
                        fs.readFile(modelTemplate, 'utf-8', (err, modelContent) => {
                            if (err) return callback(err);
                            fs.readFile(packageTemplate, 'utf-8', (err, packageContent) => {
                                if (err) return callback(err);

                                snapperContent = snapperContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                productContent = productContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                geometryContent = geometryContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                modelContent = modelContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                packageContent = packageContent.replace(/##name##/g, name).replace(/##package##/g, package);

                                let snapperFile = `${name}Snapper.cm`,
                                    productFile = `${name}Product.cm`,
                                    geometryFile = `${name}Geometry.cm`,
                                    modelFile = `${name}Model.cm`,
                                    packageFile = `package.cm`;

                                saveFile(path.join(location, snapperFile), snapperContent, (err) => {
                                    if (err) return callback(err);
                                    saveFile(path.join(location, productFile), productContent, (err) => {
                                        if (err) return callback(err);
                                        saveFile(path.join(location, geometryFile), geometryContent, (err) => {
                                            if (err) return callback(err);
                                            saveFile(path.join(location, modelFile), modelContent, (err) => {
                                                if (err) return callback(err);
                                                saveFile(path.join(location, packageFile), packageContent, (err) => {
                                                    if (err) return callback(err);
                                                    callback(null);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    function extractPackage(location) {
        const fullLoc = path.resolve(location);
        if(fullLoc.indexOf('custom') === -1) return 'custom';

        let folders = fullLoc.split('custom');
        var package = 'custom' + folders[1].replace(/\//g, '.').replace(/\\/g, '.'),
            segments = package.split('.');

        package = package.replace(segments[segments.length - 1], firstToLowerCase(segments[segments.length - 1]));

        return package;
    }

    function firstToLowerCase(s) {
        return s[0].toLowerCase() + s.substring(1, s.length);
    }

    function createOrReplaceDirectory(dirName, callback) {
        fs.exists(dirName, (err, exists) => {
            if (err) return callback(err);

            if (exists) {
                callback(null);
            } else {
                fs.mkdir(dirName, (err) => {
                    if (err) return callback(err);

                    callback(null);
                });
            }
        });
    }

    function saveFile(file, content, callback) {
        fs.writeFile(file, content, 'utf-8', (err) => {
            if (err) return callback(err);

            callback(null);
        });
    }
})()