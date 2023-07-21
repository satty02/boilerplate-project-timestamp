// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api", function(req, res) {
  let date = new Date
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string || '';
  let date;
  date = dateString ? new Date(dateString) : new Date();

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.send({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.valueOf(), utc: date.toUTCString() });
    }
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
