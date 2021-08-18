#!/usr/bin/env node
const shell=require('shelljs')
const uid =require('uid') ;
const fs=require('fs')
const chalk=require('chalk')

function error(log){
    console.log(chalk.red(log))
}
function blue(log){
    console.log(chalk.blue(log))
}

var [nodeEnv,dir,...args]=process.argv
if(args.length==0){
    console.log('error:parameters are missing')
    return
}
// 传入的路径
let COLUMN_HOME=args[0]
let BOOK={
    title:COLUMN_HOME, //标题
    id:uid(),      //id
    contents:[]  //目录
}
let dataPath= './'+COLUMN_HOME+'/data.js'
let sourceArticlePath='./'+COLUMN_HOME+'/html'



// 获取数据
let chapters=require(dataPath).chapters
let articles=require(dataPath).articles


let CONTENTS=[]

chapters.forEach(item=>{
    item.title=item.title.replace(/\s/g,'')

    let CONTENT_ITEM={id:uid(),title:item.title,subList:[]}

    let dir=`./${COLUMN_HOME}/${item.title}`
    // 生成目录
    shell.exec(`mkdir -p  ${COLUMN_HOME}/${item.title}`)

    // 找到当前目录对应的文章
    let cur=articles.filter(article=>article.chapter_id==item.id)
    let SUB_LIST=[]
    cur.forEach(chapterArticle=>{
        let curName=chapterArticle.article_title
       
        // ---- curName删除中文符号，删除空格
        curName=curName.replace(/[、|（()）?｜？——”“，/:： ]/g,'')
        curName=curName.slice(2)
        console.log("curName", curName)

        // 找到目标文件
        let output=shell.exec(`find ${sourceArticlePath} -name "*${curName}*"`)
        // 如果找到多个目标文件
        let arr=output.stdout.split('\n')
        if(arr.length>1){
            output.stdout=arr[0]
        }

        // 把目标文件复制到生成的目录中
        let tartgetName=output.stdout.replace('\n','')
        blue(tartgetName)
        console.log()
        if(tartgetName===''){
            error('-------------error,curName：'+curName+' outputName: '+output)
        }
        
        shell.exec(`cp ${tartgetName} ${dir}`)

        SUB_LIST.push({id:uid(),title:chapterArticle.article_title,src:tartgetName})
        // 根据这个curName 找到对应的文件，移动到对应的文件夹中
    })
    CONTENT_ITEM.subList=SUB_LIST
    CONTENTS.push(CONTENT_ITEM)

})
  

BOOK.contents=CONTENTS

fs.writeFile(`./${COLUMN_HOME}/contents.md`,JSON.stringify(BOOK,null,4),(err)=>{
    if(err){
        console.log(err)
    }
})