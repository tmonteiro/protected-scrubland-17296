var express = require('express');
//var bodyParser = require('body-parser');

/*var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.OPENSHIFT_MONGODB_DB_URL + 'shaolin');*/
var pg = require('pg');
var db = pg.connect(process.env.DATABASE_URL);

var routes = require('./routes/index');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(function(req,res,next){
	req.db = db;
	next();
});

app.use('/', routes);




/*app.get('/', function(request, response) {
  response.render('pages/index');
});*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
