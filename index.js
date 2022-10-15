// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

app.get("/api",function(req,res){
  res.json({unix: new Date().getTime(),
            utc: new Date().toUTCString()})
})

app.get("/api/:route", function (req, res) {

  let timeInput=req.params.route
  let utcRegex=/-+/
  let invalidRegex=/[A-Za-z]+/g
  let stringRegex=/^(\d{1}||^\d{2})\s\w+\s\d+/
  if(stringRegex.test(timeInput)){
    let unixDate= new Date(timeInput).getTime();
    let utcDate= new Date(timeInput).toUTCString()
    res.json({unix: unixDate,utc: utcDate})
  }

  if(invalidRegex.test(timeInput)){
    res.json({error: "Invalid Date"})
  }

  if(utcRegex.test(timeInput)){
   let unixDate= new Date(timeInput).getTime();
   let utcDate= new Date(timeInput).toUTCString()
   res.json({unix: unixDate,utc: utcDate})
  }
  
    let unixDate= Number(timeInput)
    let utcDate= new Date(unixDate).toUTCString()
    res.json({unix: unixDate,utc: utcDate})
   
});



// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
