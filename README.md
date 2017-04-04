# Introduction

Awesome CLI is a command line utility to interact and scaffold [Awesome](https://github.com/Allsteel/awesome) objects for Configura.

# Installation

Simply run `npm install awesome-cli` and you are set.

# Usage

Awesome CLI offers the following operations:

* Snapper generation

## Snapper Generation

`awe snapper SnapperName --location \CetDev\version7.5\custom\extension`

### Arguments

Argument Name | Optional | Description
------------ | ------------- | ------------
SnapperName | No | Name of the snapper that will have all the boilerplate classes generated
location | Yes | Specify the location where snapper classes are going to be generated. If not specified the folder where the command is being ran will be used

### Examples

`awe snapper StridePanelFrame`

Will generate a set of classes for StridePanelFrame at the current directory

`awe snapper StridePanelFrame --location \CetDev\version7.5\custom\panels\products\stride\PanelFrame`

Will generate a set of classes for StridePanelFrame at `\CetDev\version7.5\custom\panels\products\stride\PanelFrame` with `custom.panels.stride.PanelFrame` as the package name.
