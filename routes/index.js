var express = require('express');
var router = express.Router();
var pg = require('pg');
var app = require('/./app');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shazam' });
});

/*router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('index', {title: result.rows[0].name} ); }
    });
  });
});*/

// router.get('/api/v1/post/all', (req, res, next) => {
//   const results = [];
//   // Get a Postgres client from the connection pool
//   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       res.status(500).jsonp({success: false, data: err});
//     }
//     // SQL Query > Select Data
//     const query = client.query('SELECT * FROM posts_thanks;');
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       res.jsonp(results);
//     });
//   });
// });

// router.get('/api/v1/post/:cod', (req, res, next) => {
//   const results = [];
//   const cod = req.params.cod;

//   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    
//     const query = client.query('SELECT usuario FROM posts_thanks WHERE cod_post=($1)', [cod]);
//     query.on('row', (row) => {
//       results.push(row.usuario);
//     });
//     query.on('end', () => {
//       done();
//       res.jsonp(results);
//     });
//   });
// });

// router.get('/api/v1/post/:cod/:user', (req, res, next) => {
//   const results = [];  
//   const cod = req.params.cod;
//   const user = req.params.user;

//   pg.connect(process.env.DATABASE_URL, (err, client, done) => {
//     client.query('INSERT INTO posts_thanks (cod_post, usuario) values($1, $2)', [cod, user]);

//     const query = client.query('SELECT usuario FROM posts_thanks where cod_post=($1)', [cod]);
    
//     query.on('row', (row) => {  
//       results.push(row.usuario);
//     });

//     query.on('end', () => {
//       done();
//       res.jsonp(results);
//     });
//   });
// });

var json_data = [ 
  { label: 'Name', name: 'Apple Phone' },
  { label: 'type', name: 'phone' },
  { label: 'brand', name: 'ACME' },
  { label: 'price', name: 200 },
  { label: 'available', name: true },
  { label: 'warranty_years', name: 1 }
];

// Set up Postgres using massive.js
const massive = require('massive');
var connectionString = process.env.DATABASE_URL;
var massiveInstance = massive.connectSync({connectionString : connectionString});
// app.set('db', massiveInstance);

router.get('/api/v1/post/teste', (req, res, next) => {

  massiveInstance.json_data.find({"data->>type": "phone"}, function(err, result){
    res.jsonp(result);
  });

});

module.exports = router;
