#/bin/bash

#批量重命名
# for遍历目录下的每个文件，对于每个文件，根据旧名字得出新名字
# $1:  程序员的数学基础课/html
 MY_SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
IFS=$'\n'
function read_dir(){
    for file in `ls $1` # 运行ls
    do 
        if [ -d $1"/"$file ]
        then 
            read_dir $1"/"$file
        else
            oldName=$1"/"$file
            #newName=$(echo $oldName | sed 's/[ ]_[ ]/-/')
            #newName=$(echo $oldName | sed 's/更多IT资源www.cong0sousuo.top//') 
            #newName=$(echo $oldName | sed 's:\“:\":g' | sed 's:\”:\":g' | sed 's:\，:,:g' | sed 's:\：:\::g' ) 
            # 去除特殊符号 ，“” 去除空格
             newName=$(echo $oldName |  sed 's/[-_（()）?？”“——，： 丨【】]//g' )
            #newName=$(echo $newName | sed 's/讲//g') 
            echo $oldName
            echo $newName
            echo 
             mv $oldName $newName 
        fi
    done
}
read_dir $1
IFS=$MY_SAVEIFS
