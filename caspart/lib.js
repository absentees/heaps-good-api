const FaceDetectify = require("face-detectify");
const im = require("simple-imagemagick");
const download = require('image-downloader')
const fs = require('fs');

module.exports = {
	generateCaspart: (input) => {
		FaceDetectify.fromFile(`${__dirname}/${input}`)
		.then(res => {        
			im.composite(
				[
					`${__dirname}/caspart.png`,
					`${__dirname}/test.jpg`,
					"-geometry",
					`${res.data[0].height}x${res.data[0].width}+${res.data[0].x}+${res.data[0].y}`,
					`${__dirname}/output-test.jpg`
				],
				function(err, stdout) {
					if (err) return Promise.reject(err);
					return Promise.resolve("Caspart generated.");
				}
			);
		})
		.catch(err => {
			return Promise.reject(err);
		});
	},
	downloadImage: (url) => {
		return new Promise((resolve, reject) => {
			download.image({
				url: url,
				dest: `${__dirname}`
			})
			.then(({ filename, image }) => {
				console.log('File saved to', filename)
				return resolve(filename);
			}).catch((err) => {
				return reject(err);
			})
		});
	},
	deleteFile: (file) => {
		fs.unlink(file, (err) => {
			if (err) throw err;
		});
	}
}



