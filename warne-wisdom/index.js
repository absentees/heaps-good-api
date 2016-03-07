var twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_token_key,
  access_token_secret: process.env.twitter_token_secret
});
