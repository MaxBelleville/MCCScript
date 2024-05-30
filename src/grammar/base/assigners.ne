@lexer lexer

score_assign
    -> "score" _lb %id
        {%
            (data)=>{
                return { 
                    type: "score_def",
                    id: data[2]
                }
            }
        %}
    | "score" _lb var_assign
       {%    
            (data)=>{
                return { 
                    type: "score_assign",
                    value: data[2]
                }
            }
       %}

entity_assign
    -> "entity" _lb var_assign
    {%
        (data)=>{
            return { 
                type: "entity_assign",
                value: data[2]
            }
        }
    %}


var_assign
    -> id_def _lb "=" _lb expr
        {%
            (data)=>{
                return { 
                    type: "var_assign",
                    id: data[0],
                    value: data[4]
                }
            }
        %}


id_def 
  -> %id {%
        (data)=>{
            return {
                type: "var",
                value: data[0],
            }
        }
    %}
  | %id _lb "[" %id "]"
    {%
        (data)=>{
            return {
                type: "var_accesor",
                value: data[0],
                accessor: data[3]
            }
        }
    %}
  | %id _lb "[" conditionals "]"
    {%
    (data)=>{
        return { 
            type: "var_conditional",
            value: data[0],
            conditional: data[3]
        }
    }
    %}