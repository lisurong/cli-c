#业务模块模板生成工具
## 使用方式
1. 安装方式（https://github.com/lisurong/cli-c.git为github项目路径）

cnpm install -g https://github.com/lisurong/cli-c.git


2. 使用方式
在命令行下执行 app-cli 根据提示输入需要创建的模块名称，支持多级目录
如：modules/module_001

将检查 modules 是否存在，不存在会创建，然后会创建出 project.js 中对应的文件或者文件夹

3. 实现原理
主要依赖于 fs 文件系统模块，读写文件创建目录，chalk 模块，对重要console日志以不同颜色展示， inquirer 模块 命令行互动支持
art-template 模块，模板替换库。



