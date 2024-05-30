const fs =require('fs/promises');
const JSZip = require('jszip');
const {convertPathToNS,readFileJson,readFileStr} = require('./utils.js');
const Embeds = require('mccembeds');

class Interpreter {
    //Assign general static variables for the datapack
    //This might important when we have multiple .js files reading this info.
    static dir ="./"
    static nsdata={}
    static vers=41
    static title="MCCScript"
    static desc="Generated using mccscripts for vers 41"
     //This is kinda a ugly solution to check if user provided values.
    static nsProvided=false
    static titleProvided=0 //0 is default, 1 is provided by ns, 2 is provided by title
    static dirProvided=false
    static versProvided=false
    static descProvided=false
    static currentFile=""

    constructor(){
        this.zip = new JSZip();
   
    }
    async build(ast,filename){
        //Get namespace from filename set to current namespace and file namespace.
        this.currentNS=convertPathToNS(filename)
        this.fileNS=this.currentNS;

        //Setup datapack title, setup & namespace data using filename.
        Interpreter.nsdata[this.currentNS] ={}
        Interpreter.title=this.currentNS;
        
        //Setup packmeta and tick and load functions from json.
        this.packmeta = await readFileJson("src/json/packmeta.json")
        const funcText = await readFileStr("src/json/function.json")
        this.loadFunc= JSON.parse(funcText);
        this.tickFunc= JSON.parse(funcText);

        //Converts ast tree into datapack code
        this.parseAST(ast)

        //Sets packmeta data, loops through each namespace adding tick/load functions were needed.
        this.packmeta.pack.pack_format = Interpreter.vers
        this.packmeta.pack.description = Interpreter.desc
        for (const [key, value] of Object.entries(Interpreter.nsdata)) {
            if(Object.keys(value).includes("load")) this.loadFunc.values.push(key+":load")
            if(Object.keys(value).includes("tick")) this.tickFunc.values.push(key+":tick")
        }
        //Generates the datapack zip file using the datpack code.
        await this.generateFiles()
    }
    parseAST(ast){
        //parse through nodes and convert them to be useful
        //It splits it into multiple sections, depending on node type.

        const nodes = [];
        for(let node of ast) {
            if(node.type==="datapack_def") this.getDetailsFromDef(node)
            else if(node.type==="import_mcc") this.parseImport(node);
            //These next sections handle filling out the namespace data that is used
            //to create the .mcfunction files for the current namespace 
            else if(node.type==="load") {
                if(!Interpreter.nsdata[this.currentNS]["load"]){
                Interpreter.nsdata[this.currentNS]["load"]=this.parseNode(node.body);//Todo: handle statements
                }
                else console.log("Warning: two or more load functions found in "+this.currentNS)
            }
            else if(node.type==="tick") {
                if(!Interpreter.nsdata[this.currentNS]["tick"]) {
                Interpreter.nsdata[this.currentNS]["tick"]=this.parseNode(node.body);//Todo: handle statements
                }
                else console.log("Warning: two or more tick functions found in "+this.currentNS)
            }
            else if(node.type==="func_def"){
                const func_name = node.func_name.value
                if(!Interpreter.nsdata[this.currentNS][func_name]) {
                    Interpreter.nsdata[this.currentNS][func_name]=this.parseNode(node.body);//Todo: handle statements
                }
                else console.log("Warning: two or more functions with same name found in "+this.currentNS)
            }
            // else {
            //     //When you have any code outside of a function, tick or load, it will use filename.
            //     //Might want some datapack parameter to change this ex: filename
            //     //Also might have to rework as we don't want it creating files 
            //     //when you just have internal code outside functions.
            //     if(!Interpreter.nsdata[this.currentNS][this.fileNS]) {
            //         Interpreter.nsdata[this.currentNS][this.fileNS]="blank"//TEMP CODE
            //     }
            // }
        }
    }

    parseImport(node) {
        //Converts import file to ns, store previous namespace data.
        const ns = convertPathToNS(node.value.value)
        const prevNS = this.currentNS
        const prevFileNS = this.fileNS
        const prevNSProvided = this.nsProvided
        this.fileNS=ns;
        //If import includes namespace setup namespace for the imported file.
        if(node.namespace) {
            if(!Interpreter.nsProvided) Interpreter.nsdata = {}
            Interpreter.nsdata[node.namespace.value]={}
            this.currentNS=node.namespace.value;
            this.nsProvided=true
        }
        //Parse ast nodes for that imported file then restore ns data.
        const nodes =this.parseAST(node.body);
        this.currentNS = prevNS;
        this.fileNS = prevFileNS;
        this.nsProvided = prevNSProvided;
        return nodes;
    }

    parseNode(node) {
        var output = ""
        //Should do two things, return the variables in a list and return the mc output.
        for(let subnode of node) {
            //TODO: abstract into a file
            if(subnode.type==="score_def") {
                const criteria = (subnode.criteria)?subnode.criteria.value:"dummy";
                output += "scoreboard objectives add "+subnode.id.value +" "+ criteria;
            }
            else if(subnode.type==="entity_assign") {
                
            }
            else if(subnode.type==="var_assign") {

            }
            output+="\r\n";
        }

        return  Buffer.from(output, 'utf8');
    }

    getDetailsFromDef(node) {
        //Loops through the params of a @datapack node and assigns the datapack values accordingly
        //Will typically only store the first instance and ignore duplicates of a parameter.
        node.params.map(param=>{
            if(param.type==="directory") {
                if(!Interpreter.dirProvided) {
                    //Sets the datapack directory if found in ast, adds "/" if not found
                    Interpreter.dir= param.value.value
                    if(!(Interpreter.dir.endsWith("/")||Interpreter.dir.endsWith("\\"))) {
                        Interpreter.dir+="/"
                    }
                }
                else console.log("Directory already provided, ignoring "+ param.value.value)
                Interpreter.dirProvided= true
            }
            else if(param.type==="namespace") {
                if(!Interpreter.nsProvided) {
                    //When the first namespace is found in ast, clear namespace data.
                    //Then set the datapack title to be that namespace.
                    Interpreter.nsdata = {}
                    if(Interpreter.titleProvided==0) Interpreter.title = param.value.value
                    if(Interpreter.titleProvided!=2) Interpreter.titleProvided=1
                }
                //Add new namespace to namespace data and set as current namespace.

                Interpreter.nsdata[param.value.value]={}
                this.currentNS=param.value.value
                Interpreter.nsProvided=true
            }
            else if(param.type==="title") {

                if(Interpreter.titleProvided!=2)Interpreter.title = param.value.value
                else console.log("Title already provided, ignoring "+ param.value.value)
                Interpreter.titleProvided=2
            }
            else if(param.type==="description") {
                if(!Interpreter.descProvided)Interpreter.desc= param.value.value
                else console.log("Description already provided, ignoring "+ param.value.value)
                Interpreter.descProvided= true
            }
            else {
                if(!Interpreter.versProvided)Interpreter.vers= param.value.value
                else console.log("Version already provided, ignoring "+ param.value.value)
                Interpreter.versProvided= true
            }
        })
       
    }

    async generateFiles() {
        //Setup zip file
        this.zip.file("pack.mcmeta",JSON.stringify(this.packmeta))
        const data = this.zip.folder("data")
        const minecraft = data.folder("minecraft")
        const mtags = minecraft.folder("tags")
        const mtfunction = mtags.folder("functions")
        mtfunction.file("load.json",JSON.stringify(this.loadFunc))
        mtfunction.file("tick.json",JSON.stringify(this.tickFunc))
        for (const [key, value] of Object.entries(Interpreter.nsdata)) {
            const ns= data.folder(key)
            const nsFunction = ns.folder("functions")
            for (const [elKey, elVal] of Object.entries(value)) 
                nsFunction.file(elKey+".mcfunction",elVal,{
                    createFolders: true // default value
                })
        }
        const embeds = Embeds.getEmbedded();
        this.generateEmbeds(embeds,data)
        //Generate zip file
        var content = null;
        if (JSZip.support.uint8array) {
        content = await this.zip.generateAsync({type : "uint8array"});
        } else {
        content = await this.zip.generateAsync({type : "string"});
        }
        await fs.writeFile(Interpreter.dir+Interpreter.title+".zip",content);
        console.log(`Wrote to ${Interpreter.title}.zip`);
    }
    generateEmbeds(embeds,data){
        for (const [key, value] of Object.entries(embeds)) {
            if(typeof value === 'string'){
                data.file(key,value);
            } 
            else {
                this.generateEmbeds(value,data.folder(key))
            }
        }
    }

}
module.exports = Interpreter;