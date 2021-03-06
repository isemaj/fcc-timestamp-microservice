"use strict";
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.route("/api/timestamp/:date?").get((req, res) => {
  var date = null;
  if (req.params.date) { // req.params.date !== undefined
    var time = parseInt(+req.params.date);
    if (isNaN(time)) {
      date = new Date(req.params.date);
    } else {
    date = new Date(time);
    }
  } else { // req.params.date === undefined
    date = new Date(Date.now());
  }
  
  var responseDate = date == "Invalid Date" ?
    { "unix": null, "utc": "Invalid Date" } : 
    { "unix": date.getTime(), "utc": date.toUTCString() }   
  
  res.json(responseDate);
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});