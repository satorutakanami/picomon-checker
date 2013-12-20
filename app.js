var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.configure(function () {
	app.use(express.bodyParser());
})
app.set('view engine', 'ejs');

app.get('/*', function(req, res) {
	var env     = req.query.env || 'production';
	var port    = req.query.port;
	var client  = req.query.c || '000001';
	var profile = req.query.p || '1';
	var route   = require('url').parse(req.url).pathname;
	var here    = req.get('host');
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
	var params = {
		query:      {
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
		is_post:    false
	};
	res.render(__dirname + '/index', params);
});

app.post('/*', function(req, res) {
	console.log(req)
	var env     = req.body.env || 'production';
	var port    = req.body.port;
	var client  = req.body.c || '000001';
	var profile = req.body.p || '1';
	var route   = require('url').parse(req.url).pathname;
	var here    = req.get('host');
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
	var params = {
		query:      {
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
		is_post:    true
	};
	res.render(__dirname + '/index', params);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
