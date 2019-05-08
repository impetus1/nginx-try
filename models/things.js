//import {PlacesAutocomplete} from '../components/geoplaces.jsx'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create geo location Schema
const GeoSchema = new Schema({
	type:{
		type: String,
		default: "Point"
	},
	coordinates:{
		type: [Number],
		index: "2dsphere"
	}
	
});

//create things Schema and model
const ThingsSchema = new Schema({
	name:   {
		type: String,
		required:[true, "Name field is required"]
	},
	number: {
		type: String
	},
	working:{
		type: Boolean,
		default:false
	},
	geometry: GeoSchema
	//add in geo location
});

const Things = mongoose.model('thing', ThingsSchema);

module.exports = Things;