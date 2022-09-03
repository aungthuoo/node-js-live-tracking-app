var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// Start the Server
http.listen(port, function () {
    console.log('Server Started. Listening on *:' + port);
});

// Express Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


// index page
app.get('/', function(req, res) {
    var mascots = [
      { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";
  
    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline
    });
});




// Render Main HTML file
app.get('/maps', function (req, res) {
    redisSubscriber.subscribe('locationUpdateABC');
    res.render('pages/maps', {
        root: __dirname
    });
});

//Serve a Publisher HTML
app.get('/publish', function (req, res) {
    res.sendFile('views/publisher.html', {
        root: __dirname
    });
});

app.get('/share', function (req, res) {
    /*
    var userId = req.query.id ?? 0 ;
    var latitude = req.query.lat ?? 0.0 ;
    var longitude = req.query.long ?? 0.0 ;

    res.render('views/share', {
        root: __dirname,
        id : userId, 
        latitude : latitude, 
        longitude : longitude
    }); 
    res.sendFile('views/share', {
        root: __dirname
    });
    */
    var userId = req.query.id ?? 0 ;
    var latitude = req.query.lat ?? 0.0 ;
    var longitude = req.query.long ?? 0.0 ;

    res.render('pages/share', {
        root: __dirname,
        id : userId, 
        latitude : latitude, 
        longitude : longitude
    });
});


var redis = require('redis');
const { DefaultDeserializer } = require('v8');
var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();

redisSubscriber.on('subscribe', function (channel, count) {
    console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
});
redisSubscriber.on('message', function (channel, message) {
    console.log('step 3'); 
    //console.log('client channel ' + channel + ': ' + message);
    io.emit('locationUpdate', message);
});


io.on('connection', function (socket) {
    console.log('socket created');
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId);
        previousId = currentId;
      };
    socket.on('disconnect', function() {
      console.log('Got disconnect!');
    });
    socket.on('lastKnownLocation', function (data) {
        console.log('step 2'); 
        var location = JSON.stringify(data);
        redisPublisher.publish('locationUpdateABC', location);
    });
});


