var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

var shutterstock = require('shutterstock');
var firebase = require('firebase');


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
	if (req.body.token == process.env.slack_token || req.body.token == process.env.slack_token_2) {
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

//************************//
//                        //
//        TOILET          //
//                        //
//************************//
router.route('/peesee')
  .post(function(req,res){
    var FIREBASE_URL = process.env.firebase_url;

    if (!FIREBASE_URL) {
      console.log("Could not retrieve firebase url from config");
    }

    var rootRef = new firebase(FIREBASE_URL);
		var status = "";

    rootRef.on("value", function(data){
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
		} else if(status == "false") {
			res.json({
				"text": "It looks like the toilet is:",
				"attachments": [{
					"fallback": "Vacant. You're good to go.",
					"text": "Vacant. You're good to go.",
					"color": "good"
				}]
			});
		} else{
			res.json({
				"text": "Sorry something went wrong, maybe just walk over and check yourself?"
			});
		}
  });
