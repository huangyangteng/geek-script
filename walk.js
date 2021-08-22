#!/usr/bin/env node
const shell=require('shelljs')
const uid =require('uid') ;
const fs=require('fs')
const chalk=require('chalk')
const path=require('path');
// const compressHtml = require('./compressHtml');
function error(log){
    console.log(chalk.red(log))
}
function blue(log){
    console.log(chalk.blue(log))
}
function getExt(name){
    return name.split('.').pop().toLowerCase()
}
function formatFileName(name){
    name=name.replace('_For_group_share','')
    return name.replace(/[丨！》《\-、|（()）?｜？——”“，/:： ]/g,'')
}
function formatAudioName(name){
    let output=name.split('.')[0]+'.mp3'
    return output
}
function getBitrate(output){
    let reg=/bitrate:\s*([0-9]*)\s*kb\/s/
    let res=reg.exec(output)
    return Number(res[1])
}
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
/**
 * 对当前目录下的文件进行重命名
 */
function handleRename(){
    shell.ls().forEach(oldName=>{
        // 不对目录进行处理
        if(!oldName.includes('.'))return 
        let newName=formatFileName(oldName)
        console.log("renameFiles -> newName", newName)
        // 如果名字相同，直接返回
        if(oldName==newName)return 
        shell.exec(`mv "${oldName}" ${newName}`,(code,stdout,stderr)=>{
            if(code!==0){
                console.log(oldName)
            }
        })
    })
}
/**
 * 从find命令的输出中返回文件的src
 * @param {*} output 
 * @param {*} errorScript 
 */
function getFileSrc(output,errorScript){
    // 情况1：如果找到多个目标文件，取第一个
    let arr=output.stdout.split('\n')
    if(arr.length>1){
        output.stdout=arr[0]
    }
    let src=output.stdout.replace('\n','')
    blue(src)
    // 情况2：文件不存在
    if(src==''){
        error('----err,curName:'+errorScript)
    }
    return src
}
//压缩HTML
function compressHtml(filePath,outputPath){
    const matchImgReg = /<img(\sclass="[\w-]*")?(\s+alt="unpreview")?\s+data-savepage-src="([\w:./\d]*)"[\s\S]*?>/gi
    const matchHeadReg = /<head>[\s\S]*?<\/head>/
    const matchSvgReg = /<svg [\s\S]*?<\/svg>/
    const matchScriptReg=/<script([\s\S]*?)<\/script>/g
    const matachIframeReg=/<iframe([\s\S]*?)<\/iframe>/
    const matchAudioReg=/<audio([\s\S]*?)<\/audio>/
    if(!outputPath)outputPath=filePath
    fs.readFile(filePath, (error, data) => {
        if (error) {
            console.log(error)
            return
        }
        let str = data.toString()
        let res = str
            .replace(matchImgReg, '<img src="$3">')
            // .replace(matchHeadReg, '<head></head>')
            .replace(matchSvgReg, '')
            .replace(matchScriptReg,'')
            .replace(matachIframeReg,'')
            .replace(matchAudioReg,'')
        fs.writeFileSync(outputPath, res, (error) => {
            if (error) {
                console.log(error)
            }
        })
    })
}

function getArticleId(str){
    console.log("getArticleId -> str", str)
    const reg=/__(\d+)__/g
    return reg.exec(str)[1]
}
let FileProcessor={
    renameFiles(){
        // 统一重命名
        handleRename()
        shell.cd('./html')
        handleRename()
        shell.cd('../')
        shell.cd('./audio')
        handleRename()
        shell.cd('../')

    },
    clearUpFiles(){
        // 删除pdf文件
        shell.ls().forEach(item=>{
            if(getExt(item)=='pdf'){
                console.log('delete:',item)
                shell.exec(`rm ${__DIR+'/'+item}`)
            }
        })
        // 把所有的html移入html文件夹
        shell.exec(`mv *.html ${__HTML_DIR}`,{silent:true})
        // 把所有的音频引入audio文件夹
        shell.exec(`mv *.m4a ${__AUDIO_DIR}`,{silent:true})
        shell.exec(`mv *.mp3 ${__AUDIO_DIR}`,{silent:true})

    },
    handleAudio(){//压缩音频比特率
        shell.cd(__AUDIO_DIR)
        shell.ls().forEach(item=>{
            if(getExt(item)=='mp3')return 
            let output=formatAudioName(item)
            shell.exec(`ffmpeg -i ${item} -map 0:a:0 -b:a 32k ${output}`)
        })
        shell.exec(`rm *.m4a`)
        shell.cd('../')
    },
    handleHtml(){//压缩HTML文件
        shell.cd(__HTML_DIR)
        
        shell.ls().forEach(item=>{
            if(getExt(item)=='html'){
                compressHtml(item)
            }
        })
        shell.cd('../')

    },
    handleData(chapters,allArticles){
        // 文件列表
        let fileList=[]
        walkSync(__HTML_DIR_RE_RELATIVE,(file)=>{fileList.push(file)})
        let CONTENTS=[]

        chapters.forEach(chapter=>{
            chapter.title=chapter.title.replace(/\s/g,'')
            let chapterArticles=allArticles.filter(article=>article.chapter_id==chapter.id)
            let SUB_LIST=[]
            // 文章循环
            chapterArticles.forEach(article=>{
                let curName= formatFileName(article.article_title)
                curName=curName.slice(2)
                // 找到目标html
                // const FIND_HTML_SCRIPT=`find ${__HTML_DIR_RE_RELATIVE} -name "*${curName}*"`
                // const FIND_AUDIO_SCRIPT=`find ${__AUDIO_DIR_RE_RELATIVE} -name "*${curName}*"`
                // let htmlOutput=shell.exec(FIND_HTML_SCRIPT)
                // let audioOutput=shell.exec(FIND_AUDIO_SCRIPT)
                // let targetHtmlFile=getFileSrc(htmlOutput,FIND_HTML_SCRIPT)
                // let targetAudioFile=getFileSrc(audioOutput,FIND_AUDIO_SCRIPT)
                // const targetHtmlFile=article.id
                const articleFile=fileList.find(src=> getArticleId(src)==article.id )
                console.log("handleData -> articleFile", articleFile)
                SUB_LIST.push({id:uid(),title:article.article_title,src:articleFile,audio:''})
            })
            CONTENTS.push({
                id:uid(),
                title:chapter.title,
                subList:SUB_LIST
            })
        })
        return CONTENTS
    },
    saveColumnData(contents){
        let COLUMN_INFO=Object.assign({},DATA_COLUMN,{
            title:args[0],
            id:uid(),
            contents  //目录
        })
        fs.writeFile(`./${COLUMN_HOME}/data/contents.md`,JSON.stringify(COLUMN_INFO,null,4),(err)=>{
            if(err){
                console.log(err)
            }
            blue('succeed!')
        })
    }
}
/**
 * -----------------------以下为主要逻辑
 */
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
const __AUDIO_DIR_RE_RELATIVE='./'+COLUMN_HOME+'/audio'

const {column:DATA_COLUMN,chapters:DATA_CHAPTERS,articles:DATA_ARTICLES}=require(__DATA_DIR)


// console.log("COLUMN_INFO", COLUMN_INFO)
// return 
//脚本使用方法： node walk.js 设计模式之美
;(function(){
    // 1. 新建目录
    shell.exec(`mkdir -p ${__HTML_DIR}`)
    shell.exec(`mkdir -p ${__AUDIO_DIR}`)
    // 进入目录
    shell.cd(__DIR)
    // 2. 统一重命名
    // FileProcessor.renameFiles()
    // 3.删除pdf文件
    // FileProcessor.clearUpFiles()
    // 4.处理音频
    // FileProcessor.handleAudio()
    // 5.压缩HTML
    // if(HTML_NEED_COMPRESS){
    //     console.log("HTML_NEED_COMPRESS", HTML_NEED_COMPRESS)
    //     FileProcessor.handleHtml()
    // }
    // 进入到shell脚本执行的目录
    shell.cd('../')
    // 5.处理数据
    let contents=FileProcessor.handleData(DATA_CHAPTERS,DATA_ARTICLES)
    // 写入文件
    FileProcessor.saveColumnData(contents)
}())
