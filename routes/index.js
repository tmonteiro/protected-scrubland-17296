var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shazam' });
});


router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('index', {title: result.rows[0].name} ); }
    });
  });
});

router.get('/api/v1/all', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).jsonp({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM test_table ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.jsonp(results);
    });
  });
});

// /* GET */
// router.get('/post/:id', function(req, res){
//   var db = req.db;
// 	var collection = db.get('posts');
//   var codigo = req.params.id;
//   collection.find({"cod": codigo},{}, function(e,docs) {
//     res.jsonp(docs);
//     // db.close();
// 	});
// });

router.get('/api/v1/post/:id', (req, res, next) => {
  const results = [];
  const id = req.params.id;
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    const query = client.query('SELECT * FROM test_table WHERE id=($1)', [id]);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.jsonp(results);
    });
  });
});


// /* GET */
// router.get('/post/:cod/:user', function (req, res) {
//   var db = req.db;
// 	var collection = db.get('posts');
//   var post = {
//     cod:req.params.cod,
//     thanks: [req.params.user]
//   };

//   /*console.log(req.params.cod);
//   console.log(req.params.user);
//   console.log(post);*/

//   collection.find({"cod": post.cod},{}, function(e,docs) {
//     if(docs.length != 0){
//       //Se o post já existe, verifica se o thak já existe adiciona o thank
//       collection.find({"cod": post.cod, "thanks": post.thanks[0]},{}, function(e,docs2) {
//         if(docs2.length == 0){
//             collection.update({"cod": post.cod},{$push: {"thanks":post.thanks[0]}});
//         }
//       })
//       //res.jsonp('{"acao":"update"}');
//     } else {
//       //não existe, insere Registro
//       collection.insert(post);
//       //res.jsonp('{"acao":"insert"}');
//     }
// 	});

//   res.jsonp('what');

// });

module.exports = router;
