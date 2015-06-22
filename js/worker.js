importScripts('../lib/crypto-min.js', '../lib/sha256-min.js');

onmessage = function(e) {
    var action = e.data.action;

    switch(action) {
        case 'code':
            var code = e.data.code;

            result = eval(code);

            postMessage({
                action: 'finished',
                result: result
            });
        break;
    }
}