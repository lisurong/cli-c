#!/usr/bin/env node
//引入控制台日志变色模块
const chalk = require('chalk');
//预定义三个级别的错误提示颜色
const info = chalk.hex('#4E8EE5');
const warning = chalk.hex('#FF8800');
const error = chalk.hex('#FF0000');
//测试一下三个级别的颜色
console.log(info('welcome to use app component cli!'));
console.log(warning('welcome to use app component cli!'));
console.log(error('welcome to use app component cli!'));
//引入fs文件操作库
const fs = require('fs');
const path = require('path');
//引入项目定义配置
let project = require('../project');
//console.log(info(JSON.stringify(project)));
//引入对话模块
const inquirer = require('inquirer');
const template = require('art-template');
console.log('current path====>', info(path.join(__dirname, '/')));


let mkdir = function (dir) {
    console.log('===>', dir);
    if (!dir || dir.indexOf('/') != 0) {
        throw new Error('必须是以/开头的路径');
    }
    while (dir.indexOf('//') >= 0) {
        dir = dir.replace('//', '/');
    }
    let paths = dir.split('/');
    for (var i = 0; i <= paths.length; i++) {
        let dir = paths.slice(0, i).join('/');
        if (dir && dir.indexOf('/') == 0) {
            console.log('mkdir', dir);
            if (fs.existsSync(dir)) {
                let stat = fs.lstatSync(dir);
                if (stat.isDirectory()) {
                    continue;
                } else {
                    throw new Error('dir ', dir, ' is not directory');
                }
            } else {
                let result = fs.mkdirSync(dir);
            }
        }
    }
    // console.log(paths.join('/'));
}


//开启交互模式，接收参数 name
inquirer.prompt([{
    type: 'String',
    name: 'name',
    message: 'please enter you component name',
    default: ''
}]).then((value) => {
    console.log(info(`您输入的组件名为:${JSON.stringify(value.name)}`));
    if (!value || !value.name || value.name.trim().length == 0) {
        console.log(error('组件名称不能为空'));
    } else if (value.name.trim().charAt(value.name.trim().length - 1) === '/') {
        throw new Error('名称必须是文件，所以不能以/结尾');
    } else if (/[a-z,A-Z,0-9,_,/]/.test(value.name)) {
        console.log(info('即将准备创建组件文件'));
        console.log(info('node命令所在路径', process.execPath));
        console.log(info('命令存储路径', __dirname));
        console.log(info('命令执行时路径', process.cwd()));
        let sourcePath = __dirname;
        let fullPath = '';
        if (value.name.indexOf('/') === 0) {
            //如果是/开始的路径
            fullPath = value.name;
        } else {
            //如果是相对路径
            fullPath = process.cwd() + "/" + value.name;
        }
        //兼容多个/的情况，如//，///
        while (fullPath.indexOf('//') >= 0) {
            fullPath = fullPath.replace('//', '/');
        }
        //创建文件夹
        mkdir(fullPath);
        let nodes = fullPath.split('/');
        let lastNodeName = nodes[nodes.length - 1];
        project.files.forEach(file => {
            if (file.type == 'dir') {
                let name = file.name;
                var render = template.compile(name);
                var newName = render({
                    name: lastNodeName,
                });
                let path = fullPath + '/' + newName;
                mkdir(path);
            } else {
                let content = '';
                if (file.source) {
                    let path = sourcePath + '/' + file.source;
                    if (fs.existsSync(path)) {
                        let stat = fs.lstatSync(path);
                        if (stat.isFile()) {
                            content = fs.readFileSync(path, 'utf-8');
                        } else {
                            throw new Error(`文件 ${path} 不是文件`)
                        }
                    } else {
                        throw new Error(`文件 ${path} 不存在`)
                    }
                } else {
                    //没有源文件，直接创建空文件
                    content = '';
                }
                //新文件的文件名
                let name = file.name;
                var render = template.compile(name);
                var newName = render({
                    name: lastNodeName,
                });
                let path = fullPath + '/' + newName;
                fs.writeFile(path, content, 'utf8', function (error) {
                    console.log(error);
                });
            }
        })
    } else {
        console.log(error('组件名称只能由a-z,A-z,0-9,_,/字符缓存'));
    }
});