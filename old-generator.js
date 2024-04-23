const fs =require('fs/promises');

const generator = async (ast) =>{
    const jsCode = generateJSFromAst(ast);
    const outputFile = 'debug.js'
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
    else if(node.type==="lambda_func") {
        const paramList = node.params.map(param=>param.value).join(", ");
        const jsBody = node.body.map(line=>{
            return generateJSFromNode(line);
        }).join(";\n\t");
        return `function (${paramList}) {\n\t${jsBody}\n}`
    }
    else if(node.type==="func_def") {
        const paramList = node.params.map(param=>param.value).join(", ");
        const jsBody = node.body.map(line=>{
            return generateJSFromNode(line);
        }).join(";\n\t");
        return `function ${node.func_name.value}(${paramList}) {\n\t${jsBody}\n}`
    }
    else if(node.type!=="comment") {
        console.log("New node type found")
    }
    return "";
}
module.exports = generator;