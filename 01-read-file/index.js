const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join('01-read-file','text.txt'),'utf-8');

stream.on('data', partData => console.log(partData.trim()));
