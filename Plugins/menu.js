const fs = require('fs');
const sharp = require('sharp');
const config = require('../config'); // Ensure the correct path to the config file

async function handleMenuCommand(sock, message) {
    const remoteJid = message.key.remoteJid;
    const msg = message.message;

    if (!remoteJid || !msg) {
        console.error('remoteJid or message content is undefined');
        return;
    }

    const text = msg.conversation || msg.extendedTextMessage?.text;
    if (text && text.trim() === '.menu') {
        const menuMessage = `Here are the available commands:
        \n🔶*Owner Commands*
        \n♨️ .statusseen on - Turn on status seen
        \n♨️ .statusseen off - Turn off status seen
        \n♨️ .readon - Turn on read receipts
        \n♨️ .readoff - Turn off read receipts
        
        \n\n🔶*General Commands*
        \n♨️ .alive - Check if the bot is alive
        \n♨️ .speedtest - Check the network speed
        \n♨️ .ping - Check the ping time of the bot
        \n♨️ .uptime - Check the uptime of the bot

        \n\n🔶*Search Commands*
        \n♨️ .movie <query> - Search for a movie
        \n♨️ .news <country> - Get the latest news articles
        \n♨️ .wiki <query> - Search Wikipedia
        \n♨️ .define <word> - Get the definition of a word

        \n\n🔶*Random Commands*
        \n♨️ .joke - Get a random joke
        \n♨️ .quote - Get a random quote

        \n\n🔶*Game Commands*
        \n♨️ .trivia - Play the trivia game
        \n\n> ${config.botFooter}
        `;

        const imagePath = 'Media/menu.jpg'; // Replace with your actual image path

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const resizedImageBuffer = await sharp(imageBuffer)
                .resize({ width: 300 }) // Resize image if necessary
                .toBuffer();

            // Reply to the original message sender
            await sock.sendMessage(remoteJid, {
                image: resizedImageBuffer,
                caption: menuMessage,
                quotedMessageId: message.messageID // Quote the original message
            });
            console.log(`Replied to command .menu from ${remoteJid}`);
        } catch (error) {
            console.error('Failed to send menu command image message:', error);
        }
    }
}

module.exports = handleMenuCommand;
