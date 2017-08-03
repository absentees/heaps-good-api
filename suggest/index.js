var Airtable = require('airtable');
var AIRTABLE_BASE_ID = process.env.airtable_base_id;
var AIRTABLE_API = process.env.airtable_api;

var base = new Airtable({
	apiKey: AIRTABLE_API
}).base(AIRTABLE_BASE_ID);


module.exports = {
	init: function(req,res){
		var suggestionText = req.body.text;

		base('All').create({
			"Suggestion": suggestionText;
			"Date Added": moment().format("YYYY-MM-DD")
		}, function(err, record){
			if (err) {
				console.error(err);
				res.json({
					"text": "Something went wrong",
					"color": "#F35A00"
				});
			} else {
				res.json({
					"text": "Suggestion Added!",
					"color": "color": "#7CD197"
				});
			}
		});
	}
};
