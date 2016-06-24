var fs = require('fs');
var path= require('path');
function makeDir(dirPath, mode) {
    if (!fs.existsSync(dirPath)) {
        var pathtmp;
        dirPath.split("/").forEach(function(dirname) {  //path.sep
			console.log('dirname is ' +dirname);
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
　　　　　　　　//如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
                if(dirname){
                    pathtmp = dirname;
					console.log('Windows pathtmp ' + pathtmp);
                }else{
                    pathtmp = "/"; 
					console.log('Linux pathtmp ' + pathtmp);
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
			console.log('pathtmp ' + pathtmp);
        });
    }
	else{
        console.log('The ' + dirPath + ' have exists!');
    }
    return true;
}
exports.makeDir = makeDir;