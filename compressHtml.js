#!/usr/bin/env node
const fs = require('fs')
const shell=require('shelljs')


function compressHtml(filePath,outputPath){
    const matchImgReg = /<img(\sclass="[\w-]*")?(\s+alt="unpreview")?\s+data-savepage-src="([\w:./\d]*)"[\s\S]*?>/gi
    const matchHeadReg = /<head>[\s\S]*?<\/head>/
    const matchSvgReg = /<svg [\s\S]*?<\/svg>/
    const matchScriptReg=/<script([\s\S]*?)<\/script>/g
    const matachIframeReg=/<iframe([\s\S]*?)<\/iframe>/
    const matchAudioReg=/<audio([\s\S]*?)<\/audio>/
    const matchBaseReg=/<base href="[\w:\/\.]*">/
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
            .replace(matchBaseReg,'')
        fs.writeFileSync(outputPath, res, (error) => {
            if (error) {
                console.log(error)
            }
        })
    })
}
// compressHtml('./test.html','./test_output.html')


shell.cd('./跟月影学可视化/html')
shell.ls().forEach(item=>{
    compressHtml(item)
})