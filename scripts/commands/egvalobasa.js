const fs = require("fs");
module.exports = {
  config:{
  name: "🥰",
        version: "1.0.1",
        prefix: false,
  permssion: 0,
  credits: "nayan", 
  description: "Fun",
  category: "no prefix",
  usages: "😍",
        cooldowns: 5, 
},

handleEvent: function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
  if (body.indexOf("💝")==0 || body.indexOf("🤩")==0 || body.indexOf("😍")==0 || body.indexOf("🥰")==0) {
    var msg = {
        body: "এ্ঁতো্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্মাঁর্‌ বস্ঁ কাব্য্ঁ কে্ঁ একটু্ঁ দাও্ঁ 🥰",
        attachment: fs.createReadStream(__dirname + `/Nayan/valobasa.mp3`)
      }
      api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true)
    }
  },
  start: function({ nayan }) {

  }
} 
