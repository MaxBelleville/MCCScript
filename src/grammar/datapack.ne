@lexer lexer

datapack_def
    -> "#datapack" (datapack_args):+
     {%
        (data)=>{
            const arrayArgs = data[1]
            const args = arrayArgs.map(parts=>parts[0])
            return {
                type: "datapack_def",
                params: args
            }
        }
     %}

datapack_args
    -> __lb ("namespace"|"dir"|"desc") __lb %string
     {%
            (data)=>{
                return {
                    type: data[1][0],
                    value: data[3]
                }
            }
    %}


datapack_func
    -> ("load"|"tick") func_body
     {%
         (data)=>{
                return { 
                    type: data[0][0],
                    body: data[1]
                }
            }
    %}