module.exports = new (function () {
    const path = require('path'),
        fs = require('fs'),
        snapperTemplate = path.join(__dirname, 'Snapper.txt'),
        productTemplate = path.join(__dirname, './Product.txt'),
        modelTemplate = path.join(__dirname, './Model.txt'),
        geometryTemplate = path.join(__dirname, './Geometry.txt'),
        configuratorTemplate = path.join(__dirname, './Configurator.txt'),
        packageTemplate = path.join(__dirname, './Package.txt');

    this.scaffold = (name, package, location, callback) => {
        package = package || 'custom';
        location = location || path.dirname(require.main.filename);

        createOrReplaceDirectory(location, err => {
            fs.readFile(snapperTemplate, 'utf-8', (err, snapperContent) => {
                if (err) return callback(err);
                fs.readFile(productTemplate, 'utf-8', (err, productContent) => {
                    if (err) return callback(err);
                    fs.readFile(modelTemplate, 'utf-8', (err, modelContent) => {
                        if (err) return callback(err);
                        fs.readFile(geometryTemplate, 'utf-8', (err, geometryContent) => {
                            if (err) return callback(err);
                            fs.readFile(configuratorTemplate, 'utf-8', (err, configuratorContent) => {
                                if (err) return callback(err);
                                fs.readFile(packageTemplate, 'utf-8', (err, packageContent) => {
                                    if (err) return callback(err);

                                    snapperContent = snapperContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                    productContent = productContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                    modelContent = modelContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                    geometryContent = geometryContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                    configuratorContent = configuratorContent.replace(/##name##/g, name).replace(/##package##/g, package);
                                    packageContent = packageContent.replace(/##name##/g, name).replace(/##package##/g, package);

                                    let snapperFile = `${name}Snapper.cm`,
                                        productFile = `${name}Product.cm`,
                                        modelFile = `${name}Model.cm`,
                                        geometryFile = `${name}Geometry.cm`,
                                        configuratorFile = `${name}Configurator.cm`,
                                        packageFile = `package.cm`;

                                    saveFile(path.join(location, snapperFile), snapperContent, (err) => {
                                        if (err) return callback(err);
                                        saveFile(path.join(location, productFile), productContent, (err) => {
                                            if (err) return callback(err);
                                            saveFile(path.join(location, modelFile), modelContent, (err) => {
                                                if (err) return callback(err);
                                                saveFile(path.join(location, geometryFile), geometryContent, (err) => {
                                                    if (err) return callback(err);
                                                    saveFile(path.join(location, configuratorFile), configuratorContent, (err) => {
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
            });
        });
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