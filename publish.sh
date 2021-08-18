#/bin/bash

# 将代码发布到服务器 /Users/h/self-apps/0425geektime/publish.sh
local=/Users/h/self-apps/0425geektime
remote=root@111.229.14.189:/root/webapps

rsync -v   --progress --stats -r -t -p -l -z -e 'ssh -p 22' --delete  $local $remote