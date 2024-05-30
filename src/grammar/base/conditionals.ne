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
    |  items_conditional      {% id %}
    |  loaded_conditional    {% id %}
    |  predicate_conditional {% id %}
    |  var_conditional       {% id %}
    |  "true"                {% id %}
    |  "false"                {% id %}

entity_condtional
    -> ("at"|"as") _lb id_def {% id %}

block_condtional
    -> "block" _lb pos _lb id_def {% id %}

blocks_condtional
   -> "blocks" _lb pos _lb pos _lb pos _lb ("all"|"masked") {% id %}

biome_condtional
    -> "biome" _lb pos _lb tag {% id %}
    | "biome" _lb pos _lb id_def {% id %}

data_condtional
    -> "data" _lb "block" _lb pos _lb nbt {% id %}
    |  "data" _lb "entity" _lb id_def _lb nbt {% id %} 
    |  "data" _lb "storage" _lb pos _lb nbt {% id %} 

dimension_condtional
    -> "dimension" _lb id_def {% id %}

function_conditional
    -> "function" _lb func_call {% id %}

items_conditional
    -> "items" _lb "block" _lb pos _lb id_def _lb id_def {% id %}

loaded_conditional
     -> "loaded" _lb pos {% id %}

predicate_conditional
    -> "predicate" _lb id_def {% id %}

var_conditional
    -> id_def %cond_symbols expr {% id %}
    | id_def "exists" {% id %}



