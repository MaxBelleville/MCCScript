const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs =require('fs/promises');

const parse = async (code)=>{

    // Create a Parser object from our grammar.
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    // Parse something!
    parser.feed(code);
    if(parser.results.length>1){
        console.log("Error: ambiguous grammar ")
    }
    else if(parser.results.length==1){
        const ast = parser.results[0];
        const outputFile = 'debug.ast'
        await fs.writeFile(outputFile,JSON.stringify(ast,null," "));
        console.log(`Wrote to ${outputFile}`);
        return ast;
    }
    else {
        console.log("Error: no parse found")
    }
}
module.exports = parse;