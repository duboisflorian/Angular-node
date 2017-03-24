var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'angular-js'
});
  connection.connect();

app.get('/clients',function(req,res){

  connection.query('SELECT * from client', function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

app.get('/client-int/:id',function(req,res){

  connection.query('SELECT * from interaction where client ='+ req.params.id ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})


app.get('/client/:id',function(req,res){

  connection.query('SELECT * from client where id ='+ req.params.id ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

app.delete('/deleteclient/:id',function(req,res){

  connection.query('delete from client where id ='+ req.params.id ,function(err, rows, fields) {
      if (err) throw err;

  res.send('DELETE request to homepage');
});

})

app.delete('/deleteint/:id',function(req,res){
  connection.query('delete from interaction where id ='+ req.params.id ,function(err, rows, fields) {
      if (err) throw err;

  res.send('DELETE request to homepage');
});

})

app.post('/addclient',function(req,res){

  var name = req.body.name;
  var phone = req.body.phone;
  var mail = req.body.mail;

 connection.query('INSERT INTO client (name, phone, mail) VALUES (?, ?, ?)', [name, phone, mail], function(err, result){
      if (err) throw err;
 });

  connection.query('SELECT * FROM client ORDER BY id DESC LIMIT 1' ,function(err, rows, fields){
      if (err) throw err;

      var client = rows[0].id;
      var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var action ="Création du compte de " + name ;

      connection.query('INSERT INTO interaction (action, date, client) VALUES (?, ?, ?)', [action, date, client], function(err, result){
           if (err) throw err;
      });
 });

    res.send("client crée");
})

app.post('/addint',function(req,res){
    var action = req.body.action;
    var client = req.body.id;
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    connection.query('INSERT INTO interaction (action, date, client) VALUES (?, ?, ?)', [action, date, client], function(err, result){
         if (err) throw err;
    });

    res.send("int crée");
})

app.listen(8888, function(){

});
