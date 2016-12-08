var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));

router.use(function(req, res, next){
	if (req.body.token == process.env.slack_token || req.body.token == process.env.slack_token_2 || req.body.token == process.env.slack_token_3 || req.body.token == process.env.slack_token_4  || req.body.token == process.env.slack_token_5 || req.body.token == process.env.slack_token_6) {
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

//API ROUTES
router.route('/business-time').post(function(res,req){
	require('./business-time').init(res,req);
});

router.route('/peesee').post(function(res,req){
	require('./peesee/').init(res,req);
});

router.route('/clark').post(function(res,req) {
	require('./clark/').init(res,req);
});

router.route('/arturo').post(function(res,req) {
	require('./arturo/').init(res,req);
});

router.route('/caspart').post(function(res,req) {
	require('./caspart/').init(res,req);
});

router.route('/warne-wisdom').post(function(res,req) {
	require('./warne-wisdom/').init(res,req);
});
