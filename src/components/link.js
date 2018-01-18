const app = require('../app');

const onclick = (path) => (e) => {
    if (!e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        app.redirect(path);
    }
};

module.exports = ({path, children}) => {
    const isHashChange = !!path.match(/^#.*/g);
    const isNavigation = !!path.match(/^\/.*/g);
    const attributes = {
        href: path,
    };
    if (isNavigation) {
        attributes.onclick = onclick(path);
    } else {
        if (!isHashChange) {
            attributes.target = '_blank';
        }
    }
    return () => (
        ['a.link', attributes, children]
    );
};
