var async = require('async');
var tumblr = require('tumblr');

var oauth = {
	consumer_key: process.env.tumblr_oauth_consumer,
	consumer_secret: process.env.tumblr_oauth_secret,
	token: process.env.tumblr_token,
	token_secret: process.env.tumblr_token_secret
};

var blog = new tumblr.Blog('celebritiesridingscooters.tumblr.com', oauth);

module.exports = {
	init: function(req,res) {
		blog.info(function(error,response) {
			var postCount = response.blog.posts;
			blog.photo({
				limit: 1,
				offset: Math.floor(Math.random() * postCount)
			}, function(error, response) {
			  	if (error) {
			    	throw new Error(error);
			  	}
			  	res.json({
					"response_type": "in_channel",
					"attachments":[{
						"text": "" ,
						"image_url": response.posts[0].photos[0].original_size.url
					}]
				});
			 });
		});
	}
};
