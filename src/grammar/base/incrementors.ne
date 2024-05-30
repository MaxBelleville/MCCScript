@lexer lexer

incrementer
    -> add_increment {% id %}
    | sub_increment {% id %}
    | div_increment {% id %}
    | mod_increment {% id %}
    | multi_increment {% id %}
    | var_assign {% id %}

add_increment
    -> id_def _lb "++"   
    {%
        (data)=>{
            return {
                type: "adder",
                id: data[0],
                value: 1
            }
        }
    %}
    | id_def _lb "+=" _lb expr
        {%
        (data)=>{
            return {
                type: "adder",
                id: data[0],
                value: data[4]
            }
        }
    %}
    | var_assign _lb "+" _lb expr
        {%
        (data)=>{
            return {
                type: "adder",
                id: data[0],
                value: data[4]
            }
        }
    %}


sub_increment
    -> id_def _lb "--"   
    {%
        (data)=>{
            return {
                type: "subtractor",
                id: data[0],
                value: 1
            }
        }
    %}
    | id_def _lb "-=" _lb expr
        {%
        (data)=>{
            return {
                type: "subtractor",
                id: data[0],
                value: data[4]
            }
        }
    %}
    | var_assign _lb "-" _lb expr
        {%
        (data)=>{
            return {
                type: "subtractor",
                id: data[0],
                value: data[4]
            }
        }
    %}


mod_increment 
    -> id_def _lb "%=" _lb expr
            {%
        (data)=>{
            return {
                type: "modulator",
                id: data[0],
                value: data[4]
            }
        }
    %}
    | var_assign _lb "%" _lb expr
                {%
        (data)=>{
            return {
                type: "modulator",
                id: data[0],
                value: data[4]
            }
        }
    %}

div_increment 
    -> id_def _lb "/=" _lb expr
                {%
        (data)=>{
            return {
                type: "divider",
                id: data[0],
                value: data[4]
            }
        }
    %}
    | var_assign _lb "/" _lb expr
                    {%
        (data)=>{
            return {
                type: "divider",
                id: data[0],
                value: data[4]
            }
        }
    %}

multi_increment 
    -> id_def _lb "*=" _lb expr
                    {%
        (data)=>{
            return {
                type: "multiplier",
                id: data[0],
                value: data[4]
            }
        }
    %}
    | var_assign _lb "*" _lb expr
        {%
        (data)=>{
            return {
                type: "multiplier",
                id: data[0],
                value: data[4]
            }
        }
    %}