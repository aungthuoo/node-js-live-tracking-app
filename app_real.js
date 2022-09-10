const httpServer = require('http').createServer()
const socketIO = require('socket.io')(httpServer)

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const axios = require("axios");



const redis = require('redis');
const { DefaultDeserializer } = require('v8');
const redisSubscriber = redis.createClient();
const redisPublisher = redis.createClient();
const client = redis.createClient();



let UserModel = require('./models/user')
let LocationModel = require('./models/location')

var routes = require('./routes');
const db = require('./db');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


socketIO.on('connection', function (client) {
  console.log('Connected...', client.id);

//listens for new messages coming in
  client.on('message', function name(data) {
    console.log(data);
    socketIO.emit('message', data);
  })

//listens when a user is disconnected from the server
  client.on('disconnect', function () {
    console.log('Disconnected...', client.id);
  })

//listens when there's an error detected and logs the error on the console
  client.on('error', function (err) {
    console.log('Error detected', client.id);
    console.log(err);
  })
})







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

//Serve a Publisher HTML
app.get('/history', function (req, res) {
  res.render('pages/history', {
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
    var status = req.query.status ?? 1 ;


    res.render('pages/tracking', {
        root: __dirname,
        id : id, 
        name : name, 
        latitude : latitude, 
        longitude : longitude,
        status : status 
    });
});
app.use('/', routes);





var port = process.env.PORT || 3000;
httpServer.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});