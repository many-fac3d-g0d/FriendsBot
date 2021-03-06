const config = require('./data/config')
const twit = require('twit')
//const schedule = require('node-schedule');
const cron = require('cron');
const fs = require('fs');
const csv = require('csv-parser')
const textToImage = require('text-to-image');
const express = require('express');

let path = require('path');

let bot = new twit(config)
const friends = [];
let port = process.env.PORT || 8000;

const app = express();

app.get('/data/*',(req,res)=>{
  res.status(404).send("Joey doesnt share food :)")
})

app.use('/static', express.static('./static'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./'));

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function postTweet(data){
    data = data.substring(22,);
    console.log(data);
    bot.post('media/upload', { media_data: data } , function (err, data, response) {
      let mediaIdStr = data.media_id_string;
      console.log(mediaIdStr);
      if(response){
        console.log("Response Code:",response.statusCode);
      }else{
        console.log(err);
      }
      var params = { status: 'The One With ...', media_ids: [mediaIdStr] };
      bot.post('statuses/update', params, function (err, data, response) {
        console.log(data);
        if(response){
          console.log("Response Code:",response.statusCode);
        }else{
          console.log(err);
        }
      })
  
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

function startBot(isApi){
  return new Promise( resolve => {
    fs.createReadStream('./data/friends_quotes.csv')
    .pipe(csv())
    .on('data', (data) => friends.push(data))
    .on('end', () => {
      console.log("CSV Imported",friends.length);
      let rand_no = Math.round(getRandomArbitrary(1,friends.length));
      console.log("Rand",rand_no);
      if(!isApi){
        let dataUri = genTweetImage(friends[rand_no].quote);
      }
      else{
        resolve(friends[rand_no]);
      }
      //postTweet(friends[rand_no].quote);
      
    });
  });
  

}

//startBot();
let server = app.listen((port),()=>{
  console.log(`B1ngChandler is now online at http://localhost:${port}`);
  //var setSchedule = schedule.scheduleJob({hour:20,minute:30},startBot);
  const cronJob = new cron.CronJob('0 35 22 * * *',startBot);
  cronJob.start();
});

app.get('/', (req, res) => { 
  console.log("Serving index file")
  res.sendFile('index.html',{ root: './' });
});

app.get('/quote', (req, res) => {
  let isApi = true;
  let data = startBot(isApi);
  data.then((dat) => {
    let sendData = {};
    sendData.quote = dat.quote;
    console.log('Data to api endpoint :', dat.quote);
    res.send(sendData);
  });

});

  