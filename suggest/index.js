var Airtable = require('airtable');
var moment = require('moment');

module.exports = {
	init: function(req,res){
		var base = new Airtable({
			apiKey: process.env.airtable_api
		}).base(process.env.airtable_base_id);

		var suggestionText = req.body.text;

		base('All').create({
			"Suggestion": suggestionText,
			"Date Added": moment().format("YYYY-MM-DD")
		}, function(err, record){
			if (err) {
				console.log(err);
				res.json({
					"text": "Something went wrong",
					"color": "#F35A00"
				});
			} else {
				console.log(record);
				res.json({
					"text": "Suggestion Added!",
					"color": "#7CD197"
				});
			}
		});
	}
};
