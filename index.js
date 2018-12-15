var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');

const httpPort = 3000;
server.listen(httpPort);
console.log('Server http running on port '+httpPort);

app.use(express.static(path.join(__dirname, 'public'))); //static files to web
app.use(express.json());

/* Express routers... */
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html')); //send index_compiled.html (file comopiled with Atomic) to router /
});

app.post('/test/myendpoint', (req, res)=>{
	console.log(req.body);
	var fooObject = {
		bar: "lorem ipsum"
	};
	res.json(fooObject);
});
