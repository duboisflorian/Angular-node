var express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var connection = mysql.createConnection({
  host     : 'mysql-slack-js.alwaysdata.net',
  user     : 'slack-js',
  password : 'yani123',
  database : 'slack-js_crm'
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", 'PUT , GET, POST, DELETE, OPTIONS');
  next();
});

// app.get('/test', function(req, res){
//   connection.connect();
//
//   connection.query('SELECT * FROM clients', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows);
//     res.json(rows);
//   });
//
//   connection.end();
// })

app.delete('/supprimerclient/:id', function(req, res){

  connection.query('DELETE FROM `clients` WHERE id =' + req.params.id, function(err, rows, fields) {
    if (err) throw err;
    console.log("suppresion effectué client id :" + req.params.id);
  });
  res.send('DELETE request to homepage');
})

app.delete('/suppressioninteraction/:id', function(req, res){

  connection.query('DELETE FROM `interactions` WHERE id =' + req.params.id, function(err, rows, fields) {
    if (err) throw err;
    console.log("suppresion effectué interaction id :" + req.params.id);
  });
  res.send('DELETE request to homepage');
})

app.post('/ajouterclient/:nom/:prenom/:mail', function(req, res){

  connection.query("INSERT INTO clients VALUES (NULL,'" + req.params.nom +" ', '" + req.params.prenom +"', '"+ req.params.mail +"')", function(err, rows, fields) {
    if (err) throw err;
    console.log('client ajouté');
  });
  res.send(req.params.nom + ' ' + req.params.prenom + ' ' + req.params.mail);
})

app.post('/creationinteraction/:id/:interaction', function(req, res){

  connection.query("INSERT INTO interactions VALUES (NULL,'" + req.params.interaction +" ', " + req.params.id +")", function(err, rows, fields) {
    if (err) throw err;
    console.log('interaction ajouté au client' + req.params.id);
  });
  res.send(req.params.interaction + ' ' + req.params.id);
})

app.get('/interactions/:id', function(req, res){

  connection.query('SELECT * FROM interactions WHERE idclient =' + req.params.id, function(err, rows, fields) {
    if (err) throw err;
    console.log('Données récupérées: ', rows);
    res.json(rows);
  });

  console.log("interactions envoyés");
})

app.get('/clients', function(req, res){

  connection.query('SELECT * FROM clients', function(err, rows, fields) {
    if (err) throw err;
    console.log('Données récupérées: ', rows);
    res.json(rows);
  });

  console.log("clients envoyés");
})
app.listen(8888, function(){
  console.log('listening on port 8888');
})
