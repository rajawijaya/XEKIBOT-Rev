const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { mongoose, Schema } = require('mongoose');

const App = require('./src/App');
const User = require('./src/models/UserModel');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'xekibot',
    }),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    try {
        const app = new App(client);
        const result = await app.loadFeature(msg);
    } catch (error) {
        console.log(error);
    }


    if (msg.body.split(' ')[0] == '.daftar') {
        let msgFrom = msg.from.split('@')[0]

        if (msg.author) {
            msgFrom = msg.author.split('@')[0]
        }

        const addUser = new User({
            name: msg.body.split(' ')[1],
            phone: msgFrom
        });

        addUser.save()
            .then((data) => {
                msg.reply(`Terimakasih ${data.name} karena kamu sudah mendaftar, sekarang kamu bisa menikmati layanan di XEKIBOT`);
            })
            .catch((err) => {
                if (err.code == 11000) {
                    msg.reply('kamu sudah pernah mendaftar');
                } else {
                    msg.reply('Ada kesalahan pada server, mohon coba lagi atau hubungi owner ' + err);
                }
            });

        return
    }

});

mongoose.connect('mongodb://127.0.0.1:27017/xekibot')
    .then(() => {
        client.initialize();
        console.log('berhasil terhubung dengan database');
    })
    .catch((err) => console.error(err));
