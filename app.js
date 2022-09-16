//const http = require('http').createServer()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http)
const axios = require("axios");

const redis = require('redis');
const { DefaultDeserializer } = require('v8');
const redisSubscriber = redis.createClient();
const redisPublisher = redis.createClient();
const client = redis.createClient();


let UserModel = require('./models/user')
let LocationModel = require('./models/location')
let TestModel = require('./models/test')

var routes = require('./routes');
const db = require('./db');




app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));





socketIO.on('connection', function (client) {
  console.log('Connected...', client.id);

//listens for new messages coming in
  client.on('message', function name(data) {
    console.log("i am message"); 
    console.log(data);
    var location = JSON.stringify(data);
    //redisPublisher.publish('locationUpdateABC', location);


    var item = {};
    item.Coordinate = {};
    item.User = {};
    
    item.User.id = data.id;
    item.User.name = data.username;
    item.User.status = 1;
    item.Coordinate.Latitude = data.latitude;
    item.Coordinate.Longitude = data.longitude;

    socketIO.emit('locationUpdate', data);

    let locationModel = new LocationModel({
        //id : data.User.id, 
        user_id : data.id, 
        name: data.username, 
        latitude : data.latitude,
        longitude : data.longitude, 
        created_at : new Date()
    }); 
    locationModel.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })

      socketIO.emit('message', data);
    })



  client.on('lastKnownLocation', function name(data) {
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


app.get('/maps', function (req, res) {
  redisSubscriber.subscribe('locationUpdateABC');
  res.render('pages/maps', {
      root: __dirname
  });
});

app.get('/publish', function (req, res) {
  res.sendFile('views/publisher.html', {
      root: __dirname
  });
});

app.get('/history', function (req, res) {
  res.render('pages/history', {
      root: __dirname
  });
});


//ToDo: Login 
// app.get('/register', function (req, res) {
//   res.render('pages/login/register', {
//       root: __dirname
//   });
// });





//TESTING
app.get('/save', function (req, res) {

  let testModel = new TestModel({
    //id : data.User.id, 
    id : 1, 
    name: "ATO", 
    latitude : 16.00,
    longitude : 96.00, 
    created_at : new Date()
  }); 
  testModel.save()
      .then(doc => {
          console.log(doc)
      })
      .catch(err => {
          console.error(err)
      });
  res.render('pages/transaction_index', {
      root: __dirname
  });

});

//const User = require('./models/user');
app.get('/users', (req, res) => {
  UserModel.find({}, (err, items) => {
    if (err) console.error(err);
    res.render('pages/user/index', { items });
  });
});




app.get('/users/:id', (req, res) => {
  var id = req.params.id;
  console.log( id ); 
  UserModel.findOne({ _id: id }, (err, item) => {
      if (err) console.error(err);
      console.log( item ); 
      res.render('pages/user/show', { item });
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


var port = process.env.PORT || 3000;
http.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});