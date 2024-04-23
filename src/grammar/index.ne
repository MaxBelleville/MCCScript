@{%
const lexer = require('../lexer')
%}
@lexer lexer

@include  "./function.ne"
@include  "./datapack.ne"


statements
    -> _lb statement (__seg statement):* _seg
      {%
            (data)=>{
                const arrStatements = data[2]
                const statements = arrStatements.map(parts=>parts[1])
                return [data[1], ...statements];
            }
        %}

statement
    -> var_assign   {% id %}
    | func_call     {% id %}
    | func_def      {% id %}
    | %comment      {% id %}
    | datapack_def  {% id %}
    | datapack_func {% id %}
    | import {% id %}

import 
    -> "#import" _lb %string
    {%
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2]
            }
        }
    %}

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

expr 
    -> %string  {% id %}
    | %number   {% id %}
    | %id       {% id %}
    | func_call {% id %}

_lb
    -> _          {% id %} 
    | (_ %NL _):+ {% id %} 

_seg 
    -> _lb             {% id %}
    | ";" (_ %NL _):*  {% id %}

_ -> %WS:*

__ -> %WS:+

__lb
    -> __           {% id %} 
    | (_ %NL _):+   {% id %} 

__seg
    -> (_ %NL _):+     {% id %}
    | ";" (_ %NL _):*  {% id %}