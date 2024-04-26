
const moo = require('moo');
const fs =require('fs/promises');
const lexer = moo.compile({
    WS:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  {match: /0|[1-9][0-9]*/, value: (str)=>Number(str)},
    string:  {match:/"(?:\\["\\]|[^\n"\\])*"/, value: (str)=>str.replaceAll("\"","")},
    null: {match:['none','None','null','NULL'],value:0},
    true: {match:['True','true'],value:1},
    false: {match:['False','false'],value:0},
    built_ins:['print','pow','sqrt','acos','abs','acosh','asin','asinh','atan','atan2','atanh','cbrt',
    'ceil','cos','cosh','exp','floor','hypot','log','log10','max','min','round','sin','sinh','tan','tanh',
    'fact','uuid'],
    conditional_keywords: [
      'if', 'else', 'switch', 'case'
    ],
    conditional_args: [
      'and', 'not', 'or', 'default', 'break'
    ],
    looping_keywords: [
      'for', 'while', 'do-while', 'of',
    ],
    functional_keywords: [
      'function', 'return'
    ],
    datapack_keywords: [
        'load', 'tick', '-dir','-directory','-version','-ver', '-namespace', 
        '@datapack', '-desc', '-description', '-ns', '-t','-title'
    ],
    import_keywords: [
      '@import',
    ],
    lparen:  '(',
    rparen:  ')',
    lcurrly:  '{',
    rcurrly:  '}',
    lbrack:  '[',
    rbrack:  ']',
    nequals: '!=',
    lequals: '<=',
    gequals: '>=',
    arrow: '=>',
    dequals: '/=',
    sequals: '-=',
    aequals: '+=',
    tequals: '*=',
    mequals: '%=',
    dollar: '$',
    at: '@',
    comma: ',',
    equals: '=',
    divide: '/',
    dot: '.',
    colon: ':',
    semicolon: ';',
    addadd: '++',
    subsub: '--',
    mod: '%',
    add: '+',
    subtract: '-',
    times: '*',
    gthan: '>',
    ref: '&',
    lthan: '<',
    not: '!',
    keyword: 
    [
      'in', 'end', 'to', 'by',  'namespace', 'with', 'macros', 'at', 'as', 'on', 
      'facing', 'rotated', 'align', 'here', 'the_end', 'the_nether', 'overworld', 'move', 
      'create', 'tell', 'title', 'subtitle', 'actionbar', 'reset', 'clock', 'do', 'macro', 
      'block', 'block_data', 'block_tag', 'entity_tag', 'item_tag', 'define', 'array', 'remove', 
      'success', 'result', 'shaped', 'recipe', 'keys', 'eyes', 'feet',	'advancement', 'loot_table', 
      'predicate', 'push', 'pop'
    ],
    NL:      { match: /\n/, lineBreaks: true },
    id: /[a-zA-Z][a-zA-Z_0-9]*/,
  })


module.exports=lexer;