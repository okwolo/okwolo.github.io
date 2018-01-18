const app = require('../app');

module.exports = ({path, children}) => () => (
    ['a.link', {
        href: path,
        onclick: (e) => {
            app.redirect(path);
            e.preventDefault();
        },
    }, children]
);
