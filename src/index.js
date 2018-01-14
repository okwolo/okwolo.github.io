require('./style.scss');

const okwolo = require('okwolo/lite');

const pages = require('./pages');

const wrapper = document.querySelector('.wrapper');

const app = okwolo(wrapper);

window.app = app;

app.setState({});

pages.forEach(({pathname, title, component}) => {
    app(pathname, () => () => {
        document.title = title;
        if (!window.location.hash) {
            wrapper.style.opacity = 0;
            setTimeout(() => {
                window.scrollTo(0, 0);
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
