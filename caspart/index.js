var Airtable = require("airtable");
var isURL = require("is-url");
var casparter = require("./lib");
const fs = require("fs");


module.exports = {
	init: function(req, res) {
		// Handle the request
		if (req.body.text) {
			let request = req.body.text.split(" ");

			switch (request[0]) {
				case "generate":
					if (isURL(request[1])) {
						let downloadImageURL = request[1];

						if (!fs.existsSync(`${__dirname}/img`)){
							fs.mkdirSync(`${__dirname}/img`);
						}

						casparter
							.downloadImage(downloadImageURL)
							.then(file => {
								return casparter.generateCaspart(file,`${__dirname}/img`);
							})
							.then(files => {
								res.json({
									"response_type": "in_channel",
									attachments: [
										{
											image_url: 'http://heaps-good-api.herokuapp.com/casparts/' + files.outputFilename
										}
									]
								});
								casparter.deleteFiles([
									files.inputPath								]);
							})
							.catch(err => {
								res.json({
									text: err,
									"color": "#F35A00"
								});
							});
					} else {
						res.json({
							text: "Your URL wasn't valid sorry."
						});
					}
					break;
				default:
					res.json({
						text: "Unable to handle that request sorry."
					});
					break;
			}
		} else {
			// No text just call random caspart
			this.randomCaspart(res);
		}
	},
	randomCaspart: function(res) {
		var base = new Airtable({
			apiKey: process.env.airtable_api
		}).base(process.env.airtable_caspart_base);
		const casparts = [];

		base("Casparts")
			.select({
				view: "All"
			})
			.eachPage(
				function page(records, fetchNextPage) {
					records.forEach(function(record) {
						casparts.push({
							artist: record.get("Artist") || "Anonymous",
							imageURL: record.get("Art")[0].url
						});
					});

					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}

					var returnImage =
						casparts[Math.floor(Math.random() * casparts.length)];

					res.json({
						response_type: "in_channel",
						attachments: [
							{
								text: returnImage.artist,
								image_url: returnImage.imageURL
							}
						]
					});
				}
			);
	}
};
