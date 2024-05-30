@{%
const lexer = require('../lexer')
%}
@lexer lexer

@include  "./base/function.ne"
@include  "./base/datapack.ne"
@include  "./base/conditionals.ne"
@include  "./base/incrementors.ne"
@include  "./base/assigners.ne"
@include  "./base/loops.ne"

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
    -> if_define    {% id %}
    | elif_define   {% id %}
    | else_define   {% id %}
    | for_loop      {% id %}
    | while_loop    {% id %}
    | do_while_loop {% id %}
    | score_assign  {% id %}
    | entity_assign {% id %}
    | var_assign    {% id %}
    | func_call     {% id %}
    | func_def      {% id %}
    | %comment      {% id %}
    | datapack_def  {% id %}
    | datapack_func {% id %}
    | import {% id %}

import 
    -> "import" _lb %string
    {%
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2],
                body: []
            }
        }
    %}
    |  "import" _lb %string _lb ("-ns"|"-namespace") _lb %string
    {%
        (data)=>{
            return {
                type: "import_mcc",
                value: data[2],
                namespace: data[6],
                body: []
            }
        }
    %}


wrapper
    -> _lb "{" _lb "}"
    {%
        (data)=>{
            return [];
        } 
    %}
    | _lb "{" statements "}"
    {%  
        (data)=>{
            return data[2];
        } 
    %}

expr 
    -> %string  {% id %}
    | %number   {% id %}
    | func_call {% id %}
    | id_def    {% id %}
    | %locators {% id %}
    | tag       {% id %}


pos 
  -> %number _lb %number _lb %number  
  | "~" %number _lb "~" %number _lb "~" %number 
  | "^" %number _lb "^" %number _lb "^" %number 

tag 
  -> "#" id_def 
  {%
    (data) => {
        return data[1]
    }
  %}


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
