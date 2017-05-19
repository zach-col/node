// inports for nodejs
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// create instance
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

// return json formating of data and unix date
app.get('/dateValues:dateVal', function(req,res,next){
  //get req data
  var dateVal = req.params.dateVal;
  // formatting options
  var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if(isNaN(dateVal)){
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  }
  else{
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }

  res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000, function(){
  console.log("app running at localhost:3000");
});
