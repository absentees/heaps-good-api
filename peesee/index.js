var shutterstock = require('shutterstock');
var firebase = require('firebase');

var FIREBASE_URL = process.env.firebase_url;
var rootRef = new firebase(FIREBASE_URL);
var status = "";


module.exports = {
	init: function(req,res){
		rootRef.on("value", function(data) {
			status = data.val()["occupied"];
		});

		if (status == "true") {
			res.json({
				"text": "It looks like the toilet is:",
				"attachments": [{
					"fallback": "Occupied. Hold tight.",
					"text": "Occupied. Hold tight.",
					"color": "danger"
				}]
			});
		} else if (status == "false") {
			res.json({
				"text": "It looks like the toilet is:",
				"attachments": [{
					"fallback": "Vacant. You're good to go.",
					"text": "Vacant. You're good to go.",
					"color": "good"
				}]
			});
		} else {
			res.json({
				"text": "Sorry something went wrong, maybe just walk over and check yourself?"
			});
		}
	}
};
