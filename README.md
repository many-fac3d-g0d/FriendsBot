# 🫂FriendsBot

A simple nodejs bot using twitter API v1.1 & github actions that tweets random F.R.I.E.N.D.S quotes daily

![B1ngChandler](https://pbs.twimg.com/profile_images/1349769390128988161/frXJP7k4_400x400.jpg)

![tweet_image](https://pbs.twimg.com/media/GNKhEx2XMAAR0l-?format=png&name=small)
<div>
  <blockquote class="twitter-tweet"><p lang="qme" dir="ltr"><a href="https://twitter.com/hashtag/Friends?src=hash&amp;ref_src=twsrc%5Etfw">#Friends</a> <a href="https://twitter.com/hashtag/friendstvshow?src=hash&amp;ref_src=twsrc%5Etfw">#friendstvshow</a> <a href="https://t.co/yLyovtaKRs">pic.twitter.com/yLyovtaKRs</a></p>&mdash; Chandler Bing (@B1ngChandler) <a href="https://twitter.com/B1ngChandler/status/1788669107400737134?ref_src=twsrc%5Etfw">May 9, 2024</a>
  </blockquote>
</div>


## 📦Setup

```
git clone
npm install
npm start
```

Apply for twitter developer account [here](https://developer.twitter.com/en/apply-for-access) and get the required access keys.

Setup .env as below with twitter API secrets
```
CONSUMER_KEY="XXX"
CONSUMER_SECRET="XXX"
ACCESS_TOKEN="XXX"
ACCESS_TOKEN_SECRET="XXX"

```

## 🚀Live Demo

See the bot live in action [here](https://www.twitter.com/B1ngChandler)

## 👨‍🍳API (Deprecated backend no longer available)

Access the bot's API endpoint to generate a random quote in JSON
```
>curl -s "https://friends-b0t.herokuapp.com/quote"
>{"quote":"Chandler: So, is he house trained or is he going to leave little bathroom tiles all over the place?\n\n"}
```

