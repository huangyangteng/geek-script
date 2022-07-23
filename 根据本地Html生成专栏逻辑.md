# 根据本地的HTML生成专栏

专栏的结构：
```js
专栏名称
    data
        data.js //包含专栏的基本信息，需要自己写入
        contents.md //最后结果
    html  //所有的html
    
```
流程：
根据 html中的内容生成 contents
contents由一个个的章节构成，每一章下面有很多文章

```js
interface contentItem{
    id:string
    title:string //章节名称
    subList:[]  //文章
}
```
文章的结构
```js
interface Article{
    id:string
    title:string 
    src:'' //文章src  相对路径
    audio:''//文章的audio 
}
```