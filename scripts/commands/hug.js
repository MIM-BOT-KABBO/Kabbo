module.exports.config = {
  name: "hug",
  version: "2.0.0",
  permission: 0,
  prefix: true,
  credits: "kabb",
  description: "Sends a hug image",
  category: "img",
  usage: "[@mention]",
  cooldown: 5,
  dependencies: {
    "axios": "latest",
    "fs-extra": "latest",
    "path": "latest",
    "jimp": "latest"
  }
};

module.exports.onLoad = async () => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const dirMaterial = __dirname + `/cache/canvas/`;
  const path = resolve(__dirname, 'cache', 'canvas', 'hugv1.png');
  if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
  if (!existsSync(path)) await downloadFile("https://i.ibb.co/3YN3T1r/q1y28eqblsr21.jpg", path);
}

async function makeImage({ one, two }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
  const jimp = global.nodemodule["jimp"];
  const __root = path.resolve(__dirname, "cache", "canvas");

  let batgiam_img = await jimp.read(__root + "/hugv1.png");
  let pathImg = `${__root}/batman${one}_${two}.png`;
  let avatarOne = `${__root}/avt_${one}.png`;
  let avatarTwo = `${__root}/avt_${two}.png`;

  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

  let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  let circleOne = await jimp.read(await circle(avatarOne));
  let circleTwo = await jimp.read(await circle(avatarTwo));
  batgiam_img.composite(circleOne.resize(150, 150), 320, 100).composite(circleTwo.resize(130, 130), 280, 280);

  let raw = await batgiam_img.getBufferAsync(jimp.MIME_PNG);

  fs.writeFileSync(pathImg, raw);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}

async function circle(image) {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync(jimp.MIME_PNG);
}

module.exports.run = async function ({ event, api }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions);
  if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
  else {
    const one = senderID, two = mention[0];
    try {
      const path = await makeImage({ one, two });
      return api.sendMessage({ body: "ইস তোমাকে তো অন্য বেডা জড়িয়ে ধরল আমি বস KABBO কে বলে দিব।😒🔪", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (error) {
      console.error("Error generating image:", error);
      return api.sendMessage("An error occurred while generating the image.", threadID, messageID);
    }
  }
} 
