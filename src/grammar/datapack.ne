@lexer lexer

datapack_def
    -> "@datapack" (datapack_args):+
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
    -> __lb ("-directory"|"-dir"|"-namespace"|"-ns"|"-desc"|"-description"|"-t"|"-title") __lb %string
     {%
            (data)=>{
                var type=data[1][0].value.replace("-","")
                if(type==='dir') type='directory'
                if(type==='t') type='title'
                if(type==='ns') type='namespace'
                if(type==='desc') type='description'
                return {
                    type: type,
                    value: data[3]
                }
            }
    %}
    | __lb ("-version"|"-ver") __lb %number
     {%
            (data)=>{
                var type=data[1][0].value.replace("-","")
                if(type==='ver') type='version'
                return {
                    type: type,
                    value: data[3]
                }
            }
    %}


datapack_func
    -> ("load"|"tick") func_body
     {%
         (data)=>{
                 var type=data[0][0].value
                return { 
                    type: type,
                    body: data[1]
                }
            }
    %}