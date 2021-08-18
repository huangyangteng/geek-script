#!/usr/bin/env node
const shell=require('shelljs')
const fs=require('fs')

var [nodeEnv,dir,...args]=process.argv
if(args.length==0){
    console.log('error:parameters are missing')
    return
}
let DIR=args[0]
shell.mkdir(DIR)
shell.cd(DIR)
shell.touch('contents.md')
shell.touch('data.js')

fs.writeFile('data.js',`module.exports={ 
    "chapters":[], 
    "articles":[] 
}`,(err)=>{
    if(err){
        console.log(err)
    }
})