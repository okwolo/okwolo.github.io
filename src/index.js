require('./style.scss');

const pages = require('./data/pages');

const okwolo = require('okwolo/lite');

const app = okwolo(document.querySelector('.wrapper'));

window.app = app;

app.setState({});

pages.forEach(({pathname, component}) => {
    app(pathname, component);
});
