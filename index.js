const  express = require('express');
const  app = express();
const cors = require('cors');

//MIDDLEWARE
app.use(cors({optionsSuccessStatus: 200}));  //Algunos navegadores antiguos fallan
app.use(express.static('public'));


//ROUTES
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Devuelve fecha actual en ambos formatos
app.get("/api",function(req,res){
  res.json({unix: new Date().getTime(),
            utc: new Date().toUTCString()})
})

//Devuelve fecha en formato contrario
app.get("/api/:route", function (req, res) {

  let timeInput=req.params.route
  let utcRegex=/-+/
  let invalidRegex=/[A-Za-z]+/g
  let stringRegex=/^(\d{1}||^\d{2})\s\w+\s\d+/


  if(invalidRegex.test(timeInput)){
    return res.json({error: "Invalid Date"})
  }

  if(stringRegex.test(timeInput)){
    let unixDate= new Date(timeInput).getTime();
    let utcDate= new Date(timeInput).toUTCString()
    return res.json({unix: unixDate,utc: utcDate})
  }

  if(utcRegex.test(timeInput)){
   let unixDate= new Date(timeInput).getTime();
   let utcDate= new Date(timeInput).toUTCString()
   return res.json({unix: unixDate,utc: utcDate})
  }
  
    let unixDate= Number(timeInput)
    let utcDate= new Date(unixDate).toUTCString()
    res.json({unix: unixDate,utc: utcDate})
   
});

//PORT
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
