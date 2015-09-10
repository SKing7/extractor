var curl = require('./lib/curl');
var clean = require('./lib/extract');
curl('http://blog.rainy.im/2015/09/02/web-content-and-main-image-extractor/', function (content) {
    clean(content, {
        blockSize: 5
    });
});

