const fileDownload = require('file-download');
const { basename } = require('path');
const { title } = require('process');
const { MessageMedia } = require('whatsapp-web.js');

class Debug {
    constructor (client) {
        this.client = client;
    }
    
    async run (msg) {
        try {
            msg.reply("masuk")
            const ytdl = require('ytdl-core');
            const fs = require('fs');

    
            const videoUrl = 'https://www.youtube.com/watch?v=EMqyEtwCQXE&ab_channel=Naka'; // Ganti dengan URL video YouTube yang sesuai
            msg.reply("sedang mencari informasi")
            const res = await ytdl.getInfo(videoUrl);
            const format = ytdl.chooseFormat(res.formats, {filter: "audioonly"})
            console.log(format);
            const info = res.videoDetails
            const path = info.title + '.mp3'
            // ytdl.downloadFromInfo(res, { filter: 'audioonly' }).pipe(fs.createWriteStream(path))
            msg.reply("sedang mengunduh thumbnail")
            console.log(info.thumbnails[4].url);
            const thumbnail = await MessageMedia.fromUrl(info.thumbnails[4].url, {
                unsafeMime: true
            })
            const music = fs.readFileSync(path, 'base64') 
            const media = new MessageMedia('audio/mpeg', music, path)
            // console.log(music);
            msg.reply("sedang mengunduh music")
            await this.client.sendMessage(msg.from,`*${info.title}*\n\n${info.description}\n\nChannel : ${info.ownerChannelName}\nUpload : ${info.uploadDate}\nViews : ${info.viewCount}\nDuration : ${info.lengthSeconds}`, {
                media: thumbnail
            })
            await this.client.sendMessage(msg.from, "", {
                media: media,
            })
            // fs.unlinkSync(path)
            

        } catch (error) {
            msg.reply(error)
        }


        
    }
}


module.exports = Debug