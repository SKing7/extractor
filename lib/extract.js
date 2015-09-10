module.exports = function (content, options) {
    var preProcess = function (content) {
        if (typeof content  !== 'string') return; 
        content = content.replace(/<!--.*?-->/g, '');
        content = content.replace(/<script.*?>[\s\S]*?<\/script>/ig, '');
        content = content.replace(/<style.*?>[\s\S]*?<\/style>/ig, '');
        content = content.replace(/<[\s\S]*?>|[ \t\r\f\v]/g, '');
        return content
    };
    var rmBlank = function (str) {
        return str.replace(/\s+/g, '');
    }; 
    var initBlocks = function () {
        var cleanedContent = preProcess(content);
        var lines = cleanedContent.split('\n');
        var blockSize = options.blockSize;
        var numOfEmptyLine = 0;
        var tmpLine;
        var tmpWordCount;
        var indexWordsCountTS = [];
        var totalWordCount = 0;
        for (var i = 0; i < lines.length; i++) {
            tmpLine = lines[i];
            tmpWordCount = rmBlank(tmpLine).length;
            if (tmpWordCount === 0) {
                numOfEmptyLine++;
            }
            for (var j = i + 1; j < i + blockSize && j < lines.length; j++) {
                tmpWordCount += rmBlank(lines[j]).length;
            }
            indexWordsCountTS.push(tmpWordCount);
            totalWordCount += tmpWordCount;
        }
        var threshold = calcThreshold();
        var isStart = false;
        var isEnd = false;
        var endAt;
        var startAt;
        var resultContent = '';
        for (i = 0; i < indexWordsCountTS.length; i++) {
            if (!isStart && indexWordsCountTS[i] > threshold) {
                if (indexWordsCountTS[i + 1] !== 0) {
                    isStart = true;
                    startAt = i;
                    continue;
                }
            }
            if (isStart) {
                //当前块未空，或者下一块为空，当前都认为是结束
                if (indexWordsCountTS[i + 1] === 0) {
                    isEnd = true;
                    endAt = i;
                }
            }
            if (isEnd) {
                resultContent += lines.slice(startAt, endAt).join('\n');
                isStart = isEnd = false;
            }
        }
        console.log(resultContent);

        function calcThreshold() {
            var data_1 = totalWordCount / indexWordsCountTS.length;
            var data_2 = numOfEmptyLine / (lines.length - numOfEmptyLine);
            return middle([100, data_1 << (data_2 >>> 1), 50]);
        }
        function middle(arr) {
            arr = arr.sort(function (a, b) {
                return a > b;
            });
            return arr[arr.length / 2 >>> 0];
        }
    }; 
    initBlocks();

}
