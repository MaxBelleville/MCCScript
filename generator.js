const fs =require('fs/promises');

async function main () {
    const filename = process.argv[2];
    if (!filename) {
        console.log("No file name present, please provide a .ast file");
        return;
    }
    const astJson = (await fs.readFile(filename)).toString();
    const ast = JSON.parse(astJson);
    const jsCode = generateJSFromAst(ast);
    const outputFile = filename.replace('.ast','.js');
    await fs.writeFile(outputFile, jsCode);
    console.log(`Wrote to ${outputFile}`);
}
function generateJSFromAst(ast) {
    const jsLines = [];
    for(let node of ast) {
        const line =generateJSFromNode(node)
        jsLines.push(line);
    }
    return jsLines.join("\n");
}

function generateJSFromNode(node) {
    if(node.type==="var_assign") {
        const jsExpr = generateJSFromNode(node.value);
        return `var ${node.var_name.value} = ${jsExpr};`;
    }
    else if(node.type==="string") {
        return node.value;
    }
    else if(node.type==="number") {
        return node.value;
    }
    else if(node.type==="id") {
        return node.value;
    }
    else if(node.type==="func_call") {
        const funcName = node.func_name.value;
        const argList = node.params.map(param=>{
            return generateJSFromNode(param);
        }).join(", ");
        return `${funcName}(${argList})`;
    }
    else if(node.type==="built_in_func"){
    }
    else {
        console.log("New node type found")
    }
}

main().catch(err=> console.log(err.stack));