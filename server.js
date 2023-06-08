var express = require("express");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(
  cors({
    origin: ['*'],
  })
);

// Routes
require('./Routes/Classes/class-routes')(app);
require('./Routes/ClassName/class-name-routes')(app);
require('./Routes/StudentClass/student-class-routes')(app);
require('./Routes/Students/student-routes')(app);


// Starting the server ------------------------------------/
app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
