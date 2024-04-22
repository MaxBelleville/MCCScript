
const moo = require('moo');
const fs =require('fs/promises');
const lexer = moo.compile({
    WS:      /[ \t]+/,
    comment: /\/\/.*?$/,
    number:  {match: /0|[1-9][0-9]*/, value: (str)=>Number(str)},
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:  '(',
    rparen:  ')',
    lcurrly:  '{',
    rcurrly:  '}',
    lbrack:  '[',
    rbrack:  ']',
    nequals: '!=',
    lequals: '<=',
    gequals: '>=',
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
    null: {match:['none','None','null','NULL'],value:0},
    true: {match:['True','true'],value:1},
    false: {match:['False','false'],value:0},
    built_ins:['print','pow','sqrt','acos','abs','acosh','asin','asinh','atan','atan2','atanh','cbrt',
    'ceil','cos','cosh','exp','floor','hypot','log','log10','max','min','round','sin','sinh','tan','tanh',
    'fact','uuid'],
    keyword: 
    [
      'for', 'dir', 'desc', 'in', 'end', 'not', 'and', 'or', 'to', 'by', 'import',
      'namespace', 'with', 'macros',
      'at', 'as', 'on', 'facing', 'rotated', 'align', 'here', 'the_end', 'the_nether', 'overworld',
      'move', 'create', 'tell', 'title', 'subtitle', 'actionbar',
      'reset', 'clock', 'function', 'if', 'unless', 'then', 'do', 'else', 'switch', 'case', 'default',
      'return', 'while', 'macro', 'block', 'block_data', 'block_tag', 'entity_tag', 'item_tag', 'define', 'array', 'remove', 'success', 'result',
    'shaped', 'recipe', 'keys', 'eyes', 'feet',	'advancement', 'loot_table', 'predicate',
    'push', 'pop'
    ],
    id: /[a-zA-Z][a-zA-Z_0-9]*/,
    NL:      { match: /\n/, lineBreaks: true },
  })

//   async function main(){
//     const filename = process.argv[2];
//     if (!filename) {
//         console.log("No file name present, please provide a .mccscript file");
//         return;
//     }
//     const code = (await fs.readFile(filename)).toString();

//     lexer.reset(code)
//     for(var line of lexer){
//       console.log(line);
//     }

// }
// main().catch(err=>console.log(err.stack));

module.exports=lexer;