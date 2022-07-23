const shelljs=require('shelljs')
const COOKIE=`_ga=GA1.2.26199128.1538043642; LF_ID=1574409314502-5683520-9441526; MEIQIA_TRACK_ID=1QKTgXX5Qla09NvhTG7WrzFZEsP; MEIQIA_VISIT_ID=1XYvRx0w122IEmUm8Id7LkowkD4; GCID=d7125fe-e5f8041-65dd72a-7a6a11b; gksskpitn=96e9ee49-fede-421c-9622-6c75909d0d9d; _gid=GA1.2.454005409.1597753807; GRID=d7125fe-e5f8041-65dd72a-7a6a11b; GCESS=BQIE28o7XwYETuWXoQEIu0oPAAAAAAAIAQMHBLTK6yUEBAAvDQADBNvKO18LAgUADAEBCQEBCgQAAAAABQQAAAAA; acw_tc=2760778915978022751061226eeb5d9510b62bd0c54161bf142aabd2878777; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1597802367,1597802445,1597802505,1597802538; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1597802370,1597802445,1597802504,1597802538; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1597803598; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1597803598; _gat=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221002171%22%2C%22first_id%22%3A%221738f77938c3-0b9249c8b8f5bb-6b350e7e-2073600-1738f77938d6a4%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.dogedoge.com%2Fresults%3Fq%3D%25E6%259E%2581%25E5%25AE%25A2%25E6%2597%25B6%25E9%2597%25B4%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2Fdailylesson%22%2C%22%24latest_utm_source%22%3A%22time_web%22%2C%22%24latest_utm_medium%22%3A%22jiangtang%22%2C%22%24latest_utm_term%22%3A%22pc_interstitial_499%22%2C%22%24latest_utm_campaign%22%3A%22100057701%22%2C%22%24latest_utm_content%22%3A%22popups-a%22%7D%2C%22%24device_id%22%3A%221738f77938c3-0b9249c8b8f5bb-6b350e7e-2073600-1738f77938d6a4%22%7D; gk_process_ev={%22count%22:26%2C%22utime%22:1597754073923%2C%22referrer%22:%22https://time.geekbang.org/%22%2C%22target%22:%22%22}; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1597803601|1597802275`

const VIP_COOKIE=`_ga=GA1.2.873415359.1599804913; Hm_lvt_f83d162eeb1abea371d41d4b60d345db=1617802555; MEIQIA_TRACK_ID=1i0K2p0aUSChM9CTMchLl3RRFS2; 1i0K2p0aUSChM9CTMchLl3RRFS2=undefined; LF_ID=1631760123034-5934834-4703660; gksskpitn=14d8897a-c80b-48e9-b6a2-32495d327a81; GCID=fd5ff0f-eaff6c2-5f9b586-dbbf272; GRID=fd5ff0f-eaff6c2-5f9b586-dbbf272; _gid=GA1.2.1305285897.1643267271; GCESS=BgQEAC8NAAcEdeAiPQ0BAQoEAAAAAAgBAwUEAAAAAAwBAQEI8kssAAAAAAAJAQECBK5I8mEDBK5I8mELAgYABgSThkad; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1642487402,1642865298,1643267631,1643268273; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1643267542,1643267631,1643267924,1643268273; MEIQIA_VISIT_ID=24GzyPTlK36FohPNZtWMN0gw1YK; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222903026%22%2C%22first_id%22%3A%2217e9a669e39112f-07d463fd19810c-1d336253-2073600-17e9a669e3a10a6%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%2C%22%24latest_utm_source%22%3A%22geektime-app-discover-banner-1010%22%2C%22%24latest_utm_medium%22%3A%22menu%22%2C%22%24latest_utm_term%22%3A%22geektime-app-discover-banner-1010%22%2C%22%24latest_utm_campaign%22%3A%22timewebmenu%22%2C%22%24latest_utm_content%22%3A%22menu%22%7D%2C%22%24device_id%22%3A%22177f07a52fdd35-00d150e868c343-33647509-2073600-177f07a52fec4a%22%7D; _gat=1; gk_exp_uid=YmRmNmViNWRhNmQwYzNkNzdhNDQ4ODZlYmNmMjBkYWM=|1643284409666622237|fefc284f85456354d04b64caba4b061f5f1becac8e700493cb97bd8132b3270d; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1643284429; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1643284429; gk_process_ev={%22count%22:590%2C%22utime%22:1643268059188%2C%22referrer%22:%22https://time.geekbang.org/?utm_source=geektime-app-discover-banner-1010&utm_term=geektime-app-discover-banner-1010%22%2C%22target%22:%22%22%2C%22referrerTarget%22:%22%22}; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1643284460|1643284346`

const getColumnInfo=async(cid)=>{
    const url=`curl 'https://time.geekbang.org/serv/v3/column/info' \
    -H 'Connection: keep-alive' \
    -H 'Pragma: no-cache' \
    -H 'Cache-Control: no-cache' \
    -H 'sec-ch-ua: "Chromium";v="86", "\"Not\\A;Brand";v="99", "Google Chrome";v="86"' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4229.3 Safari/537.36' \
    -H 'Content-Type: application/json' \
    -H 'Origin: https://time.geekbang.org' \
    -H 'Sec-Fetch-Site: same-origin' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Referer: https://time.geekbang.org/column/intro/${cid}' \
    -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
    -H 'Cookie: ${COOKIE}' \
    --data-binary '{"product_id":${cid}}' \
    --compressed`
    let res=await shelljs.exec(url,{silent:true})
    if(res.code===0){
        res=JSON.parse(res.stdout) 
        return {
            code:0,
            data:res.data
        }
     }else{
         return {
             code:1,
             data:'获取数据失败'
         }
     }

}
/**
 * 
 * @returns 获取所有文章
 */
const getArticles=async(cid)=>{
    const request=await getChapterIds(cid)
    let chapterIds=null
    if(request.code===0){
        chapterIds=request.data
        console.log('chapterIds',chapterIds)
    }
   
    const url=`
    curl 'https://time.geekbang.org/serv/v1/column/articles' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'Origin: https://time.geekbang.org' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://time.geekbang.org/column/article/397646' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
  -H 'Cookie: ${VIP_COOKIE}' \
  --data-raw '{"cid":${cid},"size":100,"prev":0,"order":"earliest","sample":false,"chapter_ids":${JSON.stringify(chapterIds)}}' \
  --compressed
`
  let res=await shelljs.exec(url,{silent:true})
  if(res.code===0){
       res=JSON.parse(res.stdout) 
       return {
           code:0,
           data:res.data.list
       }
    }else{
        return {
            code:1,
            data:'获取数据失败'
        }
    }
  

}


/**
 * 获取章节ids
 * @param {Number} cid 
 * @returns 
 */
const getChapterIds=async(cid)=>{
    console.log('cid',cid)
    const url=`
    curl 'https://time.geekbang.org/serv/v1/chapters' \
    -H 'Connection: keep-alive' \
    -H 'Pragma: no-cache' \
    -H 'Cache-Control: no-cache' \
    -H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'Origin: https://time.geekbang.org' \
    -H 'Sec-Fetch-Site: same-origin' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Referer: https://time.geekbang.org/column/article/397646' \
    -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
    -H 'Cookie: ${VIP_COOKIE}' \
    --data-raw '{"cid":${cid}}' \
    --compressed
    `
    let res=await shelljs.exec(url,{silent:true})
    if(res.code===0){
        res=JSON.parse(res.stdout) 
        return {
            code:0,
            data:res.data.map(item=>item.id)
        }
     }else{
         return {
             code:1,
             data:'获取数据失败'
         }
     }
}

module.exports={
    getColumnInfo,
    getArticles,
    getChapterIds,
    intro(cid){
        return `curl 'https://time.geekbang.org/serv/v3/column/info' \
        -H 'Connection: keep-alive' \
        -H 'Pragma: no-cache' \
        -H 'Cache-Control: no-cache' \
        -H 'sec-ch-ua: "Chromium";v="86", "\"Not\\A;Brand";v="99", "Google Chrome";v="86"' \
        -H 'Accept: application/json, text/plain, */*' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4229.3 Safari/537.36' \
        -H 'Content-Type: application/json' \
        -H 'Origin: https://time.geekbang.org' \
        -H 'Sec-Fetch-Site: same-origin' \
        -H 'Sec-Fetch-Mode: cors' \
        -H 'Sec-Fetch-Dest: empty' \
        -H 'Referer: https://time.geekbang.org/column/intro/${cid}' \
        -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
        -H 'Cookie: ${COOKIE}' \
        --data-binary '{"product_id":${cid}}' \
        --compressed`
    },
    chapters(cid){
        return `curl 'https://time.geekbang.org/serv/v1/chapters' \
        -H 'Connection: keep-alive' \
        -H 'Pragma: no-cache' \
        -H 'Cache-Control: no-cache' \
        -H 'sec-ch-ua: "Chromium";v="86", "\"Not\\A;Brand";v="99", "Google Chrome";v="86"' \
        -H 'Accept: application/json, text/plain, */*' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4221.4 Safari/537.36' \
        -H 'Content-Type: application/json' \
        -H 'Origin: https://time.geekbang.org' \
        -H 'Sec-Fetch-Site: same-origin' \
        -H 'Sec-Fetch-Mode: cors' \
        -H 'Sec-Fetch-Dest: empty' \
        -H 'Referer: https://time.geekbang.org/column/intro/${cid}' \
        -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
        -H 'Cookie: ${COOKIE}' \
        --data-binary '{"cid":${cid}}' \
        --compressed`
    },
    articles(cid){
        return `curl 'https://time.geekbang.org/serv/v1/column/articles' \
        -H 'Connection: keep-alive' \
        -H 'Pragma: no-cache' \
        -H 'Cache-Control: no-cache' \
        -H 'sec-ch-ua: "Chromium";v="86", "\"Not\\A;Brand";v="99", "Google Chrome";v="86"' \
        -H 'Accept: application/json, text/plain, */*' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4221.4 Safari/537.36' \
        -H 'Content-Type: application/json' \
        -H 'Origin: https://time.geekbang.org' \
        -H 'Sec-Fetch-Site: same-origin' \
        -H 'Sec-Fetch-Mode: cors' \
        -H 'Sec-Fetch-Dest: empty' \
        -H 'Referer: https://time.geekbang.org/column/intro/${cid}' \
        -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' \
        -H 'Cookie: ${COOKIE}' \
        --data-binary '{"cid":${cid},"size":500,"prev":0,"order":"earliest","sample":false}' \
        --compressed`
    }
}


