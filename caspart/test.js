const casparter = require("./lib.js");

casparter
	.downloadImage(
		"https://bbd-1tmxd3aba43noa.stackpathdns.com/data/images/full/209/jobs-jpg.jpg"
	)
	.then(file => {
		return casparter.generateCaspart(file);
	})
	.then(files => {
		return casparter.deleteFiles([files.inputPath]);
	})
	.catch(err => {
		console.log(err);
	});
