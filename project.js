module.exports = {
    files: [{
        type: 'dir',
        name: 'js'
    }, {
        type: 'file',
        name: 'c_{{name}}-01001.css',
        source:'template/cssTemp.css',
    }, {
        type: 'file',
        name: 'c_{{name}}-01001.html',
        source:'template/htmlTempA.html',
    },{
        type: 'file',
        name: 'c_{{name}}-01001.properties',
        source:'template/propTemp.properties',
    },{
        type: 'file',
        name: '{{name}}-01.js',
        source:'template/jsTemp.js',
    },{
        type: 'file',
        name: '{{name}}-01.min.js'
    },{
        type: 'file',
        name: 'c_{{name}}-01.json',
        source:'template/jsonTemp.json',
    }, {
        type: 'file',
        name: '{{name}}-01.xml',
        source:'template/xmlTemp.xml',
    }, {
        type: 'file',
        name: '{{name}}-01.html',
        source:'template/htmlTempB.html',
    }]
}