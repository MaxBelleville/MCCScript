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
    {"name": "func_def$ebnf$1$subexpression$1", "symbols": ["param_list"]},
    {"name": "func_def$ebnf$1", "symbols": ["func_def$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_def$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_def", "symbols": [{"literal":"function"}, "_lb", (lexer.has("id") ? {type: "id"} : id), "_lb", {"literal":"("}, "_lb", "func_def$ebnf$1", "_lb", {"literal":")"}, "func_body"], "postprocess": 
        (data)=>{
                return { 
                    type: "func_def",
                    func_name: data[2],
                    params: data[6]? data[6][0] : [],
                    body: data[9]
                }
        }
            },
    {"name": "func_body", "symbols": ["_lb", {"literal":"{"}, "_lb", {"literal":"}"}], "postprocess": 
        (data)=>{
            return [];
        } 
            },
    {"name": "func_body", "symbols": ["_lb", {"literal":"{"}, "statements", {"literal":"}"}], "postprocess":   
        (data)=>{
            return data[2];
        } 
            },
    {"name": "arg_list$ebnf$1", "symbols": []},
    {"name": "arg_list$ebnf$1$subexpression$1", "symbols": ["_lb", {"literal":","}, "_lb", (lexer.has("expr") ? {type: "expr"} : expr)]},
    {"name": "arg_list$ebnf$1", "symbols": ["arg_list$ebnf$1", "arg_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arg_list", "symbols": [(lexer.has("expr") ? {type: "expr"} : expr), "arg_list$ebnf$1"], "postprocess": 
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
    {"name": "datapack_args", "symbols": ["__lb", "datapack_args$subexpression$1", "__lb", (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data)=>{
            var type=data[1][0].value.replace("-","")
            if(type==='dir') type='directory'
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
    {"name": "datapack_func", "symbols": ["datapack_func$subexpression$1", "func_body"], "postprocess": 
        (data)=>{
                var type=data[0][0].value
               return { 
                   type: type,
                   body: data[1]
               }
           }
            },
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
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "statement", "symbols": ["func_def"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["datapack_def"], "postprocess": id},
    {"name": "statement", "symbols": ["datapack_func"], "postprocess": id},
    {"name": "statement", "symbols": ["import"], "postprocess": id},
    {"name": "import", "symbols": [{"literal":"#import"}, "_lb", (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2]
            }
        }
            },
    {"name": "var_assign", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data)=>{
            return { 
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": id},
    {"name": "expr", "symbols": ["func_call"], "postprocess": id},
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
