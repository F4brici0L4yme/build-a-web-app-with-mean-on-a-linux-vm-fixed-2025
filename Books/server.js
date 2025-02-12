var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

require('./app/routes')(app);

app.set('port', 80);
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
