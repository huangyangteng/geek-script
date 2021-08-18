//下载文件
function downloadFile(name, content) {
    if (typeof name == 'undefined') {
        throw new Error('The first parameter name is a must')
    }
    if (typeof content == 'undefined') {
        throw new Error('The second parameter content is a must')
    }
    if (!(content instanceof Blob)) {
        content = new Blob([content])
    }
    const link = URL.createObjectURL(content)
    download(link, name)
}
//下载一个链接
function download(link, name) {
    if (!name) {
        name = getFileName(link)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
function getNumber(s) {
    return s.replace(/[^0-9]/gi, '')
}
function toNextPage() {
    document.querySelector('.ArticlePC_nextBtn_1lgUy').click()
}
function getStyle() {
    const tmp = Array.from(document.querySelectorAll('style'))
        .filter((item) => item.getAttribute('data-jss') == '')
        .map((item) => item.innerText)
        .join('')
        .replace(/\n/g, '')
    return '<style>' + tmp + '</style>'
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
const downloadPage = async() => {
    console.log('download page')
    const articleId=location.href.split('/').pop()
    const body = document.querySelector('.ArticlePC_contentWidth_2zo6o')
        .innerHTML
    const title =
        document.querySelector('.ArticlePC_articleTitle_cZCVM').innerText +
        '.html'
    const content = getStyle() + body
    await sleep(3000)
    downloadFile(articleId+'_'+title, content)
    await sleep(3000)
  

}
;(function () {
    const total = getNumber(
        document.querySelector('.ArticlePC_info_2JNDR').innerText
    )
    const fn = async () => {
        for (let i = 0; i <= total; i++) {
            await downloadPage()
            toNextPage()
            if(i==total){//解决最后一个下载不了的bug
                downloadPage()
            }
        }
    }
    fn()

})()
