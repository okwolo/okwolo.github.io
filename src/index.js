require('./style.scss');
require('./index.html');

const okwolo = require('okwolo/lite');

const tiles = require('./data/tiles');

const app = okwolo(document.querySelector('.wrapper'));

app.setState({
    title: 'okwolo',
    tiles,
});

app(() => ({tiles, title}) => (
    ['div', {}, [
        ['div.banner', {}, [
            ['div.title', {},
                title.split('').map((letter) => (
                    ['div.letter', {}, [
                        ['div.wrapper', {}, [
                            ['img', {src: `/res/letters/${letter}.svg`}],
                        ]],
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
                    ['h1.title', {}, [
                        title,
                    ]],
                    ['p.copy', {}, [
                        copy,
                    ]],
                    ['div.link', {}, [
                        'more info',
                    ]],
                ]]
            )),
        ],
        ['hr'],
        ['div.quickstart', {}, [
            ['h1.title', {}, [
                'Quick Start',
            ]],
            ['p.copy', {}, [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            ]],
        ]],
    ]]
));

