require('./doc.scss');

const Link = require('../components/link');

module.exports = ({icon, name, copy, children, menu = []}) => (
    ['div.tile-page', {}, [
        ['div.home-link', {}, [
            [Link, {path: '/'}, [
                ['h2.title', {}, [
                    '< back',
                ]],
            ]],
        ]],
        !!menu.length && ['div.menu', {},
            menu.map((item) => {
                if (!item) {
                    return '';
                }
                return (
                    ['a', {href: `#${item}`}, [
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
            c.push([`hr#${menu[index] || `section${index}`}`]);
            c.push(child);
            return c;
        }, []),
        ['hr'],
        ['div.footer.center', {}, [
            ['a', {href: 'https://github.com/okwolo/okwolo', target: '_blank'}, [
                ['h2.title', {}, [
                    'View on GitHub',
                ]],
            ]],
        ]],
    ]]
);
