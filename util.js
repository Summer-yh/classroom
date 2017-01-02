//检测文件是否存在

'use strict';

const fs = require('fs'),
      path = require('path');

const config = {
    sass: {
        src: './public/scss/'
    },
    // modjsPath: '../dev/modjs/page/'
};

const dirPath = process.argv[3].substring(2);

module.exports = {

    currentDir: '',
    /**
     * 检查当前监听或编译目录是否存在
     * @param type 类型 可选(默认是编译scss路径；如果是"js",则是编译js的路径)
     * @return true/false
     */
    existsDir: function(type) {
        let rootPath = __dirname.substring(0, __dirname.lastIndexOf('build') - 1),
            src = config.sass.src.substring(2),
            inputPath = dirPath;

        if (type === 'js') {
            src = config.modjsPath.substring(2);
        }

        this.currentDir = path.join(rootPath, src, inputPath);

        return fs.existsSync(this.currentDir);
    },
    //输出log
    log: function() {
        console.dir('路径不存在--> ' + this.currentDir, {
            colors: true
        });
    }

};
