@{%
const lexer = require('./lexer')
%}
@lexer lexer

statements
    -> null
        {%
            (data)=>{
                return [];
            }
        %}
    | statement
        {%
            (data)=>{
                return [data[0]];
            }
        %}
    | statement _ line_break _ statements 
      {%
            (data)=>{
                return [data[0], ...data[4]];
            }
        %}

line_break
    -> %NL {% id %}
    | ";" (_ %NL):?  {% id %}
 

statement
    -> var_assign  {% id %}
    | func_call   {% id %}


var_assign
    -> %id _ "=" _ expr
        {%
            (data)=>{
                return { 
                    type: "var_assign",
                    var_name: data[0],
                    value: data[4]
                }
            }
        %}


func_call
    -> %id _ "(" _ arg_list _ ")"
        {%
        (data)=>{
                return { 
                    type: "func_call",
                    func_name: data[0],
                    params: data[4]
                }
        }
        %}
    |  %built_ins _ "(" _ arg_list _ ")"
      {%
        (data)=>{
                return { 
                    type: "built_in_func",
                    func_name: data[0],
                    params: data[4]
                }
        }
      %}

arg_list 
    -> null {%
        (data)=>{
            return [];
        }
        %}
    | expr {%
        (data)=>{
            return [data[0]];
        }
        %}
    | arg_list _ "," _ expr
        {%
        (data)=>{
            return [...data[0], data[4]]   
        }
        %}

expr 
    -> %string  {% id %}
    | %number   {% id %}
    | %id       {% id %}
    | func_call {% id %}

_ -> %WS:*

__ -> %WS:+