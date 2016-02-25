var shutterstock = require('shutterstock');
var async = require('async');
var vocabulary = require('./vocabulary');
var templates = require('./templates');
var sentencer = require('sentencer');

sentencer.configure({
	actions: {
		buzz_verb: function() {
   			return vocabulary.buzzVerbs[Math.floor(Math.random()*vocabulary.buzzVerbs.length)];
    	},
    	buzz_noun: function() {
   			return vocabulary.buzzNouns[Math.floor(Math.random()*vocabulary.buzzNouns.length)];
    	},
    	buzz_verb_present: function() {
      		return vocabulary.buzzVerbsPresent[Math.floor(Math.random()*vocabulary.buzzVerbsPresent.length)];
    	},
    	number: function() {
    		return Math.floor(Math.random() * 1000) + 1;
    	}
  	}
});

function getStockImage(callback) {
	var CLIENTID = process.env.shutterstock_client_id;
	var SECRET = process.env.shutterstock_client_secret;

	if (!CLIENTID || !SECRET) {
		console.log("ERROR: Could not retrieve Shutterstock creds from config");
	}

	var api = shutterstock.v2({
		clientId: CLIENTID,
		clientSecret: SECRET
	});

	var query = ({
		query: "design OR technology OR ux",
		page: Math.floor(Math.random() * 1000) + 1,
		per_page: 1,
		width_from: 500,
		people_model_released: true,
		image_type: 'photo'
	});

	api.image.search(query, function(err,result){
		callback(null,result.data[0].assets.preview.url);
	});
}

function getCaption(callback) {
	var template = getTemplate();
	var caption = sentencer.make(template);

	callback(null,caption.charAt(0).toUpperCase() + caption.slice(1));
}

function getTemplate() {
	return templates[Math.floor(Math.random()*templates.length)];
}

module.exports = {
	init: function(req,res) {
		async.parallel([getStockImage, getCaption], function(err,results) {
			res.json({
				"response_type": "in_channel",
				"attachments":[{
					"text": results[1] || "Whoops. Something went wrong" ,
					"image_url": results[0] || ""
				}]
			});
		});
	}
};