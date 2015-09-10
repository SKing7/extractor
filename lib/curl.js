var request = require('request');
module.exports = function (url, resolve, reject) {
    request({
        url : url,
        encoding: 'utf8'
    }, function(error, response, body) {
        if (!error && response.statusCode < 400) {
            resolve && resolve(body);
        } else {
            console.error(error);
        }
    });
}
