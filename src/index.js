const Interpreter = require('./interpreter/interpreter.js');
const parse = require('./parse.js');
const fs =require('fs/promises');

async function main () {
    const filename = process.argv[2];
    if (!filename) {
        console.log("No file name present, please provide a .mccscript file");
        return;
    }
    const code = (await fs.readFile(filename)).toString();
    const ast =await parse(code,filename)
    if(ast) {
      const interpreter = new Interpreter();
      interpreter.build(ast,filename);
    }
}
main().catch(err=> console.log(err.stack));