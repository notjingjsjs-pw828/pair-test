// upload.js

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function upload(fileStream, fileName) {
    const form = new FormData();
    form.append('file', fileStream, fileName);

    const response = await axios.post('https://manager-session-ben-r7g4.onrender.com/api/upload', form, {
        headers: form.getHeaders()
    });

    if (response.data?.url) {
        return response.data.url; // لینک نهایی آپلود
    } else {
        throw new Error("Upload failed: " + JSON.stringify(response.data));
    }
}

module.exports = { upload };