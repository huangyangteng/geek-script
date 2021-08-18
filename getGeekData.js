#!/usr/bin/env node
const shell = require('shelljs')
const fs = require('fs')
const chalk = require('chalk')

function error(log) {
    console.log(chalk.red(log))
}
function blue(log) {
    console.log(chalk.blue(log))
}
function deepCopy(obj){
    return  JSON.parse(JSON.stringify(obj))

}
var ResponseManage = {
    handleIntro(intro,cid,type) {
        blue('handle intro')
        let data=JSON.parse(intro).data
        return {
            id:'',
            type,
            cid,
            title:data.title,
            subTitle:data.subtitle,
            authorName:data.author.name,
            authorInfo:data.author.intro

        }
    },
    handleChapters(chapters){
        blue('handle chapters')
        return deepCopy(JSON.parse(chapters).data)
    },
    handleArticles(articles){
        blue('handle articles')
        return deepCopy(JSON.parse(articles).data.list)
    }
}

/**
 * 1.获取intro信息
 * 2.获取chapter信息
 * 3.获取article信息
 * 4. 最后一起写入
 */
;(function () {
    var [nodeEnv, dir, ...args] = process.argv
    if (args.length == 0) {
        console.log('error:parameters are missing')
        return
    }
    const COLUMN_ID = args[0]
    const COLUMN_TYPE=args[1]
    const { intro, chapters,articles } = require('./geekApi')
    let COLUMN = null
    let CHAPTERS = null
    let ARTICLES = null
    shell.exec(intro(COLUMN_ID),{silent:true}, (code, output, stderr) => {
        if (code == 0) {
            console.log("output", output)
            COLUMN=ResponseManage.handleIntro(output,COLUMN_ID,COLUMN_TYPE)
            console.log("COLUMN", COLUMN)
        }
    })
    shell.exec(chapters(COLUMN_ID),{silent:true},(code,output)=>{
       {
        CHAPTERS=ResponseManage.handleChapters(output)
        }
    })
    shell.exec(articles(COLUMN_ID),{silent:true},(code,output)=>{
        if(code==0){
            ARTICLES=ResponseManage.handleArticles(output)
        }
    })
    let timer=setInterval(()=>{
        if(COLUMN&&CHAPTERS&&ARTICLES){
            clearInterval(timer)
            console.log('done')

            let dataInfo=
            `module.exports={
                column:${JSON.stringify(COLUMN)},
                chapters:${JSON.stringify(CHAPTERS)},
                articles:${JSON.stringify(ARTICLES)}
            }`
            let {title}=COLUMN
            let dir=title+'/data'
            shell.exec(`mkdir -p ${dir}`)
            shell.cd(dir)
            shell.touch('contents.md')
            shell.touch('data.js')
            fs.writeFileSync('data.js',dataInfo)
            blue('succeed!')
            // 新建目录，把数据写入文件
        }
    },1000)
    
})()
