var GoogleImages = require('google-images');
var randomItemInArray = require('random-item-in-array');

module.exports = {
	init: function(req,res){
		var client = new GoogleImages(process.env.google_cse_id, process.env.google_cse_api_key);
		
		var query = randomItemInArray(['puppy','dog']) + " " + req.body.text;

		client.search(query, {
			safeSearch: 'high',
			type: 'photo'
		}).then(images => {
			var image = randomItemInArray(images);
			if(image) {
				res.json({
					"response_type": "in_channel",
					"attachments":[{
						"image_url": image.url
					}]
				});
			}
		});
	}
};
