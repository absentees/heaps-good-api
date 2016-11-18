var async = require('async');

var theMemes = [
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/1.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/2.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/3.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/4.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/5.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/6.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/7.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/8.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/9.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/10.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/11.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/12.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/13.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/14.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/15.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/16.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/17.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/18.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/19.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/20.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/21.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/22.gif",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/23.jpg",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/24.jpg",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/25.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/26.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/27.png",
  "http://pc.prescache.com.s3.amazonaws.com/caspart/b7FTVxAtfEApNLnG8fLZcWqkjUvxwr/28.png"
];

module.exports = {
	init: function(req,res) {

  var returnImage = theMemes[Math.floor(Math.random()*theMemes.length)];

  res.json({
    "response_type": "in_channel",
    "attachments":[{
      "text": "" ,
      "image_url": returnImage
    }]
  });

	}
};
