//tutorial: https://zellwk.com/blog/crud-express-mongodb/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var db;

mongoClient.connect('mongodb://wail:wail@ds053206.mlab.com:53206/wail-db2', (err, database) => {
	if (err) return console.log(err);
	db = database;

	app.listen(9090, function() {
		console.log('listening on port 9090');
		app.get('/', (req, res) => {
				//res.sendFile(__dirname + '/index.html');
				db.collection('person').find().toArray( (err, results) => {
					if (err) return console.log(err);
					//console.log(results);
					res.render('index.ejs', {person: results});
				});
			});

		app.post('/postform', (req, res) => {
				console.log(req.body);

				db.collection('person').save(req.body, (err, result) => {
					if (err) return console.log(err);
					console.log('saved to db');				
					res.redirect('/');
				});
			});
		});
});
