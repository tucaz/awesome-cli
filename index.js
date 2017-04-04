#!/usr/bin/env node
'use strict';

const program = require('commander'),
    snapperCommand = require('./snapper/index.js'),
    pkg = require('./package.json');

program
    .version(pkg.version)
    .command('snapper <name>')
    .description('Scaffolds a new Awesome snapper with all it\'s dependencies')
    .option('-p, --package [package]', 'Package/namespace')
    .option('-l, --location [location]', 'Location where files will be generated')
    .action((name, options) => {
        let loc = options.location || "./" + name;
        snapperCommand.scaffold(name, options.package, loc, (err, result) => {
            if(err) {
                console.log(`Error while scaffolding ${name}Snapper`);
                console.log(err);
                return;
            }
            console.log(`${name}Snapper generated`);
        });
    });

program.parse(process.argv);