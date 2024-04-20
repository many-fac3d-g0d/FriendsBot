# FriendsBot

A simple nodejs bot using twitter API v1.1 & github actions that tweets random F.R.I.E.N.D.S quotes daily

## Setup

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

## Live Demo

See the bot live in action [here](https://www.twitter.com/B1ngChandler)

## API (Deprecated backend no longer available)

Access the bot's API endpoint to generate a random quote in JSON
```
>curl -s "https://friends-b0t.herokuapp.com/quote"
>{"quote":"Chandler: So, is he house trained or is he going to leave little bathroom tiles all over the place?\n\n"}
```

