const fs =require('fs/promises');
const {resolve} = require('path');
exports.convertPathToNS = function (filename) {
    const fullPath=resolve(filename);
    const splitPath = fullPath.split("\\");
    return splitPath[splitPath.length-1].replace(".mccscript","");
}
exports.readFileJson = async function (filename) {
    return JSON.parse((await fs.readFile(filename)).toString());
}
exports.readFileStr = async function (filename) {
    return (await fs.readFile(filename)).toString();
}