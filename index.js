class ReadHistroy{
    //-------- 阅读文章    
    static saveCurRead(columnId,articleId){//保存当前阅读的文章  专栏:文章
        let history=localStorage.getItem('gk-history') || {}
        if(typeof history=='string'){
            history=JSON.parse(history)
        }
        history[columnId]=articleId
        localStorage.setItem('gk-history',JSON.stringify(history))
    }
    static getLastRead(columnId){//获取上次阅读的文章 

        let history=localStorage.getItem('gk-history')
        if(!history){return null}

        history=JSON.parse(history)
        return history[columnId]
       
    }
    // -------- 阅读专栏
    static saveCurColumnId(id){// 保存当前阅读的专栏
        localStorage.setItem('gk-lastread-column',id)
    }
    static getLastColumnId(){//获取当前阅读的专栏
        return localStorage.getItem('gk-lastread-column')
    }
    // ---------阅读位置 文章：阅读位置
    static saveCurReadingPostion(){//保存当前阅读的位置

    }
    static getLastReadingPostion(){//获取上次阅读位置

    }

}

function uid(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

new Vue({
    el:"#app",
    data:{
        isFold:true,
        contentsList:[],
        content:'',
        columnList:[],
        curColumnId:'chongxueqianduan',
        activeArticleId:'',
        noHistory:false,
        isDrakTheme:false,
        navIsShow:true,
        loading:false,
        uniqueOpened:true,
        showOutline:true,
        // 图片点击预览
        previewImg:{
            show:false,
            width:'30%',
            src:'',
            showClose:false,
        },
        // 大纲
        outlineList:[]
    },
    computed:{
        curTitle(){//当前专栏标题
            let cur=this.columnList.find(item=>item.id==this.curColumnId)
            if(cur){
                return cur.title
            }else{
                return 'loading'
            }
        },
        isFullScreen(){
            return !this.navIsShow && !this.isFold
        },
        
    },
    methods:{
        fullScreen(){
            // 全屏阅读
            this.isFold=false
            this.navIsShow=false
        },
        notFullScreen(){
            this.isFold=true
            this.navIsShow=true
        },
        saveHistory(){
            ReadHistroy.saveCurRead(this.curColumnId,this.activeArticleId)
        },
        updateActiveArticle(id){
            // 记录当前阅读的文章
            this.activeArticleId=id
        },
        // 左侧菜单选中文章
        selectArticle(id,arr){
            // 选中时，更新历史记录
        
            this.updateActiveArticle(id)
            this.getAriticle(id)
            
        },
        // 获取文章内容
        getAriticle(id){
            let src=''
            try {
              src=this.getAriticleSrcById(id)
            } catch (error) {
                return 
            }
           if(src=='')return
            this.saveHistory()
            this.loading=true
            
            // 获取文章内容
            // 防止某些课程使用相对路径会发生bug
            if(location.hostname=='localhost' || location.hostname=='127.0.0.1'){
                src='http://127.0.0.1:5502/0425geektime/'+src.replace('./','')
            }else{
                src='http://111.229.14.189/'+src.replace('./','')
            }
            fetch(src)
            .then((response)=>{
              return response.text()
            })
            .then((data)=>{
                // 去除水印
                data=data.replace('<p class="x">更多课程请加QQ群170701297</p>','').replace('<p class="x">所有最新极客时间课程请加QQ群170701297</p>','')
                this.content=data
                this.loading=false

                document.querySelector('.article-wrapper').scrollTop=0
                let pathName=''
                if(location.pathname=='/'){//部署环境

                }else{
                    pathName=location.pathname.split('/').pop()
                }
                try {
                    history.pushState({},pathName,`?article=${id}`)
                    
                } catch (error) {
                    
                }

                this.$nextTick(()=>{
                    this.generateOutline()
                    this.polyfillPage()
                })
            })
        },
        polyfillPage(){
            try {
                document.querySelector('._50pDbNcP_0').previousElementSibling.remove()
                
            } catch (error) {
                
            }
        },
        // 选中某个专栏
        selectColumn(){
            // 1. 获取select当前选中的专栏
            let curColumn=this.columnList.find(item=>item.id==this.curColumnId)
            if(!curColumn){
                return 
            }
            
            //2. 获取专栏目录
            this.contentsList=curColumn.contents
            //3.加载文章内容

            // 如果没有历史记录,默认取第一篇文章的id
            if(this.noHistory){
                this.updateActiveArticle(this.contentsList[0].subList[0].id)
            }
            this.getAriticle(this.activeArticleId)
            
            
        },
        changeColumn(columnId){
            this.curColumnId=columnId
            // 选择另一个专栏
            let curColumn=this.columnList.find(item=>item.id==this.curColumnId)

            this.contentsList=curColumn.contents
            
            let historyArticleId=ReadHistroy.getLastRead(this.curColumnId)
            if(historyArticleId){
                this.updateActiveArticle(historyArticleId)
            }else{
                this.updateActiveArticle(this.contentsList[0].subList[0].id)
            }
            this.getAriticle(this.activeArticleId)
        },
       
         // 获取所有专栏
        async fetchColumnList(){
            let res=await fetch('./book.json')
            this.columnList=await res.json()
            
            this.selectColumn()
        },


        changeFold(){
            this.isFold=!this.isFold
        },
        getAriticleSrcById(id){
            let tmp=this.contentsList.map(item=>item.subList)
            let listAll=tmp.reduce((prev,next)=>{
                return prev.concat(next)
            })
            let cur=listAll.find(item=>item.id==id)
            return cur.src
        },
        handleCommand(command){
        console.log("handleCommand -> command", command)

        },
        outlineClassObj(item){
            if(item.tag=='H2'){
                return {'outline-h2':true}
            }else if(item.tag=='H3'){
                return {'outline-h3':true}
            }else if(item.tag=='H1'){
                return {'outline-h1':true}
            }
        },
        jumpToTitle(item){
            // window.location.hash=item.id
            let wrapper=document.querySelector('.article-wrapper')
            let cur=document.getElementById(item.id) 
            wrapper.scrollTop=cur.offsetTop -96
        },
        toggleOutline(){
            console.log('toggle outline')
            this.showOutline=!this.showOutline
        },
        generateOutline(){
            let wrapper=document.querySelector('.article-wrapper')
            let childrens=wrapper.getElementsByTagName('*')
                let treeArray=[]

                for (let i = 0; i < childrens.length - 1; i++) {
                    let nodeName = childrens[i].nodeName;
                    if (nodeName=='H1' || nodeName == "H2" || nodeName == "H3") {
                        childrens[i].id=uid()
                      treeArray.push({
                        id: childrens[i].id,
                        name: childrens[i].innerText,
                        tag: childrens[i].nodeName,
                        top:childrens[i].offsetTop
                      });
                    }
                  }
                  this.outlineList=treeArray
        },
        watchTipVideo(){
            window.open("./demo.mp4",'_blank')
        }
    },
    mounted(){
        window.addEventListener('beforeunload',()=>{
            ReadHistroy.saveCurColumnId(this.curColumnId)
        })
        let lastColumnId=ReadHistroy.getLastColumnId()
        if(lastColumnId){
            this.curColumnId=lastColumnId
        }
        // 进入页面时，判断历史记录中有没有东西，有的话从历史记录中加载内容
        let historyArticleId=ReadHistroy.getLastRead(this.curColumnId)
        if(historyArticleId){
            this.updateActiveArticle(historyArticleId)
            this.noHistory=false
        }else{
            this.noHistory=true
        }
        // this.getcolumnList()
        this.fetchColumnList()

        // 图片点击预览
        window.addEventListener('click',(e)=>{
            let target=e.target
            
            if(target.nodeName=='IMG'){
                this.previewImg.src=target.src
                this.previewImg.width=target.naturalWidth +'px'
                this.previewImg.show=true
            }
          
        })
        // 浏览器前进与后退
        window.addEventListener("popstate", ()=> {
            console.log('hahah')
            // let articleId=location.search.split('=').pop()
            // this.getAriticle(articleId)
        });
    },
    
})