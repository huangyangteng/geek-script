const COOKIE=`_ga=GA1.2.26199128.1538043642; LF_ID=1574409314502-5683520-9441526; MEIQIA_TRACK_ID=1QKTgXX5Qla09NvhTG7WrzFZEsP; MEIQIA_VISIT_ID=1XYvRx0w122IEmUm8Id7LkowkD4; GCID=d7125fe-e5f8041-65dd72a-7a6a11b; gksskpitn=96e9ee49-fede-421c-9622-6c75909d0d9d; _gid=GA1.2.454005409.1597753807; GRID=d7125fe-e5f8041-65dd72a-7a6a11b; GCESS=BQIE28o7XwYETuWXoQEIu0oPAAAAAAAIAQMHBLTK6yUEBAAvDQADBNvKO18LAgUADAEBCQEBCgQAAAAABQQAAAAA; acw_tc=2760778915978022751061226eeb5d9510b62bd0c54161bf142aabd2878777; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1597802367,1597802445,1597802505,1597802538; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1597802370,1597802445,1597802504,1597802538; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1597803598; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1597803598; _gat=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221002171%22%2C%22first_id%22%3A%221738f77938c3-0b9249c8b8f5bb-6b350e7e-2073600-1738f77938d6a4%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.dogedoge.com%2Fresults%3Fq%3D%25E6%259E%2581%25E5%25AE%25A2%25E6%2597%25B6%25E9%2597%25B4%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2Fdailylesson%22%2C%22%24latest_utm_source%22%3A%22time_web%22%2C%22%24latest_utm_medium%22%3A%22jiangtang%22%2C%22%24latest_utm_term%22%3A%22pc_interstitial_499%22%2C%22%24latest_utm_campaign%22%3A%22100057701%22%2C%22%24latest_utm_content%22%3A%22popups-a%22%7D%2C%22%24device_id%22%3A%221738f77938c3-0b9249c8b8f5bb-6b350e7e-2073600-1738f77938d6a4%22%7D; gk_process_ev={%22count%22:26%2C%22utime%22:1597754073923%2C%22referrer%22:%22https://time.geekbang.org/%22%2C%22target%22:%22%22}; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1597803601|1597802275'`
module.exports={
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
        -H 'Cookie: ${COOKIE} \
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
        -H 'Cookie: ${COOKIE} \
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
        -H 'Cookie: ${COOKIE} \
        --data-binary '{"cid":${cid},"size":500,"prev":0,"order":"earliest","sample":false}' \
        --compressed`
    }
}