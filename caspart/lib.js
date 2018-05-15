const FaceDetectify = require("face-detectify");
const im = require("simple-imagemagick");
const download = require("image-downloader");
const moment = require("moment")
const fs = require("fs");


module.exports = {
	generateCaspart: (inputPath, dir) => {
		return new Promise((resolve, reject) => {
			FaceDetectify.fromFile(`${inputPath}`)
				.then(res => {
					if (!res.data) {
						return reject('No faces found in image.');
					}

					let filename = `generatedCaspart-${moment().format()}.jpg`;

					im.composite(
						[
							`${__dirname}/caspart.png`,
							`${inputPath}`,
							"-geometry",
							`${res.data[0].height}x${res.data[0].width}+${
								res.data[0].x
							}+${res.data[0].y}`,
							`${dir}/${filename}`
						],
						function(err, stdout) {
							if (err) return reject(err);
							// Return generated imagepath
							console.log(`${dir}/${filename}`);
                            
                            let obj = {
                                inputPath: inputPath,
                                outputFilename: `${filename}`
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
