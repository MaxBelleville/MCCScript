const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs =require('fs/promises');


async function main(){
    const filename = process.argv[2];
    if (!filename) {
        console.log("No file name present, please provide a .mccscript file");
        return;
    }
    const code = (await fs.readFile(filename)).toString();

    // Create a Parser object from our grammar.
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    // Parse something!
    parser.feed(code);
    if(parser.results.length>1){
        console.log("Error: ambiguous grammar ")
    }
    else if(parser.results.length==1){
        const ast = parser.results[0];
        const outputFile = filename.replace('.mccscript','.ast');
        await fs.writeFile(outputFile,JSON.stringify(ast,null," "));
        console.log(`Wrote to ${outputFile}`);
    }
    else {
        console.log("Error: no parse found")
    }

}
main().catch(err=>console.log(err.stack));