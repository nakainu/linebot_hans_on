'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
var config = require('./config');
var array =[
    'うん',
    'わかる',
    'せやな',
    'ええんちゃう?',
    'そやな',
    'それな',
    'あれな',
    'ほんま',
    'あほくさ',
    'やめたら？'
  ];

const localconfig = {
  channelSecret: config.channelSecret,
  channelAccessToken: config.channelAccessToken
};

const app = express();

app.post('/webhook', line.middleware(localconfig), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(localconfig);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let replyText = '';
  if (event.message.text){
    replyText = array[Math.floor(Math.random() * array.length)];
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    // text: event.message.text
    text: replyText
  });
}

app.listen(PORT);
app.listen(config.port);
console.log(`Server running at ${PORT}`);
