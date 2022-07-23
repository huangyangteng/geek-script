const fs=require('fs')
const path=require('path');
/**
 * 遍历文件
 * @param {路径} currentDirPath 
 * @param {*} callback 
 */
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}
const uid =require('uid') ;

module.exports={
    walkSync,
    uid
}