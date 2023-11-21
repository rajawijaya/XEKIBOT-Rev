class Tomp3 {
    constructor (client) {
        this.client = client;
    }

    async run (msg) {
        switch (msg.title) {
            case "www.youtube.com":
                msg.reply("yt")
                this.youtube(msg)
                break;
        
            default:
                break;
        }
    }   

    async youtube (msg) {
        const axios = require('axios');
        const download = require("file-download")
        const fs = require("fs")
        const { MessageMedia } = require("whatsapp-web.js")

        const url = msg.description

        const options = {
            method: 'GET',
            url: 'https://fast-tubedown-videos-api.p.rapidapi.com/',
            params: {
              vid: url
            },
            headers: {
              'X-RapidAPI-Key': '58f59793e8mshe9739fc58ca0e7cp10d656jsn3d727d5c165b',
              'X-RapidAPI-Host': 'fast-tubedown-videos-api.p.rapidapi.com'
            }
        };

        msg.reply("tunggu")

        try {
            const response = await axios.request(options);
            console.log(response.data);


            await download(response.data.link, {
                directory: "./",
                filename: response.data.title
            }, async (err) => {
                if (err) {
                    console.log(err)
                    return
                }
                const title = response.data.title
                const music = fs.readFileSync(title, "base64")
                const durasi = response.data.duration
                const jam = Math.floor(durasi / 3600)
                const menit = Math.floor(durasi / 60)
                const detik = Math.floor(durasi % 60)
                
                const pesan = await this.client.sendMessage(msg.from, title,{
                    media: new MessageMedia("audio/mpeg", music, title),
                })
                const sizeMB = parseFloat((pesan._data.size / 1000000).toFixed(1))
                this.client.sendMessage(msg.from, `*Informasi musik*\n\nJudul: ${response.data.title}\nDurasi: ${jam} Jam ${menit} menit ${detik} detik\nUkuran: ${sizeMB} MB (${pesan._data.size}B)`)
                console.log(pesan)
                fs.unlinkSync(title)
            })
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = Tomp3