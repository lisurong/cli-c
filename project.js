module.exports = {
    files: [{
        type: 'dir',
        name: 'js'
    }, {
        type: 'file',
        name: 'c_{{name}}-01001.css',
        source:'template/index.css',
    }, {
        type: 'file',
        name: 'c_{{name}}-01001.html',
    },{
        type: 'file',
        name: 'c_{{name}}-01001.properties',
    },{
        type: 'file',
        name: '{{name}}-01.js',
    },{
        type: 'file',
        name: '{{name}}-01.min.js',
    },{
        type: 'file',
        name: 'c_{{name}}-01.json',
    }, {
        type: 'file',
        name: '{{name}}-01.xml',
    }, {
        type: 'file',
        name: '{{name}}-01.html',
    }]
}