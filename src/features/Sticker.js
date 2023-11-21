const fs = require("fs");
const {MessageMedia} = require("whatsapp-web.js");


class Sticker {
    constructor (client) {
        this.client = client;
    }

    async run (msg) {
        if (msg.hasMedia) {
            try {
              // download media
              const media = await msg.downloadMedia();
            
              // Simpan media sebagai file temporary
              const filename = `temp_${Date.now()}.${media.mimetype.split('/')[1]}`;
              await fs.promises.writeFile(filename, media.data, 'base64');
                
              msg.reply("_sedang proses_")
  
              // Kirim stiker sebagai balasan
              const sticker = await this.client.sendMessage(msg.from, new MessageMedia(media.mimetype, media.data, filename), {
                sendMediaAsSticker: true,
                stickerAuthor: "XEKIBOT",
                stickerName: "Sticker Created By"
              });
        
              console.log('Stiker terkirim:', sticker);
        
              fs.unlinkSync(filename);
            } catch (error) {
              console.error('Terjadi kesalahan saat mengirim stiker:', error);
            }
          } else {
            // Jika tidak ada media (gambar) dalam pesan
            msg.reply("Kirimkan sebuah gambar lalu ketik caption .sticker");
          }
    }
}


module.exports = Sticker