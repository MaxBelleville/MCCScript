const fs =require('fs/promises');
const JSZip = require('jszip');
const {resolve} = require('path');

class Compiler {
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
        Compiler.namespace[this.currentNS] ={}
        Compiler.title=this.currentNS;
        
        const packText = (await fs.readFile("src/json/packmeta.json")).toString();
        this.packmeta= JSON.parse(packText);

        const funcText = (await fs.readFile("src/json/function.json")).toString();
        this.loadFunc= JSON.parse(funcText);
        this.tickFunc= JSON.parse(funcText);
        const nodes = [];

        //parse through nodes and convert them to be useful
        for(let node of ast) {
            if(node.type=="datapack_def") {
                this.generateDetailsFromDef(node)
            }
            else { 
            const line =this.generateFromNode(node)
            nodes.push(line);
            }
        }
        this.packmeta.pack.pack_format = Compiler.version
        this.packmeta.pack.description = Compiler.description
        for (const [key, value] of Object.entries(Compiler.namespace)) {
            if(Object.keys(value).includes("load")) this.loadFunc.values.push(key+":load")
            if(Object.keys(value).includes("tick")) this.tickFunc.values.push(key+":tick")
        }
        await this.generateFiles(nodes)
    }
    generateDetailsFromDef(node) {
        node.params.map(param=>{
            if(param.type==="directory") {
                if(!Compiler.directoryProvided) {
                    Compiler.directory= param.value.value
                    if(!(Compiler.directory.endsWith("/")||Compiler.directory.endsWith("\\"))) {
                        Compiler.directory+="/"
                    }
                }
                else console.log("Directory already provided, ignoring "+ param.value.value)
                Compiler.directoryProvided= true
            }
            else if(param.type==="namespace") {
                if(!Compiler.namespaceProvided) {
                    Compiler.namespace = {}
                    if(!Compiler.titleProvided) Compiler.title = param.value.value
                }
                Compiler.namespace[param.value.value]={}
                this.currentNS=param.value.value
                Compiler.namespaceProvided=true
            }
            else if(param.type==="title") {
                if(!Compiler.titleProvided) Compiler.title = param.value.value
                else console.log("Title already provided, ignoring "+ param.value.value)
                Compiler.titleProvided=true
            }
            else if(param.type==="description") {
                if(!Compiler.descriptionProvided)Compiler.description= param.value.value
                else console.log("Description already provided, ignoring "+ param.value.value)
                Compiler.descriptionProvided= true
            }
            else {
                if(!Compiler.versionProvided)Compiler.version= param.value.value
                else console.log("Version already provided, ignoring "+ param.value.value)
                Compiler.versionProvided= true
            }
        })
       
    }
    generateFromNode(node) {
        if(node.type==="load") {
            Compiler.namespace[this.currentNS]["load"]="exists"//Todo: handle statements
            
        }
        if(node.type==="tick") {
            Compiler.namespace[this.currentNS]["tick"]="exists"//Todo: handle statements
        }
    }
    async generateFiles(node) {
        //Setup zip file
        this.zip.file("pack.mcmeta",JSON.stringify(this.packmeta))
        const data = this.zip.folder("data")
        const minecraft = data.folder("minecraft")
        const mtags = minecraft.folder("tags")
        const mtfunction = mtags.folder("functions")
        for (const [key, value] of Object.entries(Compiler.namespace)) {
            const ns= data.folder(key)
            const nsFunction = ns.folder("functions")
            for (const [elKey, elVal] of Object.entries(value)) {
                if(elKey==="load") {
                    nsFunction.file("load.mcfunction","say hi")
                }
                if(elKey==="tick") {
                    nsFunction.file("tick.mcfunction","")
                }
            }
        }
        mtfunction.file("load.json",JSON.stringify(this.loadFunc))
        mtfunction.file("tick.json",JSON.stringify(this.tickFunc))

        //Generate zip file
        var content = null;
        if (JSZip.support.uint8array) {
        content = await this.zip.generateAsync({type : "uint8array"});
        } else {
        content = await this.zip.generateAsync({type : "string"});
        }
        await fs.writeFile(Compiler.directory+Compiler.title+".zip",content);
        console.log(`Wrote to ${Compiler.title}.zip`);
    }
    convertPathToNS(filename) {
        const fullPath=resolve(filename);
        const splitPath = fullPath.split("\\");
        return splitPath[splitPath.length-1].replace("mccscript","");
    }
}
module.exports = Compiler;