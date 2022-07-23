const {getArticles,getColumnInfo}=require('./geekApi')
const fs=require('fs')
function formatAudio(list){
    return list.map(item=>{
        const {audio_time,audio_download_url,audio_md5,audio_title,audio_url,id,audio_time_arr}=item

        return {
            id,
            url:audio_url,
            downloadUrl:audio_download_url,
            title:audio_title,
            duration:audio_time,
            md5:audio_md5
        }
    })
}
;(async()=>{
    //[{cid:'',title:'',audios:[]}]
    const cids=[
    "446",
    "320",
    "252",
    "416",
    "100031001",
    "100023201",
    "100033601",
    "100048001",
    "468",
    "100026001",
    "100017301",
    "347",
    "100024701",
    "411",
    "100007101",
    "100029001",
    "143",
    "327",
    "100034101",
    "314",
    "100023701",
    "436",
    "450",
    "403",
    "100023401",
    "245",
    "100064501",
    "100052201",
    "398",
    "100015201",
    "100029501",
    "100020801",
    "100039001",
    "432",
    "382",
    "455",
    "81",
    "321",
    "100002601",
    "100012001",
    "457",
    "458",
    "207",
    "415",
    "429",
    "419",
    "420",
    "426",
    "100020001",
    "100051901",
    "100043001",
    "357",
    "306",
    "389",
    "356",
    "326",
    "424",
    "350",
    "324",
    "316",
    "100002201",
    "100012101",
    "100022301"
]
    let arr=[]
    const cidList=cids
    for(let i=0;i<cidList.length;i++){
        let cid=cidList[i]
        let title=(await getColumnInfo(cid)).data.title
        let audios=formatAudio((await getArticles(cid)).data)
        let obj={
            cid,
            title,
            audios
        }
        arr.push(obj)
    }
    fs.writeFileSync('audios.json',JSON.stringify(arr,null,4))
})()