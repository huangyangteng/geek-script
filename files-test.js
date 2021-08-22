const path=require('path')
const fs=require('fs')
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

;(function(){
    var [nodeEnv,dir,...args]=process.argv
    // 使用方式  node walk.js 白话法律
    if(args.length==0){
        console.log('error:parameters are missing')
        return
    }
    const COLUMN_HOME=args[0]
    const HTML_NEED_COMPRESS=args[1]
    // 绝对路径
    const __DIR=path.join(__dirname,COLUMN_HOME) //绝对路径  /user/base/xxx/设计模式之美
    const __HTML_DIR=__DIR+'/html'        
    const __AUDIO_DIR=__DIR+'/audio'
    const __DATA_DIR=__DIR+'/data/data.js'
    // 相对路径
    const __HTML_DIR_RE_RELATIVE='./'+COLUMN_HOME+'/html' 
    console.log("__HTML_DIR_RE_RELATIVE", __HTML_DIR_RE_RELATIVE)
    let list=[]
    walkSync(__HTML_DIR_RE_RELATIVE,(file)=>{list.push(file)})
    console.log(list)
}())