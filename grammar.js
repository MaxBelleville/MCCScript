// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lexer')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": [], "postprocess": 
        (data)=>{
            return [];
        }
                },
    {"name": "statements", "symbols": ["statement"], "postprocess": 
        (data)=>{
            return [data[0]];
        }
                },
    {"name": "statements", "symbols": ["statement", "_", "line_break", "_", "statements"], "postprocess": 
        (data)=>{
            return [data[0], ...data[4]];
        }
                },
    {"name": "line_break", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "line_break$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "line_break$ebnf$1", "symbols": ["line_break$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "line_break$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line_break", "symbols": [{"literal":";"}, "line_break$ebnf$1"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "var_assign", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data)=>{
            return { 
                type: "var_assign",
                var_name: data[0],
                value: data[4]
            }
        }
                },
    {"name": "func_call", "symbols": [(lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}], "postprocess": 
        (data)=>{
                return { 
                    type: "func_call",
                    func_name: data[0],
                    params: data[4]
                }
        }
        },
    {"name": "func_call", "symbols": [(lexer.has("built_ins") ? {type: "built_ins"} : built_ins), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}], "postprocess": 
        (data)=>{
                return { 
                    type: "built_in_func",
                    func_name: data[0],
                    params: data[4]
                }
        }
              },
    {"name": "arg_list", "symbols": [], "postprocess": 
        (data)=>{
            return [];
        }
        },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data)=>{
            return [data[0]];
        }
        },
    {"name": "arg_list", "symbols": ["arg_list", "_", {"literal":","}, "_", "expr"], "postprocess": 
        (data)=>{
            return [...data[0], data[4]]   
        }
        },
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": id},
    {"name": "expr", "symbols": ["func_call"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
