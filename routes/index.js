var express = require('express');
var router = express.Router();
var pg = require('pg');

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

router.get('/api/v1/post/all', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      res.status(500).jsonp({success: false, data: err});
    }
    // SQL Query > Select Data
    //const query = client.query("SELECT data->>'price' as iphone_price FROM json_data where data->>'name'='Apple Phone';");
    const query = client.query("SELECT * FROM posts_thanks;");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      res.jsonp(results);
    });
  });
});

router.get('/api/v1/post/:cod', (req, res, next) => {
  const results = [];
  const cod = req.params.cod;

  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    
    //const query = client.query('SELECT usuario FROM posts_thanks WHERE cod_post=($1)', [cod]);
    const query = client.query("SELECT jsonb_array_elements_text(thanks->'usuarios') AS usuario FROM posts_thanks where cod_post = ($1);",[cod]);

    query.on('row', (row) => {
      results.push(row.usuario);
    });
    query.on('end', () => {
      done();
      res.jsonp(results);
    });
  });
});

router.get('/api/v1/post/:cod/:user', (req, res, next) => {
  const results = [];  
  const cod = req.params.cod;
  const user = req.params.user;


  pg.connect(process.env.DATABASE_URL, (err, client, done) => {

    // client.query("SELECT jsonb_array_elements_text(thanks->'usuarios') AS usuario FROM posts_thanks where cod_post=($1)", [cod], (err, ress) => {
    //   if (err) {
    //     console.log(err.stack)
    //   } else {
    //     results.push(ress.row);
    //     console.log(ress)
    //   }
    //   ///rowCount
    //   //rows:[]
      
    // });

    const query = client.query("SELECT jsonb_array_elements_text(thanks->'usuarios') AS usuario FROM posts_thanks where cod_post=($1)", [cod]);
    console.log(query);
    query.on('row', (row) => {  
      console.log('passou no on');
      results.push(row.usuario);
    });

    query.on('end', () => {
      console.log('passou no end');
      done();
      res.jsonp(results);
    });
  });


  // pg.connect(process.env.DATABASE_URL, (err, client, done) => {

  //   client.query('INSERT INTO posts_thanks (cod_post, usuario) values($1, $2)', [cod, user]);

  //   const query = client.query('SELECT usuario FROM posts_thanks where cod_post=($1)', [cod]);
    
  //   query.on('row', (row) => {  
  //     results.push(row.usuario);
  //   });

  //   query.on('end', () => {
  //     done();
  //     res.jsonp(results);
  //   });
  // });
});


module.exports = router;
