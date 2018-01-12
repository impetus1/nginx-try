const express = require('express');
const router = express.Router();
const Thing = require('../models/things');

//gettting list of things from mongo
router.get('/things', function(req, res, next){
	/*Thing.find({}).then(function(things){
		res.send(things);
	});*/
	Thing.geoNear(
	{type: 'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
	{maxDistance: 100000, spherical: true}
	).then(function(things){
		res.send(things);
	});
});

//add a new thing to database
router.post('/things', function(req, res, next){
	Thing.create(req.body).then(function(thing){
	res.send(thing);	
	}).catch(next);
});

//update the thing from within mongo
router.put('/things/:id', function(req, res, next){
	Thing.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
	Thing.findOne({_id: req.params.id}).then(function(thing){
	res.send(thing);
	});
	});
});

//delete a thing from mongo
router.delete('/things/:id', function(req, res, next){
	Thing.findByIdAndRemove({_id: req.params.id}).then(function(thing){
		res.send(thing);
	});

});

module.exports = router;