const fs = require('fs');
const User = require('./models/UserModel');

class App {
    constructor(client) {
        this.client = client;
    }

    async loadFeature(msg) {
        try {
            let body = msg.body
            if (msg.body.length > 1) {
                body = msg.body.split(" ")[0]
            }
            const filename = body.charAt(1).toUpperCase() + body.slice(2);
            const path = `./src/features/${filename}.js`;
            

            if (fs.existsSync(path)) {
                let msgFrom = {
                    phone: msg.from.split('@')[0]
                }

                if (msg.author) {
                    msgFrom.phone = msg.author.split('@')[0]
                }

                const data = await User.findOne(msgFrom)

                if (!data) {
                    msg.reply("Kamu belum terdaftar, silahkan daftar terlebih dahulu dengan mengetikan .daftar <username>\ncontoh .daftar Rjwjyaa_31")
                    return
                }
                const classFeature = require(`./features/${filename}`);
                const classInstance = new classFeature(this.client);
                await classInstance.run(msg);
            }
        } catch (error) {
            console.log("Terjadi kesalahan pada server, mohon coba lagi atau laporkan kesalahan/bug pada owner\nError Message : "+error);
        }
        
    }
}

module.exports = App;
