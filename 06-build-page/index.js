const { readdir }= require('fs/promises');
const path = require('path');
const dirr=path.join(__dirname,'styles')
const dirr1=path.join(__dirname,'project-dist','style.css')
const dirr2=path.join(__dirname,'project-dist','index.html')
const { copyFile }= require('fs/promises');

const fs1 = require('fs');
const fs = require('fs').promises;
fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

const outfile = fs1.createWriteStream(dirr1,'utf-8');
const outfilehtml = fs1.createWriteStream(dirr2,'utf-8');

const copyStyle = async () => {
try { 
  const files = await readdir(dirr,{withFileTypes: true});
  for (const file of files){
  if (file.isFile()) {
    let extn=path.extname(file.name);
    
    if (extn ==='.css'){
        const readfile=fs1.createReadStream(path.join(dirr,file.name), 'utf-8')
        readfile.pipe(outfile);
         
    } 
} 
}
} catch (err) {
  console.error(err);
}
}
copyStyle();

const dirrComponents=path.join(__dirname,'components')
const doHTML = async () => {
  try { 
    const files = await readdir(dirrComponents,{withFileTypes: true});
    fs1.readFile(path.join(__dirname,'template.html'),'utf-8',function (err,contentHtml) {
      if (err) {
        return console.log(err, '43');
      }
      let str = contentHtml.toString();
      // console.log(str);
      for (const file of files)
      if (file.isFile()) {
        let extn=path.extname(file.name);
        let nameFile = path.basename(file.name,extn);
        if (extn==='.html'){
            
        let st='{{'+ nameFile +'}}';;
        
         fs1.readFile(path.join(dirrComponents, file.name),'utf-8',function (err,content) {
          if (err) {
            return console.log(err, '57');
          }
            const regexp = new RegExp(st);
            str=str.replace(regexp,content);
            fs1.writeFile(dirr2, str, function(err) {
                          if (err) {
                              return console.log(err);
                          } 
            })
          }) 
        }
      }
    })
  } 
  catch (err) {
      console.error(err);
  }   
}
doHTML();

fs.mkdir(path.join(__dirname,'project-dist','assets'), { recursive: true }, (err) => {
  if (err) throw err;
})

const dirr3=path.join(__dirname,'project-dist','assets');
const fromDirr3=path.join(__dirname,'assets');
  
const doCopyAssets = async (fromDirr3, dirr3) => {
    fs1.readdir(fromDirr3,{withFileTypes: true}, function (err,files) {
    if (err) {
      return console.log(err);
    }
    for (const file of files){
    
      if (file.isDirectory()) {
        fs.mkdir(path.join(dirr3, file.name), { recursive: true }, (err) => {
          if (err) {
            return console.log(err);
          }
        });
        doCopyAssets(path.join(fromDirr3, file.name), path.join(dirr3, file.name));
      } else{
        let from=path.join(fromDirr3,file.name);
        let to=path.join(dirr3,file.name);
        fs1.copyFile(from, to, (err) => {
          if (err) {
            return console.log(err);
          }
        });;
      }
    }
    })  
}
doCopyAssets(fromDirr3, dirr3)





// const toDel = async (dirrDel) => {
  
//   fs1.readdir(dirrDel,{withFileTypes: true}, function (err,files) {
//     if (err) {
//       return console.log(err);
//     }
//     for (const file of files){
    
//       if (file.isDirectory()) {
//         fs.rm(path.join(dirrDel,file.name),{ recursive: true, force: true }, function(err) {
//                 if (err) {
//                    throw err
//                 } 
//         });
//       } else{
//        fs.unlink(path.join(dirrDel,file.name));
//       }
//     }
// })  
  
// }
// toDel(dirr3).then (doCopyAssets(fromDirr3, dirr3));

// toDel(dirr3)




// const doSomething = async ()=> {
//   await toDel(dirr3);
//   doCopyAssets(fromDirr3, dirr3);
// }  
// doSomething()

// async function doSomething() {
//   await toDel(dirr3);
  
//   return Promise.all
//   // doCopyAssets(fromDirr3, dirr3);
// }  
// doSomething()

// doSomething().then (doCopyAssets(fromDirr3, dirr3));
// doCopyAssets(fromDirr3, dirr3);

