
const moo = require('moo');
const fs =require('fs/promises');
const { relative } = require('path');
const lexer = moo.compile({
    WS:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  {match: /0|[1-9][0-9]*/, value: (str)=>Number(str)},
    string:  {match:/"(?:\\["\\]|[^\n"\\])*"/, value: (str)=>str.replaceAll("\"","")},
    cond_keywords: [
      'if', 'else', 'switch', 'case', 'default', 'break'
    ],
    null: {match:['none','None','null','NULL'],value:0},
    true: {match:['True','true'],value:1},
    false: {match:['False','false'],value:0},
    built_ins:['print','pow','sqrt','acos','abs','acosh','asin','asinh','atan','atan2','atanh','cbrt',
    'ceil','cos','cosh','exp','floor','hypot','log','log10','max','min','round','sin','sinh','tan','tanh',
    'fact','uuid'],
    cond_and: [
      'and', '&'
    ],
    cond_or: [
      'or', '|'
    ],
    cond_not: [
      'not', '!'
    ],
    loop_keywords: [
      'for', 'while', 'do', 'in',
    ],
    func_keywords: [
      'function', 'return'
    ],
    datapack_keywords: [
        'load', 'tick', '-dir','-directory','-version','-ver', '-namespace', 
        '@datapack', '-desc', '-description', '-ns', '-t','-title'
    ],
    import_keywords: [
      '@import',
    ],
    locators: [
      '@a', '@e', '@p', '@s', '@n'
    ],
    lparen:  '(',
    rparen:  ')',
    lcurrly:  '{',
    rcurrly:  '}',
    lbrack:  '[',
    rbrack:  ']',
    arrow: '=>',
    dequals: '/=',
    sequals: '-=',
    aequals: '+=',
    tequals: '*=',
    mequals: '%=',
    dollar: '$',
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
    ref: '&',
    tag: '#',
    relative: '~',
    positional: '^',
    cond_symbols: [
      '!=', '<=', '>=', '>', '<'
    ],
    keyword: 
    [
      'in', 'end', 'to', 'by',  'namespace', 'with', 'macros', 'at', 'as', 'on', 
      'facing', 'rotated', 'align', 'here', 'the_end', 'the_nether', 'overworld', 'move', 
      'create', 'tell', 'title', 'subtitle', 'actionbar', 'reset', 'clock', 'macro', 
      'block', 'block_data', 'block_tag', 'entity_tag', 'item_tag', 'define', 'array', 'remove', 
      'success', 'result', 'shaped', 'recipe', 'keys', 'eyes', 'feet',	'advancement', 'loot_table', 
      'predicate', 'push', 'pop','score', 'entity'
    ],
    NL:      { match: /\n/, lineBreaks: true },
    id: /[a-zA-Z][a-zA-Z_0-9]*/,
  })


module.exports=lexer;