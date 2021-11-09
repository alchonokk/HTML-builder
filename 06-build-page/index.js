const { readdir }= require('fs/promises');
const path = require('path');
const dirr=path.join(__dirname,'styles')
const dirr1=path.join(__dirname,'project-dist','style.css')
const dirr2=path.join(__dirname,'project-dist','index.html')

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
        // console.log(file.name);  
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
