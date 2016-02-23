var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var shutterstock = require('shutterstock');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

router.get('/', function(req, res){
  res.json({
    message: "returning some json mate"
  });
});

router.use(function(req, res, next){
	if (req.body.token == process.env.slack_token) {
		// Request has come from slack, all good
		console.log("TOKEN MATCHES");
		next();
	} else {
		// nah mate who are ya
		console.log(req.body);
		console.log("TOKEN DONT MATCH");
	}
});

app.use('/api', router);


//****************************//
//														//
//			BUSINESS TIME					//
//														//
//****************************//
router.route('/business-time')
	.post(function(req,res){
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
			query: "business man" + req.body.text,
			page: 1,
			per_page: 1,
			width_from: 500,
			people_gender: "both",
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

	});
