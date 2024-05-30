const fs =require('fs/promises');
const JSZip = require('jszip');
const {resolve} = require('path');

class Interpreter {
    static directory ="./"
    static namespace={}
    static version=41
    static title="MCCScript"
    static description="Generated using mccscripts for version 41"
    static namespaceProvided=false
    static titleProvided=false
    static directoryProvided=false
    static versionProvided=false
    static descriptionProvided=false
    static currentFile=""

    constructor(){
        this.zip = new JSZip();
    }
    async build(ast,filename){
        this.currentNS=this.convertPathToNS(filename)
        this.fileNS=this.currentNS;
        Interpreter.namespace[this.currentNS] ={}
        Interpreter.title=this.currentNS;
        
        const packText = (await fs.readFile("src/json/packmeta.json")).toString();
        this.packmeta= JSON.parse(packText);

        const funcText = (await fs.readFile("src/json/function.json")).toString();
        this.loadFunc= JSON.parse(funcText);
        this.tickFunc= JSON.parse(funcText);
        const nodes = this.generateFromAst(ast)

        this.packmeta.pack.pack_format = Interpreter.version
        this.packmeta.pack.description = Interpreter.description
        for (const [key, value] of Object.entries(Interpreter.namespace)) {
            if(Object.keys(value).includes("load")) this.loadFunc.values.push(key+":load")
            if(Object.keys(value).includes("tick")) this.tickFunc.values.push(key+":tick")
        }
        await this.generateFiles(nodes)
    }
    generateFromAst(ast){
        //parse through nodes and convert them to be useful
        const nodes = [];
        for(let node of ast) {
            if(node.type==="datapack_def") {
                this.generateDetailsFromDef(node)
            }
            else if(node.type==="import_mcc") {
                this.generateFromImport(node);
            }
            else { 
            const line =this.generateFromNode(node)
            nodes.push(line);
            }
        }
         return nodes;
    }
    generateFromImport(node) {
        const ns = this.convertPathToNS(node.value.value)
        const prevNS = this.currentNS
        const prevFileNS = this.fileNS
        const prevNSProvided = this.namespaceProvided
        if(node.namespace) {
            if(!Interpreter.namespaceProvided) Interpreter.namespace = {}
            Interpreter.namespace[node.namespace.value]={}
            this.currentNS=node.namespace.value;
            this.namespaceProvided=true
        }
        this.fileNS=ns;
        const nodes =this.generateFromAst(node.body);
        this.currentNS = prevNS;
        this.fileNS = prevFileNS;
        this.namespaceProvided = prevNSProvided;
        return nodes;
    }

    generateDetailsFromDef(node) {
        node.params.map(param=>{
            if(param.type==="directory") {
                if(!Interpreter.directoryProvided) {
                    Interpreter.directory= param.value.value
                    if(!(Interpreter.directory.endsWith("/")||Interpreter.directory.endsWith("\\"))) {
                        Interpreter.directory+="/"
                    }
                }
                else console.log("Directory already provided, ignoring "+ param.value.value)
                Interpreter.directoryProvided= true
            }
            else if(param.type==="namespace") {
                if(!Interpreter.namespaceProvided) {
                    Interpreter.namespace = {}
                    if(!Interpreter.titleProvided) Interpreter.title = param.value.value
                    Interpreter.titleProvided=true
                }
                Interpreter.namespace[param.value.value]={}
                this.currentNS=param.value.value
                Interpreter.namespaceProvided=true
            }
            else if(param.type==="title") {
                Interpreter.title = param.value.value
                Interpreter.titleProvided=true
            }
            else if(param.type==="description") {
                if(!Interpreter.descriptionProvided)Interpreter.description= param.value.value
                else console.log("Description already provided, ignoring "+ param.value.value)
                Interpreter.descriptionProvided= true
            }
            else {
                if(!Interpreter.versionProvided)Interpreter.version= param.value.value
                else console.log("Version already provided, ignoring "+ param.value.value)
                Interpreter.versionProvided= true
            }
        })
       
    }
    generateFromNode(node) {
        if(node.type==="load") {
            if(!Interpreter.namespace[this.currentNS]["load"]){
            Interpreter.namespace[this.currentNS]["load"]="exists"//Todo: handle statements
            }
            else console.log("Warning: two or more load functions found in "+this.currentNS)
        }
        else if(node.type==="tick") {
            if(!Interpreter.namespace[this.currentNS]["tick"]) {
            Interpreter.namespace[this.currentNS]["tick"]="exists"//Todo: handle statements
            }
            else console.log("Warning: two or more tick functions found in "+this.currentNS)
        }
        else if(node.type==="func_def"){
            const func_name = node.func_name.value
            if(!Interpreter.namespace[this.currentNS][func_name]) {
                Interpreter.namespace[this.currentNS][func_name]="exists"//Todo: handle statements
            }
            else console.log("Warning: two or more functions with same name found in "+this.currentNS)
        }
        else {
            //Anything here should be added to Interpreter.namespace[this.currentNS][this.fileNS]
            if(!Interpreter.namespace[this.currentNS][this.fileNS]) {
                Interpreter.namespace[this.currentNS][this.fileNS]=""//TEMP CODE
            }
        }
    }
    async generateFiles(node) {
        //Setup zip file
        this.zip.file("pack.mcmeta",JSON.stringify(this.packmeta))
        const data = this.zip.folder("data")
        const minecraft = data.folder("minecraft")
        const mtags = minecraft.folder("tags")
        const mtfunction = mtags.folder("functions")
        mtfunction.file("load.json",JSON.stringify(this.loadFunc))
        mtfunction.file("tick.json",JSON.stringify(this.tickFunc))
        for (const [key, value] of Object.entries(Interpreter.namespace)) {
            const ns= data.folder(key)
            const nsFunction = ns.folder("functions")
            for (const [elKey, elVal] of Object.entries(value)) 
                nsFunction.file(elKey+".mcfunction","")
        }



        //Generate zip file
        var content = null;
        if (JSZip.support.uint8array) {
        content = await this.zip.generateAsync({type : "uint8array"});
        } else {
        content = await this.zip.generateAsync({type : "string"});
        }
        await fs.writeFile(Interpreter.directory+Interpreter.title+".zip",content);
        console.log(`Wrote to ${Interpreter.title}.zip`);
    }
    convertPathToNS(filename) {
        const fullPath=resolve(filename);
        const splitPath = fullPath.split("\\");
        return splitPath[splitPath.length-1].replace(".mccscript","");
    }
}
module.exports = Interpreter;