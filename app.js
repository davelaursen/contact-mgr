var express = require('express'),
    app = express(),
    port = 3000,
    data = require('./sample-data.json'),
    i, len;

for (i=0, len=data.length; i < len; i++) {
	data[i].id = i + 1;
}

app.get('/data', function(req, res) {
    res.json(data);
});

app.get('/data/:id', function(req, res) {
	if (data.length < req.params.id || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send('Error: no contact found');
	}
	var d = data[req.params.id - 1];
	res.json(d);
});

app.use(express.static(__dirname + '/app/'));
app.use(function(req,res) {
    res.sendFile(__dirname + '/app/index.html')
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');