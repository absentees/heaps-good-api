const FaceDetectify = require("face-detectify");
const im = require("simple-imagemagick");

FaceDetectify.fromFile(`${__dirname}/test.jpg`)
	.then(res => {
        console.log(res);
        

		im.composite(
			[
                `${__dirname}/caspart.png`,
                `${__dirname}/test.jpg`,
				"-geometry",
                `${res.data[0].height}x${res.data[0].width}+${res.data[0].x}+${res.data[0].y}`,
				`${__dirname}/output-test.jpg`
			],
			function(err, stdout) {
				if (err) console.log(err);
				console.log(stdout);
			}
		);
	})
	.catch(console.error);
