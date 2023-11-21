const User = require('../models/UserModel');
const axios = require('axios');


class ImgPlaceholder {
    constructor (client) {
        this.client = client;
    }

    async myInfoTemplate (msg) {

        try {
            let msgFrom = msg.from.split('@')[0]
            
            if (msg.author) {
                msgFrom = msg.author.split('@')[0]
            }

            const data = await User.findOne({phone: msgFrom})

            const payload = { 
                html: `<!DOCTYPEhtml> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,initial-scale=1.0"> <title> ImagePlaceholder </title> <link rel="stylesheet" href="style.css"> <style> </style> </head> <body> <div class="container" id="container" > <img src="${await this.client.getProfilePicUrl(msgFrom + '@c.us')}" alt=""> <div class="name" > <h1>${data.name}</h1> <p>${data.role}</p> </div> </div> <script src="script.js"> </script> </body> </html>`,
                css: `.container{width:600px;height:400px;background-image:url('https://i.ibb.co/mXDFmtr/bg.jpg');background-size:cover;background-repeat:no-repeat;position:absolute;transform:translate(-50%,-50%);top:50%;left:50%;display:flex;gap:50px;align-items:center;}img{width:150px;height:150px;border-radius:150px;margin-left:50px;}.name{line-height:20px;}h1{color:white;}p{color:rgb(221,221,221);font-weight:bold;font-size:1.5em;}`,
                selector: ".container",
                viewport_width: 600,
                viewport_height: 400,
            };
    
            let headers = { 
                auth: {
                    username: '6d543bb7-39f6-4ace-bf74-ecb2237abfe4',
                    password: '43af96d0-a0ea-47ec-89f2-e6936af5342b'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await axios.post('https://hcti.io/v1/image', JSON.stringify(payload), headers);
                    
            return response.data.url

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = ImgPlaceholder