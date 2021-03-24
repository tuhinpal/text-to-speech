const express = require('express');
const gTTS = require('gtts');
const app = express();
const fs = require('fs');

app.use(express.json())

app.get('*', (req, res) => {
    res.send(fs.readFileSync('./template/index.html', 'utf-8'))
})

app.post('*', (req, res) => {
    res.contentType('audio/mpeg');
    var gtts = new gTTS(req.body.text, req.body.language);
    gtts.stream().pipe(res);
})

const port = process.env.PORT || 8080
app.listen(port, function() {
    console.log(`Listening at Port: ${port}`)
})