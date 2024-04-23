@lexer lexer

func_call
    -> %id _lb "(" _lb (arg_list):? _lb ")"
        {%
        (data)=>{
                return { 
                    type: "func_call",
                    func_name: data[0],
                    params: data[4]? data[4][0] : []
                }
        }
        %}
    |  %built_ins _lb "(" _lb (arg_list):? _lb ")"
      {%
        (data)=>{
                return { 
                    type: "bi_func_call",
                    func_name: data[0],
                    params: data[4]? data[4][0] : []
                }
        }
      %}

func_def 
    -> "function" _lb %id _lb "(" _lb (param_list):? _lb ")" func_body
    {%
        (data)=>{
                return { 
                    type: "func_def",
                    func_name: data[2],
                    params: data[6]? data[6][0] : [],
                    body: data[9]
                }
        }
    %}

func_body
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

arg_list 
    -> %expr (_lb "," _lb %expr):*
        {%
        (data)=>{
            const arrayExpr = data[1]
            const expressions = arrayExpr.map(parts=>parts[3])
            return [data[0], ...expressions]   
        }
        %}

param_list 
    -> %id (_lb "," _lb %id):*
        {%
        (data)=>{
            const arrayId = data[1]
            const ids = arrayId.map(parts=>parts[3])
            return [data[0], ...ids]
        }
        %}