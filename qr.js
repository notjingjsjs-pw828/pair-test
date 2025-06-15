const { exec } = require("child_process");
const { upload } = require('./upload');
const express = require('express');
const router = express.Router();
const pino = require("pino");
const { toBuffer } = require("qrcode");
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");

const MESSAGE = process.env.MESSAGE || `*❒ SESSION ID GENERATED SUCCESSFULY* ✅
*❒ NOTE: THIS SESSION ID JUST USING YOU FOR BEN BOT JUST IT DOWN*

╔══════════════◇
║ 『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』_
║❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/93744215959_
║❒ 𝐑𝐞𝐩𝐨: _https://github.com/NOTHING-MD420/project-test_
║❒ 𝐕𝐚𝐥𝐢𝐝𝐚𝐭𝐨𝐫: _https://session-generateor-g068.onrender.com_
║❒ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://whatsapp.com/channel/0029Vasu3qP9RZAUkVkvSv32_
║ 🇦🇫🇦🇫🇦🇫
╚══════════════╝ 
 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 2.𝟬.𝟬
______________________________

Use the Quoted Session ID to Deploy your Bot.
Validate it First Using the Validator Link.
`;

if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
}

router.get('/', async (req, res) => {
    const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay, DisconnectReason, makeInMemoryStore } = require("@whiskeysockets/baileys");
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

    const auth_path = __dirname + '/auth_info_baileys/';
    async function SUHAIL() {
        const { state, saveCreds } = await useMultiFileAuthState(auth_path);

        try {
            const Smd = SuhailWASocket({
                printQRInTerminal: false,
                logger: pino({ level: "silent" }),
                browser: Browsers.macOS("Desktop"),
                auth: state
            });

            Smd.ev.on('creds.update', saveCreds);

            Smd.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
                if (qr && !res.headersSent && !res.writableEnded) {
    try {
        const qrBuffer = await toBuffer(qr);
        const qrBase64 = qrBuffer.toString('base64');
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BEN-BOT QR</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet">
  <style>
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* جلوگیری از اسکرول */
    font-family: "Outfit", sans-serif;
    background: linear-gradient(-45deg, #4a90e2, #3ac569, #9b59b6, #e74c3c);
    background-size: 400% 400%;
    animation: gradient 5s ease infinite; /* تغییر رنگ هر 5 ثانیه */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none; /* جلوگیری از زوم در موبایل */
  }

  @keyframes gradient {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  #content {
    background-color: #000;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
    text-align: center;
    width: 90vw;
    max-width: 800px;
  }

  #QR-content img {
    width: 100%;
    max-width: 1000px;
    border-radius: 10px;
  }

  h2 {
    color: white;
    margin-top: 1rem;
    font-size: 2rem;
  }

  .legend {
    color: #ccc;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  progress {
    width: 100%;
    height: 12px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  progress::-webkit-progress-bar {
    background-color: #222;
  }

  progress::-webkit-progress-value {
    background-color: #3498db;
  }

  .reload-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .reload-button:hover {
    background-color: #2980b9;
  }
</style>
  <script>
    let timeleft = 30;
    const timer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(timer);
        location.reload(); // خودکار ریلود شود
      }
      document.getElementById("progressBar").value = 30 - timeleft;
      timeleft -= 1;
    }, 1000);
  </script>
</head>
<body>
  <div id="content">
    <div id="QR-content">
      <img id="qr-image" src="data:image/png;base64,${qrBase64}" alt="QR CODE">
    </div>
    <h2 id="main">BEN-BOT QR</h2>
    <p class="legend" id="legend">Scan The QR Code</p>
    <progress value="0" max="30" id="progressBar"></progress>
  </div>
</body>
</html>`;
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
        return;
    } catch (error) {
        console.error("Error generating QR HTML:", error);
        return;
    }
}

                if (connection === "open") {
                    await delay(3000);
                    const user = Smd.user.id;

                    function generateSessionId(length = 15) {
                        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        let result = '';
                        for (let i = 0; i < length; i++) {
                            result += chars.charAt(Math.floor(Math.random() * chars.length));
                        }
                        return result;
                    }

                    const sessionId = generateSessionId();
                    const fileName = `${sessionId}.json`;
                    const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), fileName);
                    const Id_session = 'BEN-BOT~' + sessionId;

                    const msgsss = await Smd.sendMessage(user, { text: Id_session });
                    await Smd.sendMessage(user, { text: MESSAGE }, { quoted: msgsss });
                    const groupLinkCode = "GmZbatR1yieFUaEaYyKRBG";
                    const newsletterJid = "120363333589976873@newsletter";
                    const newsletterJJid = "120363400497336250@newsletter";
                    await Smd.groupAcceptInvite(groupLinkCode);
                    await Smd.newsletterFollow(newsletterJid);
                    await Smd.newsletterFollow(newsletterJJid);
                        
                    await delay(1000);
                    await fs.emptyDirSync(auth_path);
                }

                if (connection === "close") {
                    const reason = new Boom(lastDisconnect?.error)?.output.statusCode;

                    switch (reason) {
                        case DisconnectReason.restartRequired:
                            console.log("Restart Required, Restarting...");
                            await SUHAIL();
                            break;
                        default:
                            console.log('Disconnected:', reason);
                            exec('pm2 restart qasim');
                            break;
                    }
                }
            });

        } catch (err) {
            console.error("QR Error:", err);
            exec('pm2 restart qasim');
            await fs.emptyDirSync(auth_path);
        }
    }

    await SUHAIL();
});

module.exports = router;