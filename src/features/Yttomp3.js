const { MessageMedia } = require("whatsapp-web.js")

class Yttomp3 {
    constructor (client) {
        this.client = client;
    }

    async run (msg) {
        msg.reply("masuk")
        console.log("masuk");
        switch (msg.body.includes()) {
            case "youtube":
                this.youtube(msg)
                break;
        
            default:
                msg.reply("ra ono")
                break;
        }
        msg.reply("masuk")
        const idYt = msg.body.split("/")[1]

        if (!idYt) {
            msg.reply("Silahkan ketik .yttomp3 <link yt>")
            return
        }

        const options = {
            method: 'GET',
            url: 'https://youtube-mp36.p.rapidapi.com/dl',
            params: {id: idYt},
            headers: {
                'X-RapidAPI-Key': '58f59793e8mshe9739fc58ca0e7cp10d656jsn3d727d5c165b',
                'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
            }
        };
    
        try {
            const response = await axios.request(options);
            console.log(response.data);
            const durasi = response.data.duration
            const jam = Math.floor(durasi / 3600)
            const menit = Math.floor(durasi / 60)
            const detik = Math.floor(durasi % 60)

            msg.reply("_Sedang di proses_")

            download(response.data.link, {
                directory: "./",
                filename: response.data.title
            }, async (err) => {
                if (err) {
                    console.log(err)
                }
                const title = response.data.title
                const music = fs.readFileSync(title, "base64")
                
                const pesan = await this.client.sendMessage(msg.from, title,{
                    media: new MessageMedia("audio/mpeg", music, title),
                })
                const sizeMB = parseFloat((pesan._data.size / 1000000).toFixed(1))
                this.client.sendMessage(msg.from, `*Informasi musik*\n\nJudul: ${response.data.title}\nDurasi: ${jam} Jam ${menit} menit ${detik} detik\nUkuran: ${sizeMB} MB (${pesan._data.size}B)`)
                console.log(pesan)
                fs.unlinkSync(title)
            })
        } catch (error) {
            console.log(error);
        }
    }

    async youtube (msg) {
        const axios = require('axios');

        const url = msg.body.split(" ")[1]

        const options = {
        method: 'GET',
        url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
        params: {
            url
        },
        headers: {
            'X-RapidAPI-Key': '58f59793e8mshe9739fc58ca0e7cp10d656jsn3d727d5c165b',
            'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = Yttomp3