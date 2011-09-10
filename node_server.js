var http = require("http");
var url = require('url');

var requests = [];
var strings = [];

http.createServer(
    function(request, response) {
        if (request.url === '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'});
            response.end();
            console.log('favicon requested');
        } else {
            requests.push([request, response]);
			//console.log(requests.length)
        }

    }).listen(8000);

var myloop = function() {
    while (requests.length) {
        var result = {
            length: 0
        },
        out = requests.pop(),
        response = out[1];
        response.writeHead(200, 
                         { "Content-Type": "application/json", 
                            "Origin": "*",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "POST, GET",
                            "Access-Control-Allow-Headers": '*, X-Requested-With',
                            "Accept": "*/*",
                            "Access-Control-Max-Age": 1728000
                         }
        );
        //var lVars = url.parse(out[0].url, true);
		//var wrap = lVars.query.callback;
		//var s = wrap+'({"coordinates":'+JSON.stringify(strings)+'})';
        result.length = requests.length;
        response.write(JSON.stringify(result));
        response.end();
    }
    strings = [];
};

setInterval(myloop, 5000);
