const twit = require('twit')
const fs = require('fs');
const csv = require('csv-parser')
const textToImage = require('text-to-image');
const dotenv = require('dotenv');
const { TwitterApi } = require('twitter-api-v2');

dotenv.config();
const config = {
  consumer_key : process.env.CONSUMER_KEY,
  consumer_secret : process.env.CONSUMER_SECRET,
  access_token : process.env.ACCESS_TOKEN,
  access_token_secret : process.env.ACCESS_TOKEN_SECRET
};
// Twitter API V1 Client works for media uploads
let bot = new twit(config)
// Twitter API V2 Client works for manage tweets
const twitterClient = new TwitterApi({
  appKey: `${process.env.CONSUMER_KEY}`,
  appSecret: `${process.env.CONSUMER_SECRET}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
  accessSecret: `${process.env.ACCESS_TOKEN_SECRET}`,
});
const friends = [];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function postTweet(data){
    data = data.substring(22,);
    //console.log(data);
    bot.post('media/upload', { media_data: data } , function (err, data, response) {
      let mediaIdStr = data.media_id_string;
      //console.log(mediaIdStr);
      if(response){
        console.log("Media Upload Response Code:",response.statusCode);
        console.log ("Media Id:", mediaIdStr)

        twitterClient.v2.tweetThread([
          { text: '#Friends #friendstvshow', media: { media_ids: [mediaIdStr] } }
        ])
        .then(data => {
          console.log("Tweet response:",data);
        })
        .catch(error => {
          console.log("Error occured while tweeting:",error)
        });
      }else{
        console.log(err);
      }
      // var params = { status: '#Friends #friendstvshow', media_ids: [mediaIdStr] };
      // bot.post('statuses/update', params, function (err, data, response) {
      //   //console.log(data);
      //   if(response){
      //     console.log("Tweet Response Code:",response.statusCode);
      //   }else{
      //     console.log(err);
      //   }
      // })
    })
    
}

function genTweetImage(tweetText){
  textToImage.generate(tweetText, {
    debug: true,
    debugFilename: 'tweet.png',
    maxWidth: 720,
    fontSize: 22,
    fontFamily: 'Arial',
    lineHeight: 30,
    margin: 5,
    bgColor: "Black",
    textColor: "White"
  }).then(function (dataUri) {
      postTweet(dataUri);
  });
}

function startBot(){
  return new Promise( resolve => {
    fs.createReadStream('./data/friends_quotes.csv')
    .pipe(csv())
    .on('data', (data) => friends.push(data))
    .on('end', () => {
      console.log("CSV Records Imported: ",friends.length);
      let rand_no = Math.round(getRandomArbitrary(1,friends.length));
      console.log("Quote No: ",rand_no);
      
      genTweetImage(friends[rand_no].quote);
    });
  });
  

}

startBot();


module.exports = {
  startBot
}