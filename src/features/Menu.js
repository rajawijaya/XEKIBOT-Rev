const fs = require('fs');
const {MessageMedia} = require('whatsapp-web.js');

class Menu {
    constructor(client) {
        this.client = client;
    }

    run(msg) {
        const mediaData = fs.readFileSync("./profile.png", "base64")

        this.client.sendMessage(msg.from, '\uD835\uDE52 \uD835\uDE40 \uD835\uDE47 \uD835\uDE3E \uD835\uDE4A \uD835\uDE48 \uD835\uDE40   \uD835\uDE4F \uD835\uDE4A   \uD835\uDE53 \uD835\uDE40 \uD835\uDE46 \uD835\uDE44 \uD835\uDE3D \uD835\uDE4A \uD835\uDE4F \u30C5\r\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\r\n\r\n\u2630 *MENU*\r\n\r\n\r\n\u2554\u2550\u2550\u2550\u2563\u300E *INFO* \u300F\u2551\r\n\u2560\u2550\u233A .myinfo\r\n\u255A\u2550\u2550\u2550\u2563\r\n\r\n\r\n\u2554\u2550\u2550\u2550\u2563\u300E *STICKER* \u300F\u2551\r\n\u2560\u2550\u233A .sticker <caption media>\r\n\u255A\u2550\u2550\u2550\u2563\r\n\r\n\r\n\u2554\u2550\u2550\u2550\u2563\u300E *ANIME*\u300F\u2551\r\n\u2560\u2550\u233A .animewaifu\r\n\u2560\u2550\u233A .animeblush\r\n\u2560\u2550\u233A .animebonk\r\n\u2560\u2550\u233A .animehug\r\n\u255A\u2550\u2550\u2550\u2563\r\n\r\n\r\n\u2554\u2550\u2550\u2550\u2563\u300E *JOKES*\u300F\u2551\r\n\u2560\u2550\u233A .jokesreceh\r\n\u2560\u2550\u233A .jokesgambar\r\n\u255A\u2550\u2550\u2550\u2563\r\n\r\n\r\n\u2554\u2550\u2550\u2550\u2563\u300E *DOWNLOADER*\u300F\u2551\r\n\u2560\u2550\u233A .yttomp3 <id youtube> \u272E\r\n\u255A\u2550\u2550\u2550\u2563', {
            media: new MessageMedia("image/png", mediaData)
        });
    }
}

module.exports = Menu;
