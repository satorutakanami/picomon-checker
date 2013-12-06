var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	var env     = req.query.env;
	var port    = req.query.port;
	var client  = req.query.c;
	var profile = req.query.p;
	var url, secure_url;
	switch (env) {
		case 'development':
			url = 'battamon.net';
			break;
		case 'staging':
			url = 'pacchimon.net';
			break;
		case 'production':
			url = 'picomon.jp';
			break;
		default:
			url = 'battamon.net';
			break;
	}
	url += (port) ? ':' + port : '';
	secure_url = url + (port) ? ':' + (port + 1) : '';
	var params = {
		url:        url,
		secure_url: secure_url,
		client:     ('000000'+client).slice(-6),
		profile:    profile
	};
	res.render('./index.ejs', params);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
