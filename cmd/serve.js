const express = require('express');
const readline = require('readline');

const port = 4321;

const app = express();

app.use(express.static('dist'));

const server = app.listen(port, () => {
    console.log('running at ' + port);
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        server.close();
        process.exit(0);
    }
});
