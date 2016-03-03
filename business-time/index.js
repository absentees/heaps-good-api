var shutterstock = require('shutterstock');

var CLIENTID = process.env.shutterstock_client_id;
var SECRET = process.env.shutterstock_client_secret;

module.exports = {
	var api = shutterstock.v2({
		clientId: CLIENTID,
		clientSecret: SECRET
	});

	var query = ({
		query: "business man " + req.body.text,
		page: 1,
		per_page: 1,
		width_from: 500,
		people_model_released: true
	});

	api.image.search(query, function(err,data){
		if (err) {
			throw err;
		}

		if (data.data.length > 0) {
			res.json({
				"response_type": "in_channel",
				"attachments":[{
					"text": data.data[0].description || "No description",
					"image_url": data.data[0].assets.preview.url || ""
				}]
			});
		}
	});
};
