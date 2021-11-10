const fs = require('fs');
const path = require('path'); 
const outfile = fs.createWriteStream(path.join('02-write-file','yourtext.txt'),'utf-8', console.log('Please, write your message here'));
const { stdin, stdout } = require('process');
const readline = require('readline');
const rl = readline.createInterface({input:stdin, output:stdout });


rl.on('line', (line) => {
    if (line=== 'exit'){
        process.exit();
    } else {
        outfile.write(`${line}\n`);
    }   
})

process.on('exit', () => {
      console.log('Goodbye!');
});

process.on('SIGINT', () => {
    console.log('Goodbye!');
    process.exit();
});