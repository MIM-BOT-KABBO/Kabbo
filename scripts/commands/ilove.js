const fs = require("fs");
module.exports.config = {
  name: "iloveu",
  version: "2.0.0",
  permission: 0,
  credits: "nayan",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("I love you")==0 || (event.body.indexOf("i love you")==0 || (event.body.indexOf("I love u")==0 || (event.body.indexOf("I love you")==0)))) {
    var msg = {
        body: "𝗛𝗠𝗠... 𝗔𝗠𝗥 𝗕𝗢𝗦𝗦 𝗞𝗔𝗕𝗕𝗢 𝗢 𝗧𝗠𝗞 𝗩𝗔𝗟𝗢𝗕𝗔𝗛𝗔𝗘😇😻 :))"
    }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

}
