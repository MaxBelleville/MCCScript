@lexer lexer


if_define
    -> "if" _lb "(" _lb conditionals _lb ")" wrapper
    {%
    (data)=>{
        return { 
            type: "if_def",
            conditionals: data[4],
            value: data[7]
        }
    }
    %}
|    "if" _lb "(" _lb conditionals _lb ")" _lb var_assign
    {%
        (data)=>{
            return { 
                type: "if_def",
                conditionals: data[4],
                value: data[7]
            }
        }
    %}
    | "if" _lb "(" _lb conditionals _lb ")" _lb expr
    {%
        (data)=>{
            return { 
                type: "if_def",
                conditionals: data[4],
                value: data[7]
            }
        }
    %}

elif_define
    -> "else" _lb if_define 
    {%
        (data)=>{
            return { 
                type: "elif_def",
                value: data[2],
            }
        }
    %}

else_define
    -> "else" wrapper
    {%
    (data)=>{
        return { 
            type: "else_def",
            value: data[1]
        }
    }
    %}
    | "else" _lb var_assign
    {%
    (data)=>{
        return { 
            type: "else_def",
            value: data[2]
        }
    }
    %}
    | "else" _lb expr
    {%
    (data)=>{
        return { 
            type: "else_def",
            value: data[2]
        }
    }
    %}


conditionals
    -> combined_conditionals {% id %}
    | (%cond_not _lb):? "(" _lb combined_conditionals _lb ")" _lb (%cond_and|%cond_or) _lb conditionals
        {%
        (data)=>{
            return {
                type: "wrapped_conditonals",
                value: data[3],
                wrap_combiner: data[7],
                subvalue: data[9],
                not: data[0]?true:false
            }
        }
        %}
    | (%cond_not _lb):? "(" _lb combined_conditionals _lb ")"
        {%
        (data)=>{
              return {
                type: "wrapped_conditonals",
                value: data[3],
                not: data[0]?true:false
              }
        }
        %}


combined_conditionals
    ->  not_conditional (_lb (%cond_and|%cond_or) _lb not_conditional):+
        {%
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
        %}
    |   not_conditional {% id %}

not_conditional
    -> (%cond_not _lb):? conditional
        {%
            (data)=>{
                return {
                    type: "conditional",
                    value: data[1],
                    not: data[0]?true:false
                }
            }
        %}

conditional
    -> entity_condtional     {% id %}
    |  block_condtional      {% id %}
    |  blocks_condtional     {% id %}
    |  biome_condtional      {% id %}
    |  data_condtional       {% id %}
    |  dimension_condtional  {% id %}
    |  items_conditional     {% id %}
    |  loaded_conditional    {% id %}
    |  predicate_conditional {% id %}
    |  var_conditional       {% id %}
    |  "true"                {% id %}
    |  "false"               {% id %}

entity_condtional
    -> ("at"|"as") _lb id_def 
    {% 
        (data)=>{
            return { 
                type: "entity",
                source: data[0],
                value: data[2]
            }
        }  
     %}

block_condtional
    -> "block" _lb pos _lb id_def 
    {% 
        (data)=>{
            return { 
                type: "block",
                pos: data[2],
                value: data[4]
            }
        }  
     %}

blocks_condtional
   -> "blocks" _lb pos _lb pos _lb pos _lb ("all"|"masked") 
    {% 
        (data)=>{
            return { 
                type: "blocks",
                start: data[2],
                end: data[4],
                destination: data[6],
                mask: data[8]
            }
        }  
     %}

biome_condtional
    -> "biome" _lb pos _lb tag 
        {% 
        (data)=>{
            return { 
                type: "biome",
                pos: data[2],
                tag: data[4]
            }
        }  
     %}
    | "biome" _lb pos _lb id_def
           {% 
        (data)=>{
            return { 
                type: "biome",
                pos: data[2],
                value: data[4]
            }
        }  
     %}

data_condtional
    -> "data" _lb "block" _lb pos _lb nbt
    {% 
        (data)=>{
            return { 
                type: "data-block",
                pos: data[4],
                nbt: data[6]
            }
        }  
     %}
    |  "data" _lb "entity" _lb id_def _lb nbt 
     {% 
        (data)=>{
            return { 
                type: "data-entity",
                value: data[4],
                nbt: data[6]
            }
        }  
     %}
    |  "data" _lb "storage" _lb pos _lb nbt 
    {% 
        (data)=>{
            return { 
                type: "data-storage",
                pos: data[4],
                nbt: data[6]
            }
        }  
     %}

dimension_condtional
    -> "dimension" _lb id_def 
    {% 
        (data)=>{
            return { 
                type: "dimension",
                value: data[2]
            }
        }  
     %}

function_conditional
    -> "function" _lb func_call 
    {% 
        (data)=>{
            return { 
                type: "function",
                func: data[2]
            }
        }  
    %}
items_conditional
    -> "items" _lb "block" _lb pos _lb id_def _lb id_def 
    {% 
        (data)=>{
            return { 
                type: "items-block",
                pos: data[4],
                slot: data[6],
                predicate: data[6]
            }
        }  
    %}
    | "items" _lb "entity" _lb id_def _lb id_def _lb id_def 
    {% 
        (data)=>{
            return { 
                type: "items-entity",
                value: data[4],
                slot: data[6],
                predicate: data[6]
            }
        }  
    %}

loaded_conditional
     -> "loaded" _lb pos 
    {% 
        (data)=>{
            return { 
                type: "loaded",
                func: data[2]
            }
        }  
    %}

predicate_conditional
    -> "predicate" _lb id_def 
     {% 
        (data)=>{
            return { 
                type: "predicate",
                predicate: data[2]
            }
        }  
    %}

var_conditional
    -> id_def _lb %cond_symbols _lb expr 
      {% 
        (data)=>{
            return { 
                type: "var-compare",
                id: data[0],
                symbol: data[2],
                value: data[4],
            }
        }  
    %}
    | id_def "exists"
    {% 
        (data)=>{
            return { 
                type: "var-exists",
                value: data[0]
            }
        }  
    %}


