const nearley = require("nearley");
const grammar = require("./grammar/grammar.js");
const fs =require('fs/promises');
const {resolve} = require('path');
const Embeds = require('mccembeds');

const importList=[];
const collectAst=async (code,prevFile)=>{
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    // Parse something!
    parser.feed(code);
    if(parser.results.length>0){
        if(parser.results.length>1)console.log("Error: ambiguous grammar ")
        //Do anyways
        var ast = parser.results[0];
        for (const nodes of ast){
            if(nodes.type === "import_mcc") {
                var importStr= nodes.value.value
                if(importStr.startsWith("@")){
                    const tmpStr= importStr.replace("@","")
                    await Embeds.readEmbeddedFolder(tmpStr);
                }
                else {
                //Recursively searches through imports to find other imports
                //Ensure it 
                if(!importStr.endsWith(".mccscript"))importStr+=".mccscript"
                const importCode = (await fs.readFile(importStr)).toString();

                const fullPath = resolve(importStr);
                if(!importList.includes(fullPath)) {
                    importList.push(fullPath)
                    nodes.body=await collectAst(importCode,importStr);
                }
                else {
                    console.log("Warning duplicate import: "+ importStr + " in " + prevFile);
                }
  
                }
            }
        }
        return ast;
    }
    else {
        console.log("Error: no parse found")
    }
    return;
}

const parse = async (code,filename)=>{
    importList.push(resolve(filename));
    var ast=await collectAst(code,filename)
    if(ast) {
        const outputFile = './src/debug/debug.ast'
        await fs.writeFile(outputFile,JSON.stringify(ast,null," "));
        console.log(`Wrote to ${outputFile}`);
        return ast;
    }
}
module.exports = parse;