const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//to set up the express
const app = express();

//connect to mongo
mongoose.connect('mongodb://ffap2:Passw0rd1@ds141534.mlab.com:41534/mern_stack', {useMongoClient: true});
mongoose.Promise = global.Promise;

//to serve public stuff
app.use(express.static('public'));

//for post requsts 
app.use(bodyParser.json());

//ready the routes
app.use('/api', require('./routes/api'));

//error handling middleware 
app.use(function(err, req, res, next){
	console.log(err);
	res.status(422).send({error: err.message});
});

//listen for requests from within backend
app.listen(
process.env.port || 4000, function(){
	console.log('now listening for requests');
});