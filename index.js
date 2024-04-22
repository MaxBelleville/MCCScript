const generator = require('./generator.js');
const parse = require('./parse.js');
const fs =require('fs/promises');

async function main () {
    const filename = process.argv[2];
    if (!filename) {
        console.log("No file name present, please provide a .mccscript file");
        return;
    }
    const code = (await fs.readFile(filename)).toString();
    const ast =await parse(code)
    if(ast) await generator(ast);
}
main().catch(err=> console.log(err.stack));