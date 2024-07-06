const fs = require('fs');
const config = require('.././config'); 

//-------------------------
const statusDownloadCommand = async (m, gss) => {
  try {
    if (m && m.body) {
      const textLower = m.body.toLowerCase();

      const triggerWords = [
        'send', 'ewannako'
      ];

      if (triggerWords.includes(textLower)) {
        if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo) {
          const quotedMessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

          if (quotedMessage) {
            if (quotedMessage.imageMessage) {
              const imageCaption = quotedMessage.imageMessage.caption;
              const imageUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
              await gss.sendMessage(m.from, {
                image: { url: imageUrl },
                caption: imageCaption,
                contextInfo: {
                  mentionedJid: [m.sender],
                  forwardingScore: 9999,
                  isForwarded: true,
                },
              });
            }

            if (quotedMessage.videoMessage) {
              const videoCaption = quotedMessage.videoMessage.caption;
              const videoUrl = await gss.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
              await gss.sendMessage(m.from, {
                video: { url: videoUrl },
                caption: videoCaption,
                contextInfo: {
                  mentionedJid: [m.sender],
                  forwardingScore: 9999,
                  isForwarded: true,
                },
              });
            }
          }
        }
      }
    } else {
      console.log('Invalid message received:', m);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = statusDownloadCommand;
