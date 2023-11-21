const { MessageMedia } = require('whatsapp-web.js');
const User = require('../models/UserModel');
const ImgPlaceholder = require('../utils/ImgPlaceholder');

class Myinfo {
    constructor(client) {
        this.client = client;
    }

    async run(msg) {
        try {            
            msg.reply('_Mohon tunggu sebentar, sedang mecari informasi pengguna_')

            let msgFrom = {
                phone: msg.from.split('@')[0]
            }
            
            if (msg.author) {
                msgFrom.phone = msg.author.split('@')[0]
            }
            
            const data = await User.findOne(msgFrom)

            const template = new ImgPlaceholder(this.client)
            const url = await template.myInfoTemplate(msg)

            const img = await MessageMedia.fromUrl(url, {
                unsafeMime: true
            })

            this.client.sendMessage(msg.from, `\u250F\u2501\u2501\u2501\u252B\u300E *User Information* \u300F\u2503\u30C5\r\n\u2523\u25A3 Name : ${data.name}\r\n\u2523\u25A3 Number : ${data.phone}\r\n\u2523\u25A3 Role : ${data.role}\r\n\u2523\u25A3 EXP : ${data.level.exp}\r\n\u2523\u25A3 Level : ${data.level.level}\r\n\u2523\u25A3 Rank : ${data.rank}\r\n\u2523\u25A3 Limit : ${data.limitPerDay.limit}\r\n\u2523\u25A3 Subs Plan: ${data.subscription.plan}\r\n\u2523\u25A3 Expired: ${data.subscription.expired}\r\n\u2517\u2501\u2501\u2501\u252B`, {
                media: img
            })
            
        } catch (error) {
            msg.reply(`terjadi kesalahan pada server, mohon coba lagi atau hubungi owner ${error}`);
        }
            
    }
}

module.exports = Myinfo;
