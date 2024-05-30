// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('../lexer')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "func_call$ebnf$1$subexpression$1", "symbols": ["arg_list"]},
    {"name": "func_call$ebnf$1", "symbols": ["func_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_call", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_lb", {"literal":"("}, "_lb", "func_call$ebnf$1", "_lb", {"literal":")"}], "postprocess": 
        (data)=>{
                return { 
                    type: "func_call",
                    func_name: data[0],
                    params: data[4]? data[4][0] : []
                }
        }
        },
    {"name": "func_call$ebnf$2$subexpression$1", "symbols": ["arg_list"]},
    {"name": "func_call$ebnf$2", "symbols": ["func_call$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "func_call$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_call", "symbols": [(lexer.has("built_ins") ? {type: "built_ins"} : built_ins), "_lb", {"literal":"("}, "_lb", "func_call$ebnf$2", "_lb", {"literal":")"}], "postprocess": 
        (data)=>{
                return { 
                    type: "bi_func_call",
                    func_name: data[0],
                    params: data[4]? data[4][0] : []
                }
        }
              },
    {"name": "func_def$ebnf$1$subexpression$1", "symbols": ["_lb", "param_list"]},
    {"name": "func_def$ebnf$1", "symbols": ["func_def$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_def$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_def", "symbols": [{"literal":"function"}, "_lb", (lexer.has("id") ? {type: "id"} : id), "_lb", {"literal":"("}, "func_def$ebnf$1", "_lb", {"literal":")"}, "wrapper"], "postprocess": 
        (data)=>{
                return { 
                    type: "func_def",
                    func_name: data[2],
                    params: data[5]? data[5][1]: [],
                    body: data[9]
                }
        }
            },
    {"name": "arg_list$ebnf$1", "symbols": []},
    {"name": "arg_list$ebnf$1$subexpression$1", "symbols": ["_lb", {"literal":","}, "_lb", "expr"]},
    {"name": "arg_list$ebnf$1", "symbols": ["arg_list$ebnf$1", "arg_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arg_list", "symbols": ["expr", "arg_list$ebnf$1"], "postprocess": 
        (data)=>{
            const arrayExpr = data[1]
            const expressions = arrayExpr.map(parts=>parts[3])
            return [data[0], ...expressions]   
        }
        },
    {"name": "param_list$ebnf$1", "symbols": []},
    {"name": "param_list$ebnf$1$subexpression$1", "symbols": ["_lb", {"literal":","}, "_lb", (lexer.has("id") ? {type: "id"} : id)]},
    {"name": "param_list$ebnf$1", "symbols": ["param_list$ebnf$1", "param_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param_list", "symbols": [(lexer.has("id") ? {type: "id"} : id), "param_list$ebnf$1"], "postprocess": 
        (data)=>{
            const arrayId = data[1]
            const ids = arrayId.map(parts=>parts[3])
            return [data[0], ...ids]
        }
        },
    {"name": "datapack_def$ebnf$1$subexpression$1", "symbols": ["datapack_args"]},
    {"name": "datapack_def$ebnf$1", "symbols": ["datapack_def$ebnf$1$subexpression$1"]},
    {"name": "datapack_def$ebnf$1$subexpression$2", "symbols": ["datapack_args"]},
    {"name": "datapack_def$ebnf$1", "symbols": ["datapack_def$ebnf$1", "datapack_def$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "datapack_def", "symbols": [{"literal":"@datapack"}, "datapack_def$ebnf$1"], "postprocess": 
        (data)=>{
            const arrayArgs = data[1]
            const args = arrayArgs.map(parts=>parts[0])
            return {
                type: "datapack_def",
                params: args
            }
        }
             },
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-directory"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-dir"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-namespace"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-ns"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-desc"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-description"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-t"}]},
    {"name": "datapack_args$subexpression$1", "symbols": [{"literal":"-title"}]},
    {"name": "datapack_args", "symbols": ["__lb", "datapack_args$subexpression$1", "__lb", (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data)=>{
            var type=data[1][0].value.replace("-","")
            if(type==='dir') type='directory'
            if(type==='t') type='title'
            if(type==='ns') type='namespace'
            if(type==='desc') type='description'
            return {
                type: type,
                value: data[3]
            }
        }
            },
    {"name": "datapack_args$subexpression$2", "symbols": [{"literal":"-version"}]},
    {"name": "datapack_args$subexpression$2", "symbols": [{"literal":"-ver"}]},
    {"name": "datapack_args", "symbols": ["__lb", "datapack_args$subexpression$2", "__lb", (lexer.has("number") ? {type: "number"} : number)], "postprocess": 
        (data)=>{
            var type=data[1][0].value.replace("-","")
            if(type==='ver') type='version'
            return {
                type: type,
                value: data[3]
            }
        }
            },
    {"name": "datapack_func$subexpression$1", "symbols": [{"literal":"load"}]},
    {"name": "datapack_func$subexpression$1", "symbols": [{"literal":"tick"}]},
    {"name": "datapack_func", "symbols": ["datapack_func$subexpression$1", "wrapper"], "postprocess": 
        (data)=>{
                var type=data[0][0].value
               return { 
                   type: type,
                   body: data[1]
               }
           }
            },
    {"name": "if_define", "symbols": [{"literal":"if"}, "_lb", {"literal":"("}, "_lb", "conditionals", "_lb", {"literal":")"}, "wrapper"], "postprocess": 
        (data)=>{
            return { 
                type: "if_def",
                conditionals: data[4],
                value: data[7]
            }
        }
        },
    {"name": "if_define", "symbols": [{"literal":"if"}, "_lb", {"literal":"("}, "_lb", "conditionals", "_lb", {"literal":")"}, "_lb", "var_assign"], "postprocess": 
        (data)=>{
            return { 
                type: "if_def",
                conditionals: data[4],
                value: data[7]
            }
        }
            },
    {"name": "if_define", "symbols": [{"literal":"if"}, "_lb", {"literal":"("}, "_lb", "conditionals", "_lb", {"literal":")"}, "_lb", "expr"], "postprocess": 
        (data)=>{
            return { 
                type: "if_def",
                conditionals: data[4],
                value: data[7]
            }
        }
            },
    {"name": "elif_define", "symbols": [{"literal":"else"}, "_lb", "if_define"], "postprocess": 
        (data)=>{
            return { 
                type: "elif_def",
                value: data[2],
            }
        }
            },
    {"name": "else_define", "symbols": [{"literal":"else"}, "wrapper"], "postprocess": 
        (data)=>{
            return { 
                type: "else_def",
                value: data[1]
            }
        }
        },
    {"name": "else_define", "symbols": [{"literal":"else"}, "_lb", "var_assign"], "postprocess": 
        (data)=>{
            return { 
                type: "else_def",
                value: data[2]
            }
        }
        },
    {"name": "else_define", "symbols": [{"literal":"else"}, "_lb", "expr"], "postprocess": 
        (data)=>{
            return { 
                type: "else_def",
                value: data[2]
            }
        }
        },
    {"name": "conditionals", "symbols": ["combined_conditionals"], "postprocess": id},
    {"name": "conditionals$ebnf$1$subexpression$1", "symbols": [(lexer.has("cond_not") ? {type: "cond_not"} : cond_not), "_lb"]},
    {"name": "conditionals$ebnf$1", "symbols": ["conditionals$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "conditionals$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "conditionals$subexpression$1", "symbols": [(lexer.has("cond_and") ? {type: "cond_and"} : cond_and)]},
    {"name": "conditionals$subexpression$1", "symbols": [(lexer.has("cond_or") ? {type: "cond_or"} : cond_or)]},
    {"name": "conditionals", "symbols": ["conditionals$ebnf$1", {"literal":"("}, "_lb", "combined_conditionals", "_lb", {"literal":")"}, "_lb", "conditionals$subexpression$1", "_lb", "conditionals"], "postprocess": 
        (data)=>{
            return {
                type: "wrapped_conditonals",
                value: data[3],
                wrap_combiner: data[7],
                subvalue: data[9],
                not: data[0]?true:false
            }
        }
        },
    {"name": "conditionals$ebnf$2$subexpression$1", "symbols": [(lexer.has("cond_not") ? {type: "cond_not"} : cond_not), "_lb"]},
    {"name": "conditionals$ebnf$2", "symbols": ["conditionals$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "conditionals$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "conditionals", "symbols": ["conditionals$ebnf$2", {"literal":"("}, "_lb", "combined_conditionals", "_lb", {"literal":")"}], "postprocess": 
        (data)=>{
              return {
                type: "wrapped_conditonals",
                value: data[3],
                not: data[0]?true:false
              }
        }
        },
    {"name": "combined_conditionals$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("cond_and") ? {type: "cond_and"} : cond_and)]},
    {"name": "combined_conditionals$ebnf$1$subexpression$1$subexpression$1", "symbols": [(lexer.has("cond_or") ? {type: "cond_or"} : cond_or)]},
    {"name": "combined_conditionals$ebnf$1$subexpression$1", "symbols": ["_lb", "combined_conditionals$ebnf$1$subexpression$1$subexpression$1", "_lb", "not_conditional"]},
    {"name": "combined_conditionals$ebnf$1", "symbols": ["combined_conditionals$ebnf$1$subexpression$1"]},
    {"name": "combined_conditionals$ebnf$1$subexpression$2$subexpression$1", "symbols": [(lexer.has("cond_and") ? {type: "cond_and"} : cond_and)]},
    {"name": "combined_conditionals$ebnf$1$subexpression$2$subexpression$1", "symbols": [(lexer.has("cond_or") ? {type: "cond_or"} : cond_or)]},
    {"name": "combined_conditionals$ebnf$1$subexpression$2", "symbols": ["_lb", "combined_conditionals$ebnf$1$subexpression$2$subexpression$1", "_lb", "not_conditional"]},
    {"name": "combined_conditionals$ebnf$1", "symbols": ["combined_conditionals$ebnf$1", "combined_conditionals$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "combined_conditionals", "symbols": ["not_conditional", "combined_conditionals$ebnf$1"], "postprocess": 
        (data)=>{
            const arrayCond = data[1]
            const combiners = arrayCond.map(parts=>parts[1])
            const conditonals = arrayCond.map(parts=>parts[3])
            return {
                type: "conditonals",
                value: [data[0],...conditonals],
                combiners: [...combiners]
            }
        }
                },
    {"name": "combined_conditionals", "symbols": ["not_conditional"], "postprocess": id},
    {"name": "not_conditional$ebnf$1$subexpression$1", "symbols": [(lexer.has("cond_not") ? {type: "cond_not"} : cond_not), "_lb"]},
    {"name": "not_conditional$ebnf$1", "symbols": ["not_conditional$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "not_conditional$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "not_conditional", "symbols": ["not_conditional$ebnf$1", "conditional"], "postprocess": 
        (data)=>{
            return {
                type: "conditional",
                value: data[1],
                not: data[0]?true:false
            }
        }
                },
    {"name": "conditional", "symbols": ["entity_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["block_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["blocks_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["biome_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["data_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["dimension_condtional"], "postprocess": id},
    {"name": "conditional", "symbols": ["items_conditional"], "postprocess": id},
    {"name": "conditional", "symbols": ["loaded_conditional"], "postprocess": id},
    {"name": "conditional", "symbols": ["predicate_conditional"], "postprocess": id},
    {"name": "conditional", "symbols": ["var_conditional"], "postprocess": id},
    {"name": "conditional", "symbols": [{"literal":"true"}], "postprocess": id},
    {"name": "conditional", "symbols": [{"literal":"false"}], "postprocess": id},
    {"name": "entity_condtional$subexpression$1", "symbols": [{"literal":"at"}]},
    {"name": "entity_condtional$subexpression$1", "symbols": [{"literal":"as"}]},
    {"name": "entity_condtional", "symbols": ["entity_condtional$subexpression$1", "_lb", "id_def"], "postprocess": id},
    {"name": "block_condtional", "symbols": [{"literal":"block"}, "_lb", "pos", "_lb", "id_def"], "postprocess": id},
    {"name": "blocks_condtional$subexpression$1", "symbols": [{"literal":"all"}]},
    {"name": "blocks_condtional$subexpression$1", "symbols": [{"literal":"masked"}]},
    {"name": "blocks_condtional", "symbols": [{"literal":"blocks"}, "_lb", "pos", "_lb", "pos", "_lb", "pos", "_lb", "blocks_condtional$subexpression$1"], "postprocess": id},
    {"name": "biome_condtional", "symbols": [{"literal":"biome"}, "_lb", "pos", "_lb", "tag"], "postprocess": id},
    {"name": "biome_condtional", "symbols": [{"literal":"biome"}, "_lb", "pos", "_lb", "id_def"], "postprocess": id},
    {"name": "data_condtional", "symbols": [{"literal":"data"}, "_lb", {"literal":"block"}, "_lb", "pos", "_lb", "nbt"], "postprocess": id},
    {"name": "data_condtional", "symbols": [{"literal":"data"}, "_lb", {"literal":"entity"}, "_lb", "id_def", "_lb", "nbt"], "postprocess": id},
    {"name": "data_condtional", "symbols": [{"literal":"data"}, "_lb", {"literal":"storage"}, "_lb", "pos", "_lb", "nbt"], "postprocess": id},
    {"name": "dimension_condtional", "symbols": [{"literal":"dimension"}, "_lb", "id_def"], "postprocess": id},
    {"name": "function_conditional", "symbols": [{"literal":"function"}, "_lb", "func_call"], "postprocess": id},
    {"name": "items_conditional", "symbols": [{"literal":"items"}, "_lb", {"literal":"block"}, "_lb", "pos", "_lb", "id_def", "_lb", "id_def"], "postprocess": id},
    {"name": "loaded_conditional", "symbols": [{"literal":"loaded"}, "_lb", "pos"], "postprocess": id},
    {"name": "predicate_conditional", "symbols": [{"literal":"predicate"}, "_lb", "id_def"], "postprocess": id},
    {"name": "var_conditional", "symbols": ["id_def", (lexer.has("cond_symbols") ? {type: "cond_symbols"} : cond_symbols), "expr"], "postprocess": id},
    {"name": "var_conditional", "symbols": ["id_def", {"literal":"exists"}], "postprocess": id},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__seg", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_lb", "statement", "statements$ebnf$1", "_seg"], "postprocess": 
        (data)=>{
            const arrStatements = data[2]
            const statements = arrStatements.map(parts=>parts[1])
            return [data[1], ...statements];
        }
                },
    {"name": "statement", "symbols": ["if_define"], "postprocess": id},
    {"name": "statement", "symbols": ["elif_define"], "postprocess": id},
    {"name": "statement", "symbols": ["else_define"], "postprocess": id},
    {"name": "statement", "symbols": ["score_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["entity_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "statement", "symbols": ["func_def"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["datapack_def"], "postprocess": id},
    {"name": "statement", "symbols": ["datapack_func"], "postprocess": id},
    {"name": "statement", "symbols": ["import"], "postprocess": id},
    {"name": "import", "symbols": [{"literal":"@import"}, "_lb", (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2],
                body: []
            }
        }
            },
    {"name": "import$subexpression$1", "symbols": [{"literal":"-ns"}]},
    {"name": "import$subexpression$1", "symbols": [{"literal":"-namespace"}]},
    {"name": "import", "symbols": [{"literal":"@import"}, "_lb", (lexer.has("string") ? {type: "string"} : string), "_lb", "import$subexpression$1", "_lb", (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2],
                namespace: data[6],
                body: []
            }
        }
            },
    {"name": "wrapper", "symbols": ["_lb", {"literal":"{"}, "_lb", {"literal":"}"}], "postprocess": 
        (data)=>{
            return [];
        } 
            },
    {"name": "wrapper", "symbols": ["_lb", {"literal":"{"}, "statements", {"literal":"}"}], "postprocess":   
        (data)=>{
            return data[2];
        } 
            },
    {"name": "score_assign", "symbols": [{"literal":"score"}, "_lb", (lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        (data)=>{
            return { 
                type: "score_def",
                id: data[2]
            }
        }
                },
    {"name": "score_assign", "symbols": [{"literal":"score"}, "_lb", "var_assign"], "postprocess":     
        (data)=>{
            return { 
                type: "score_assign",
                value: data[2]
            }
        }
               },
    {"name": "entity_assign", "symbols": [{"literal":"entity"}, "_lb", "var_assign"], "postprocess": 
        (data)=>{
            return { 
                type: "entity_assign",
                value: data[2]
            }
        }
            },
    {"name": "var_assign", "symbols": ["id_def", "_lb", {"literal":"="}, "_lb", "expr"], "postprocess": 
        (data)=>{
            return { 
                type: "var_assign",
                id: data[0],
                value: data[4]
            }
        }
                },
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": ["func_call"], "postprocess": id},
    {"name": "expr", "symbols": ["id_def"], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("locators") ? {type: "locators"} : locators)], "postprocess": id},
    {"name": "expr", "symbols": ["tag"], "postprocess": id},
    {"name": "id_def", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        (data)=>{
            return {
                type: "var",
                value: data[0],
            }
        }
            },
    {"name": "id_def", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_lb", {"literal":"["}, (lexer.has("id") ? {type: "id"} : id), {"literal":"]"}], "postprocess": 
        (data)=>{
            return {
                type: "var_accesor",
                value: data[0],
                accessor: data[3]
            }
        }
            },
    {"name": "id_def", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_lb", {"literal":"["}, "conditionals", {"literal":"]"}], "postprocess": 
        (data)=>{
            return { 
                type: "var_conditional",
                value: data[0],
                conditional: data[3]
            }
        }
        },
    {"name": "pos", "symbols": [(lexer.has("number") ? {type: "number"} : number), "_lb", (lexer.has("number") ? {type: "number"} : number), "_lb", (lexer.has("number") ? {type: "number"} : number)]},
    {"name": "pos", "symbols": [{"literal":"~"}, (lexer.has("number") ? {type: "number"} : number), "_lb", {"literal":"~"}, (lexer.has("number") ? {type: "number"} : number), "_lb", {"literal":"~"}, (lexer.has("number") ? {type: "number"} : number)]},
    {"name": "pos", "symbols": [{"literal":"^"}, (lexer.has("number") ? {type: "number"} : number), "_lb", {"literal":"^"}, (lexer.has("number") ? {type: "number"} : number), "_lb", {"literal":"^"}, (lexer.has("number") ? {type: "number"} : number)]},
    {"name": "tag", "symbols": [{"literal":"#"}, "id_def"], "postprocess": 
        (data) => {
            return data[1]
        }
          },
    {"name": "_lb", "symbols": ["_"], "postprocess": id},
    {"name": "_lb$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "_lb$ebnf$1", "symbols": ["_lb$ebnf$1$subexpression$1"]},
    {"name": "_lb$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "_lb$ebnf$1", "symbols": ["_lb$ebnf$1", "_lb$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_lb", "symbols": ["_lb$ebnf$1"], "postprocess": id},
    {"name": "_seg", "symbols": ["_lb"], "postprocess": id},
    {"name": "_seg$ebnf$1", "symbols": []},
    {"name": "_seg$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "_seg$ebnf$1", "symbols": ["_seg$ebnf$1", "_seg$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_seg", "symbols": [{"literal":";"}, "_seg$ebnf$1"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "__lb", "symbols": ["__"], "postprocess": id},
    {"name": "__lb$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "__lb$ebnf$1", "symbols": ["__lb$ebnf$1$subexpression$1"]},
    {"name": "__lb$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "__lb$ebnf$1", "symbols": ["__lb$ebnf$1", "__lb$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb", "symbols": ["__lb$ebnf$1"], "postprocess": id},
    {"name": "__seg$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "__seg$ebnf$1", "symbols": ["__seg$ebnf$1$subexpression$1"]},
    {"name": "__seg$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "__seg$ebnf$1", "symbols": ["__seg$ebnf$1", "__seg$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__seg", "symbols": ["__seg$ebnf$1"], "postprocess": id},
    {"name": "__seg$ebnf$2", "symbols": []},
    {"name": "__seg$ebnf$2$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL), "_"]},
    {"name": "__seg$ebnf$2", "symbols": ["__seg$ebnf$2", "__seg$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__seg", "symbols": [{"literal":";"}, "__seg$ebnf$2"], "postprocess": id}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
