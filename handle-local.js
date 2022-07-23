const fs=require('fs')
const path=require('path');
const {uid,walkSync} =require('./tools') ;

function getLast(path){
    return path.split('/').pop()

}



var [nodeEnv,dir,...args]=process.argv
// 使用方式  node handle-local.js 
if(args.length==0){
    console.log('error:parameters are missing')
    return
}
const COLUMN_HOME=args[0]
const HTML_DIR=COLUMN_HOME+'/html/'
const DATA_DIR=COLUMN_HOME+'/data/data.js'


const currentDirPath=HTML_DIR

let contents=[]
fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if(stat.isDirectory()){
        let contentItem={
            id:uid(),
            title:getLast(filePath),
            subList:[]
        }
        // 二层循环，循环HTML
        fs.readdirSync(filePath).forEach(function(fileName){
            const src=filePath+'/'+fileName
            let article={
                id:uid(),
                title:fileName,
                src:src,
                audio:''
            }
            contentItem.subList.push(article)
        })
        contents.push(contentItem)
    }
});
// ---------- 写入
const columnInfo=require(DATA_DIR)
const column={
    ...columnInfo,
    contents
}
fs.writeFile(`./${COLUMN_HOME}/data/contents.md`,JSON.stringify(column,null,4),(err)=>{
    if(err){
        console.log(err)
    }
    console.log('succeed!')
})