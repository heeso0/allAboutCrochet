//모듈 추출
var http = require('http');
var express = require('express');

//웹 서버 생성
var app = express();
app.use(express.static('public'));
app.use(function(request, response) {
    response.send('<h1>Hello Middleware...!</h1>');
});

//웹 서버 실행
http.createServer(app).listen(1207, function(){
    console.log('Server Running at...');
});