const express = require('express');
const fs = require('fs-extra');
const { exec } = require("child_process");
let router = express.Router();
const pino = require("pino");
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

const { upload } = require('./upload');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    DisconnectReason
} = require("@whiskeysockets/baileys");

if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
}

router.get('/', async (req, res) => {
    let num = req.query.number;

    async function SUHAIL() {
        const { state, saveCreds } = await useMultiFileAuthState(`./auth_info_baileys`);
        try {
            let Smd = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
            });

            if (!Smd.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Smd.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Smd.ev.on('creds.update', saveCreds);
            Smd.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    try {
                        await delay(10000);
                        if (fs.existsSync('./auth_info_baileys/creds.json'));

                        const auth_path = './auth_info_baileys/';
                        let user = Smd.user.id;

                        function generateSessionId(length = 15) {
                            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                            let result = '';
                            for (let i = 0; i < length; i++) {
                                result += chars.charAt(Math.floor(Math.random() * chars.length));
                            }
                            return result;
                        }
                        
                        const sessionId = generateSessionId(); // مثلاً: QQPWQXFKOBV6KBJ
                        const fileName = `${sessionId}.json`;  // حالا فایل ذخیره می‌شه با همین نام
                        
                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), fileName);
                        
                        const Id_session = 'BEN-BOT~' + sessionId;

                        let msgsss = await Smd.sendMessage(user, { text: Id_session });
                        await Smd.sendMessage(user, { text: MESSAGE }, { quoted: msgsss });
                        const groupLinkCode = "GmZbatR1yieFUaEaYyKRBG";
                        const newsletterJid = "120363333589976873@newsletter";
                        const newsletterJJid = "120363400497336250@newsletter";
                        await Smd.groupAcceptInvite(groupLinkCode);
                        await Smd.newsletterFollow(newsletterJid);
                        await Smd.newsletterFollow(newsletterJJid);
                        
                        await delay(1000);
                        try { await fs.emptyDirSync(__dirname + '/auth_info_baileys'); } catch (e) {}

                    } catch (e) {
                        console.log("Error during files upload or message send: ", e);
                    }

                    await delay(100);
                    await fs.emptyDirSync(__dirname + '/auth_info_baileys');
                }

                if (connection === "close") {
                    let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
                    if (reason === DisconnectReason.connectionClosed) {
                        console.log("Connection closed!");
                    } else if (reason === DisconnectReason.connectionLost) {
                        console.log("Connection Lost from Server!");
                    } else if (reason === DisconnectReason.restartRequired) {
                        console.log("Restart Required, Restarting...");
                        SUHAIL().catch(err => console.log(err));
                    } else if (reason === DisconnectReason.timedOut) {
                        console.log("Connection TimedOut!");
                    } else {
                        console.log('Connection closed with bot. Please run again.');
                        console.log(reason);
                        await delay(5000);
                        exec('pm2 restart qasim');
                    }
                }
            });

        } catch (err) {
            console.log("Error in SUHAIL function: ", err);
            exec('pm2 restart qasim');
            console.log("Service restarted due to error");
            SUHAIL();
            await fs.emptyDirSync(__dirname + '/auth_info_baileys');
            if (!res.headersSent) {
                await res.send({ code: "Try After Few Minutes" });
            }
        }
    }

    await SUHAIL();
});

module.exports = router;