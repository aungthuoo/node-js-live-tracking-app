//const http = require('http').createServer()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http);
const axios = require("axios");
require('dotenv').config()  

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const redis = require("redis");
const { DefaultDeserializer } = require("v8");
const redisSubscriber = redis.createClient();
const redisPublisher = redis.createClient();
const client = redis.createClient();

let UserModel = require("./models/user");
let LocationModel = require("./models/location");
let TestModel = require("./models/test");

var routes = require("./routes");
const db = require("./db");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/location');
const attendanceRoutes = require('./routes/attendance');
const jobRoutes = require('./routes/job');

const locationController = require('./controllers/locationController');
const userController = require('./controllers/userController');
const attendanceController = require('./controllers/attendanceController');


const helper = require("./helpers.js");


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

socketIO.on("connection", function (client) {
  //listens for new messages coming in
  client.on("message", async function name(data) {
    console.log(data);
    var location = JSON.stringify(data);
/*
    var item = {};
    item.Coordinate = {};
    item.User = {};

    item.User.id = data.id;
    item.User.name = data.username;
    item.User.status = 1;
    item.Coordinate.Latitude = data.latitude;
    item.Coordinate.Longitude = data.longitude;
*/
// Move Maps Market 
    socketIO.emit('locationUpdate', data);

// Update user info 
    userController.update( data );
    
// Update attendance  
    attendanceController.update( data );

// Save location tracking 
    locationController.update( data );
    
    
    //socketIO.emit("message", data);
  });

  client.on("lastKnownLocation", function name(data) {
    debugger;
    let locationModel = new LocationModel({
      //id : data.User.id,
      user_id: data.User.id,
      name: data.User.name,
      latitude: data.Coordinate.Latitude,
      longitude: data.Coordinate.Longitude,
      created_at: new Date(),
    });
    locationModel
      .save()
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.error(err);
      });

    var location = JSON.stringify(data);
    redisPublisher.publish("locationUpdateABC", location);
  });

  //listens when a user is disconnected from the server
  client.on("disconnect", function () {
    console.log("Disconnected...", client.id);
  });

  //listens when there's an error detected and logs the error on the console
  client.on("error", function (err) {
    console.log("Error detected", client.id);
    console.log(err);
  })
})

app.use("/", indexRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/location', locationRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/job', jobRoutes);

var port = process.env.PORT || 3000;
http.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Listening on port", port);
});
