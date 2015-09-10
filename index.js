var curl = require('./lib/curl');
var clean = require('./lib/extract');
curl('https://cnodejs.org/topic/53142ef833dbcb076d007230', function (content) {
    clean(content, {
        blockSize: 3
    });
});

