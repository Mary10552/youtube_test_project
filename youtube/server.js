var port = process.env.port || 1337;
var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var YouTube = require('youtube-node');
var bodyParser = require('body-parser');
app.use(bodyParser());
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/search', bodyParser.urlencoded({
    extended: true
}));

app.post('/search', function (req, res, next) {
    var youTube = new YouTube();
    
    youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

    youTube.search(req.body.src , 1, function (error, result) {

        if (error) {
            console.log(error);
        }
        else {
            console.log(JSON.stringify(result, null, 2));

        }
       
      // res.send(req.body.videoId);
   

        //res.send(req.body.HTMLVideoElement);
        res.send({ videoId: result.items[0].id.videoId });
    });
});

/*app.get("/", function (req, res) {
    res.send({ str: 'videoId' });
    res.send(req.body.ytb);
});*/
http.listen(port, function () {
    console.log('listening on *:', port);
});
