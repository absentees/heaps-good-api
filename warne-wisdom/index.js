var request = require('request');

var tweetUrl = process.env.warne_tweets;
var imgPrefix = process.env.warne_image_prefix;
var imgCount = process.env.warne_image_count;
 
module.exports = {
	init: function(req,res) {
		request({
			url: tweetUrl,
			json: true
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var tweet = body[Math.floor(Math.random()*body.length)];

				res.json({
					"response_type": "in_channel",
					"attachments":[{
						"text": tweet.text,
						"image_url": randomImage()
					}]
				});
			}
		})

		function randomImage() {
			return imgPrefix + Math.floor(Math.random() * imgCount) + '.jpg';
		}
	}
};
