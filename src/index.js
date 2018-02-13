require('./style.scss');

require('./prism.scss');
require('./prism.js');

const app = require('./app');
const pages = require('./pages');

const wrapper = document.querySelector('.wrapper');

app.use('target', wrapper);

app.setState({});

app.on('redirect', () => {
    window.scrollTo(0, 0);
});

pages.forEach(({pathname, title, component}) => {
    app(pathname, () => () => {
        document.title = title;
        if (!window.location.hash) {
            wrapper.style.opacity = 0;
            setTimeout(() => {
                wrapper.style.opacity = 1;
            }, 0);
        }
        return [component];
    });
});

app('**', () => () => {
    console.log('redirecting ...');
    app.redirect('/');
    return '';
});
