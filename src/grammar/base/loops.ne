@lexer lexer

for_loop
    -> "for" _lb "(" _lb for_header _lb ")" wrapper 
    {%
       (data)=>{
                return { 
                    type: "for",
                    header: data[4],
                    body: data[7]
                }
            }
    %}

for_header
    ->  var_assign __seg conditionals __seg incrementer
    {%
        (data)=>{
            return { 
                type: "head-conditional",
                value: data[0],
                conditonal: data[2],
                incrementer: data[4]
            }
        }
    %}
    | conditionals __seg incrementer
    {%
        (data)=>{
            return { 
                type: "head-conditional",
                conditonal: data[2],
                incrementer: data[4]
            }
        }
    %}
    |   (var_assign|id_def) _lb "in" _lb id_def
    {%
        (data)=>{
            return { 
                type: "iterator",
                value: data[0],
                iterator: data[2]
            }
        }
    %}


while_loop
    -> "while" _lb "(" _lb conditionals _lb ")" wrapper
    {%
        (data)=>{
            return { 
                type: "while",
                conditional: data[4],
                body: data[7]
            }
        }
    %}

do_while_loop
    -> "do" wrapper _lb "while" _lb "(" _lb conditionals _lb ")"
    {%
        (data)=>{
            return { 
                type: "do-while",
                conditional: data[7],
                body: data[1],
            }
        }  
    %}

