// let list=[
//     {id:'000',title:'0开篇词+学习路线+架构图(3讲)',subList:[]},
//     {id:'001',title:'模块一：JavaScript(15讲)',subList:[]},
//     {id:'002',title:'模块二：HTML和CSS(16讲)',subList:[]},
//     {id:'003',title:'模块三：浏览器实现原理与API(9讲)',subList:[]},
//     {id:'004',title:'模块四：前端综合应用(5讲)',subList:[]},
//     {id:'005',title:'5特别加餐',subList:[]},
// ]



function handleBook(str,unit){
    let arr=str.split(/\n/)
    let arr2=arr.map(item=>{
        return {id:uuid(),src:item,title:getTitle(item)}
    })
    console.log("handleBook -> arr2", arr2)
    unit.forEach(item=>{
        let cur=arr2.filter(sub=>sub.src.includes(item.title))
        item.subList=cur
    })
    return unit
}

function getTitle(str){
    let arr=str.split('/')
    let res=arr.pop()
    return res.replace(/\.\w*/,'').replace(/[0-9][0-9]-/,'')
}

function uuid(length, chars) {
    chars =
        chars ||
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    length = length || 16
    var result = ''
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}


// --------------------------------------------

let unit=[
    {id:'wanzhuanvscode11',title:'全部文章',subList:[]},
]
let str=`玩转vscode/全部文章/01讲学编辑器，到底应该学什么.html
玩转vscode/全部文章/02讲VSCode的Why、How和What.html
玩转vscode/全部文章/03讲如何快速上手VSCode.html
玩转vscode/全部文章/04讲 如何做到双手不离键盘.html
玩转vscode/全部文章/05讲快捷键进阶攻略.html
玩转vscode/全部文章/06讲拒绝重复，你一定要学会的多光标特性.html
玩转vscode/全部文章/07讲如何快速在文件、符号、代码之间跳转(1).html
玩转vscode/全部文章/08讲玩转鼠标操作.html
玩转vscode/全部文章/09讲代码自动补全、快速修复和重构的二三事.html
玩转vscode/全部文章/10讲拒绝重复，你的代码百宝箱：如何书写codesnippet.html
玩转vscode/全部文章/11讲一定要用好代码折叠、小地图和面包屑特性.html
玩转vscode/全部文章/12讲极速搜索有时候比Intellisense还重要.html
玩转vscode/全部文章/13讲优化你的编辑器设置.html
玩转vscode/全部文章/14讲什么是工作台和命令面板.html
玩转vscode/全部文章/15讲了解文件管理，什么是multi-rootworkspace.html
玩转vscode/全部文章/16讲怎么在编辑器里做好版本管理.html
玩转vscode/全部文章/17讲如何配置终端模拟器，告别系统终端.html
玩转vscode/全部文章/18讲为你的项目打造Workflow（上）.html
玩转vscode/全部文章/19讲为你的项目打造Workflow（下）.html
玩转vscode/全部文章/20讲聊debugger时，我们在聊什么.html
玩转vscode/全部文章/21讲你不知道的工作区快捷键.html
玩转vscode/全部文章/22讲基于自然语言或者纯文本的设置界面，总有一款适合你.html
玩转vscode/全部文章/23讲基础语言支持：JSON、Markdown.html
玩转vscode/全部文章/24讲前端语言支持：JavaScript和Node.js.html
玩转vscode/全部文章/25讲后端语言支持（一）：Go、Java.html
玩转vscode/全部文章/26讲后端语言支持（二）：Python、C#.html
玩转vscode/全部文章/27讲HTML、CSS以及前端开发神器Emmet介绍与支持.html
玩转vscode/全部文章/28讲如何深度定制自己的主题.html
玩转vscode/全部文章/29讲不错的插件推荐.html
玩转vscode/全部文章/30讲如何在VSCode中配置、部署和调试Docker.html
玩转vscode/全部文章/31讲一些你可能不知道的Tips&Tricks.html
玩转vscode/全部文章/32讲插件开发（一）：why、how和what.html
玩转vscode/全部文章/33讲插件开发（二）：编写编辑器快捷键及分享快捷键配置、代码片段、主题等.html
玩转vscode/全部文章/34讲插件开发（三）：自定义语言支持.html
玩转vscode/全部文章/35讲插件开发（四）：Decorations装饰器.html
玩转vscode/全部文章/36讲插件开发（五）：工作台相关API.html
玩转vscode/全部文章/37讲插件开发（六）：VSCode插件维护和发布要点.html
玩转vscode/全部文章/结束语讲学编辑器，究竟学了什么.html
玩转vscode/全部文章/开篇词讲玩转编辑器，向高效能编程再进一步.html`




let result=handleBook(str,unit)
console.log("result", JSON.stringify(result))