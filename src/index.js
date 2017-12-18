require('./style.scss');
require('./index.html');

require('okwolo');

const okwolo = window.okwolo;

const app = okwolo(document.querySelector('.wrapper'));

app.setState({
    title: 'okwolo',
    tiles: [
        {
            title: 'syntax',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
            title: 'blobs',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.',
        },
        {
            title: 'modules',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
        },
        {
            title: 'kits',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
    ],
});

app(() => ({tiles, title}) => (
    ['div', {}, [
        ['div.banner', {}, [
            ['div.title', {},
                title.split('').map((letter) => (
                    ['div.letter', {}, [
                        ['img', {src: `/res/letters/${letter}.svg`}],
                        ['img.shadow', {src: `/res/letters/${letter}.svg`}],
                    ]]
                )),
            ],
            ['div.subtitle', {}, [
                'light javascript framework to build web applications',
            ]],
            ['div.buttons', {}, [
                ['div.button', {}, [
                    'Get Started',
                ]],
            ]],
        ]],
        ['div.tiles', {},
            tiles.map(({title, copy}) => (
                ['div.tile', {}, [
                    ['div.icon', {}, [
                        ['img', {src: `/res/icons/${title}.svg`}],
                        ['img.shadow', {src: `/res/icons/${title}.svg`}],
                    ]],
                    ['div.title', {}, [
                        title,
                    ]],
                    ['div.copy', {}, [
                        copy,
                    ]],
                    ['div.link', {}, [
                        'more info',
                    ]],
                ]]
            )),
        ],
    ]]
));

