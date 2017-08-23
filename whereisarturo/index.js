var async = require('async');
var Xray = require('x-ray');
var moment = require('moment');

module.exports = {
	init: function (req, res) {
		var x = Xray();
		x('https://untappd.com/user/Kripy', '.item', {
			beer: 'div.checkin > div.top > p > a:nth-child(2)',
			brewery: 'div.checkin > div.top > p > a:nth-child(3)',
			location: 'div.checkin > div.top > p > a:nth-child(4)',
			comment: 'div.checkin > div.top > div > p',
			time: 'div.checkin > div.feedback > div.bottom > a.time.timezoner.track-click'
		})(function (err, checkin) {
			if (err) {
				console.log("Error: " + err);
			}

			checkin.time = moment(checkin.time, "dd, DD MMM YYYY hh:mm:ss ZZ").fromNow();

			// Construct sentencer
			var res = "Arturo was last seen " + checkin.time + " at " + checkin.location + " drinking a " + checkin.beer + " by " + checkin.brewery + "."

			res.json({
				"response_type": "in_channel",
				"attachments": [{
					"text": res
				}]
			});
		});
	}
};
