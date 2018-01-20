const path = require('path');
const readline = require('readline');

const express = require('express');

const port = 4321;

const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = app.listen(port, () => {
    console.log('running at ' + port);
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        server.close();
        console.log('exit serve');
        process.exit(0);
    }
});
