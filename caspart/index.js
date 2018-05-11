var Airtable = require("airtable");

module.exports = {
	init: function(req, res) {
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
