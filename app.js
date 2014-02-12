var express = require("express");
var logfmt = require("logfmt");

var app = express();

app.use(logfmt.requestLogger());
app.configure(function () {
	app.use(express.bodyParser());
})
app.set('view engine', 'ejs');

var index = function(req, res) {
	var version = req.query.ver || '1.0';
	var env     = req.query.env || 'production';
	var port    = req.query.port;
	var client  = req.query.c || '000001';
	var profile = req.query.p || '1';
	var route   = require('url').parse(req.url).pathname;
	var here    = req.get('host');
	var isPost  = (req.method === 'POST') ? true : false;
	var isHttps = req.connection.encrypted ? true : false;
	var baseUrl, url, secure_url;
	switch (env) {
		case 'development':
			baseUrl = 'battamon.net';
			port = port || '3010';
			break;
		case 'staging':
			baseUrl = 'pacchimon.net';
			port = '';
			break;
		case 'production':
			baseUrl = 'picomon.jp';
			port = '';
			break;
		default:
			baseUrl = 'battamon.net';
			port = port || '3010';
			break;
	}
	secure_url = 'https://' + baseUrl + ((env == 'development') ? ':' + (+port + 1) : '');
	url        = 'http://' + baseUrl + ((env == 'development') ? ':' + (+port) : '');
	console.log(version)
	var params = {
		query:      {
			ver:     version,
			env:     env,
			port:    port,
			client:  client,
			profile: profile
		},
		url:        url,
		secure_url: secure_url,
		client:     ('000000'+client).slice(-6),
		profile:    profile,
		route:      route,
		protocol:   isHttps ? 'https://' : 'http://',
		here:       here,
		is_post:    isPost
	};
	res.render(__dirname + '/index', params);
}

app.get('/*', index);
app.post('/*', index);

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
