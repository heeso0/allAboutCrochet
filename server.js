var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

const res = require('express/lib/response');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'web2021',
    password: 'web2021',
    database: 'crochet',
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static(__dirname + ''));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('', function(req, res){
    res.sendFile(__dirname + '/main.html');
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/main.html');
})

app.get('/main', function(req, res){
    res.sendFile(__dirname + '/main.html');
})


app.post('/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query ('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if(error) {
            console.log('err :' +err);
        } else {
            console.log(rows);
            if (rows[0]!=undefined) {
                if (!bcrypt.compareSync(password, rows[0].password)) {   
                        console.log('패스워드가 일치하지 않습니다');  
                } else {
                        console.log('로그인 성공');
                }
        } else {
                console.log(rows[0]);
                console.log('해당 ID가 없습니다');
        }
     }
    })
});


app.post('/register', function(req, res) {
	var username = request.body.username;
	var password = request.body.password;
	var password2 = request.body.password2;
	var email = request.body.email;
	console.log(username, password, email);
	if (username && password && email) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ? AND email = ?', [username, password, email], function(error, results, fields) {
			if (error) throw error;
			if (results.length <= 0) {
        connection.query('INSERT INTO user (username, password, email) VALUES(?,?,?)', [username, password, email],
            function (error, data) {
                if (error)
                  console.log(error);
                else
                  console.log(data);
        });
			  res.send(username + ' 회원가입이 완료되었습니다.<br><a href="/main">Home</a>');
			} else {
			  res.send(username + ' 중복된 ID 또는 이메일 계정입니다.<br><a href="/main">Home</a>');
			}			
			res.end();
		});
	} else {
		res.send('회원정보를 입력해주세요');
		res.end();
	}
});

app.get('/logout', function(req, res) {
    request.session.loggedin = false;
      response.send('<center><H1>로그아웃되었습니다.</H1><H1><a href="/">Goto Home</a></H1></center>');
      response.end();
  });


app.get('/stitches', function(req, res){
    res.sendFile(__dirname + '/stitches.html');
})

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html');
})

app.get('/loginerror', function(req, res){
    res.sendFile(__dirname + '/loginerror.html');
})

app.get('/register', function(req, res){
    res.sendFile(__dirname + '/register.html');
})

app.get('/chain-stitch', function(req, res){
    res.sendFile(__dirname + '/chain-stitch.html');
})

app.get('/single-crochet-stitch', function(req, res){
    res.sendFile(__dirname + '/single-crochet-stitch.html');
})

app.get('/double-crochet-stitch', function(req, res){
    res.sendFile(__dirname + '/douvle-crochet-stitch.html');
})

app.get('/half-double-crochet-stitch', function(req, res){
    res.sendFile(__dirname + '/half-double-crochet-stitch.html');
})

app.get('/picot-stitch', function(req, res){
    res.sendFile(__dirname + '/picot-stitch.html');
})

app.get('/puff-stitch', function(req, res){
    res.sendFile(__dirname + '/puff-stitch.html');
})

app.get('/single-crochet-stitch-in-a-back-loop-only', function(req, res){
    res.sendFile(__dirname + '/single-crochet-stitch-in-a-back-loop-only.html');
})

app.get('/single-crochet-stitch-increase', function(req, res){
    res.sendFile(__dirname + '/single-crochet-stitch-increase.html');
})

app.get('/slip-stitch', function(req, res){
    res.sendFile(__dirname + '/slip-stitch.html');
})





var server = app.listen(3000, function() {
    console.log("Express Server running at Server Running at http://localhost:3000/");
});
