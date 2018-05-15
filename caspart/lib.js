const FaceDetectify = require("face-detectify");
const im = require("simple-imagemagick");
const download = require("image-downloader");
const fs = require("fs");
const moment = require("moment")

module.exports = {
	generateCaspart: inputPath => {
		return new Promise((resolve, reject) => {
			FaceDetectify.fromFile(`${inputPath}`)
				.then(res => {
					if (!fs.existsSync(`${__dirname}/img`)){
						fs.mkdirSync(`${__dirname}/img`);
					}

					im.composite(
						[
							`${__dirname}/caspart.png`,
							`${inputPath}`,
							"-geometry",
							`${res.data[0].height}x${res.data[0].width}+${
								res.data[0].x
							}+${res.data[0].y}`,
							`${__dirname}/img/generatedCaspart-${moment().format()}.jpg`
						],
						function(err, stdout) {
							if (err) return reject(err);
							// Return generated imagepath
							console.log("Generated Caspart.");
                            // return resolve(`${__dirname}/generatedCaspart.jpg`);
                            let obj = {
                                inputPath: inputPath,
                                outputPath: `${__dirname}/img/generatedCaspart-${moment().format()}.jpg`
                            };
                            return resolve(obj);
						}
					);
				})
				.catch(err => {
					return reject(err);
				});
		});
	},
	downloadImage: url => {
		return new Promise((resolve, reject) => {
			download
				.image({
					url: url,
					dest: `${__dirname}`
				})
				.then(({ filename, image }) => {
					console.log("File saved to", filename);
					return resolve(filename);
				})
				.catch(err => {
					return reject(err);
				});
		});
	},
	deleteFiles: files => {
		files.forEach(function(path) {
			fs.unlink(path, error => {
				if (error) {
					console.error("Failed to delete local file: " + error);
				} else {
					console.log("Deleted local: " + path);
				}
			});
		});
	}
};
