var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const axios = require("axios");



var redis = require('redis');
const { DefaultDeserializer } = require('v8');
var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();
var client = redis.createClient();


let UserModel = require('./models/user')
let LocationModel = require('./models/location')

var routes = require('./routes');
const db = require('./db');

app.set('view engine', 'ejs');
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

app.get("/test_cache", (req, res) => {
    const searchTerm = req.query.search;
    try {
        client.get(searchTerm, async (err, jobs) => {
            if (err) throw err;
    
            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                //const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
                const jobs = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
                client.setex(searchTerm, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

//https://stackoverflow.com/questions/59443078/how-can-i-add-an-array-to-hash-with-hmset-in-redis
/*
You can add it as another field in the same hash key, but stringify the array.

await redis.hset(`role-${roleId}`, 'mandatories', JSON.stringify(mandatories))
This way you can still HGETALL the whole role object data. But then, you have to manage the array of IDs as a whole.

Or, you can flatten out the array to a list, set, or sorted set. For example, to add as set, you can do:

await redis.sadd(`role-${roleId}-mandatories`, mandatories)
Note we are adding '-mandatories' to the key name. Here you are passing the array to the node.js redis sadd function. It will add each array item as a member in the set. This allows you to manipulate the set of mandatories directly (SPOP, SREM, SISMEMBER, etc).
*/


app.get('/share', function (req, res) {
   debugger; 
    var id = req.query.id ?? 0 ;
    var name = req.query.name ?? "" ;
    var latitude = req.query.lat ?? 0.0 ;
    var longitude = req.query.long ?? 0.0 ;
    

    res.render('pages/share', {
        root: __dirname,
        id : id, 
        name : name, 
        latitude : latitude, 
        longitude : longitude
    });
});

app.get('/tracking', function (req, res) {
    debugger; 
     var id = req.query.id ?? 0 ;
     var name = req.query.name ?? "" ;
     var latitude = req.query.lat ?? 0.0 ;
     var longitude = req.query.long ?? 0.0 ;



     res.render('pages/tracking', {
         root: __dirname,
         id : id, 
         name : name, 
         latitude : latitude, 
         longitude : longitude
     });
});

app.use('/', routes);

http.listen(process.env.PORT || 3000, function () {
    console.log('Server Started. Listening on :3000');
});






 





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
        debugger; 
        let locationModel = new LocationModel({
            //id : data.User.id, 
            user_id : data.User.id, 
            name: data.User.name, 
            latitude : data.Coordinate.Latitude,
            longitude : data.Coordinate.Longitude, 
            created_at : new Date()
        }); 
        locationModel.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
        

        var location = JSON.stringify(data);
        redisPublisher.publish('locationUpdateABC', location);
    });
});


