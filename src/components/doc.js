require('./doc.scss');

const Footer = require('./footer');
const Link = require('./link');

const makeID = (og) => {
    return (og || '').replace(/\./g, '_');
};

module.exports = ({icon, name, copy, children, menu = []}) => () => (
    ['div.tile-page', {}, [
        ['div.home-link', {}, [
            [Link, {path: '/'}, [
                ['h2.title', {}, [
                    'home',
                ]],
            ]],
        ]],
        !!menu.length && ['div.menu', {},
            menu.map((item) => {
                if (!item) {
                    return '';
                }
                return (
                    [Link, {path: `#${makeID(item)}`}, [
                        ['h3.title', {}, [
                            item,
                        ]],
                    ]]
                );
            }),
        ],
        ['div.center', {}, [
            !!icon && ['div.icon', {}, [
                ['img', {src: icon}],
            ]],
            !!name && ['h1.title', {}, [
                name,
            ]],
        ]],
        !!copy && ['p.copy', {}, [
            copy,
        ]],
        ...children.reduce((c, child, index) => {
            c.push([`hr#${makeID(menu[index]) || `section${index}`}`]);
            c.push(child);
            return c;
        }, []),
        ['hr'],
        [Footer],
    ]]
);
