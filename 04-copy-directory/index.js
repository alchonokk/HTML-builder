const { copyFile }= require('fs/promises');
const { copyDir }= require('fs/promises');
// const constants = require('fs').promises;
const { readdir }= require('fs/promises');
const fs = require('fs').promises;
const path = require('path');
const dirr=path.join(__dirname,'files')
// const mkdir= require('fs/promises');
// console.log(dirr);
// console.log(path.join(__dirname,'files-copy'));





fs.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
});
const dirr1=path.join(__dirname,'files-copy');

// const doSomething1 = async () => {
//     try {
//       const files = await readdir(dirr);
//       for (const file of files){
//         console.log(file);
//         let from=path.join(dirr,file);
//         let to=path.join(dirr1,file);
//         await copyFile(from, to);
//       }
//         // console.log(file);
//     } catch (err) {
//       console.error(err);
//     }
//     }
// doSomething1()

const toDel = async () => {
    try { 
      const files = await readdir(dirr1,{withFileTypes: true});
    //   const files = await readdir(dirr1);
      for (const file of files){
        let delfile=path.join(dirr1,file.name);
        if (file.isFile()) {
          await fs.unlink(delfile);
        }
    
      }
    } catch (err) {
      console.error(err);
      
    }
    }
toDel();

const doSomething = async () => {
    try { 
    const files = await readdir(dirr,{withFileTypes: true});

      for (const file of files){
        let from=path.join(dirr,file.name);
        let to=path.join(dirr1,file.name);

        if (file.isFile()) {
        await copyFile(from, to);
        }
      }
    } catch (err) {
      console.error(err);
      
    }
}
doSomething();