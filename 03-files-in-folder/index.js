const { readdir }= require('fs/promises');
const path = require('path');
const dirr=path.join(__dirname,'secret-folder')

// console.log(dirr);
const doSomething = async () => {
try { 
  const files = await readdir(dirr,{withFileTypes: true});
  for (const file of files)
  if (file.isFile()) {

    const fs = require('fs').promises;
    const way =path.join(dirr,file.name);
    const fileStats = await fs.stat(way);
    const fileSize= fileStats.size;

    let extn=path.extname(file.name);
    let nameFile = path.basename(file.name,extn);
    console.log(nameFile,'-',extn.split('.').pop(),'-',(fileSize),'b');
} 
} catch (err) {
  console.error(err);
}
}
doSomething();
