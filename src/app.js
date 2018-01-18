const okwolo = require('okwolo/lite');

let app;
try {
    app = okwolo();
} catch (e) {}

module.exports = app;
