require('./style.scss');

const tiles = require('../../data/tiles');

const Codeblock = require('../../components/codeblock');
const Link = require('../../components/link');

module.exports = () => () => (
    ['div', {}, [
        ['div.banner', {}, [
            ['div.title', {},
                'okwolo'.split('').map((letter) => (
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
                ['a', {href: '#quickstart'}, [
                    ['div.button', {}, [
                        'Get Started',
                    ]],
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
                    ['h2.title', {}, [
                        title,
                    ]],
                    ['p.copy', {}, [
                        copy,
                    ]],
                    [Link, {path: `/${title}/`}, [
                        'more info',
                    ]],
                ]]
            )),
        ],
        ['hr#quickstart'],
        ['div.quickstart', {}, [
            ['h2.title', {}, [
                'Quick Start',
            ]],
            ['p.copy', {}, [
                'To use okwolo as a package, simply require the desired kit directly.',
            ]],
            [Codeblock, {}, [`
                require('okwolo/standard');
            `]],
            ['p.copy', {}, [
                'Alternatively, the library can be imported using a script tag. The okwolo function will be available in the global window object.',
            ]],
            [Codeblock, {}, [`
                <script src="/standard.min.js"></script>
            `]],
            ['p.copy', {}, [
                'Here is a minimal Hello-World application which demonstrates the use of the router and some basic view syntax.',
            ]],
            [Codeblock, {}, [`
                const app = okwolo(document.body);

                app.setState({
                    customGreeting: 'Hello',
                    defaultGreeting: 'Hello World!',
                });

                // layout rendered with username from path params
                app('/user/:username', ({username}) => (state) => (
                    ['div.greeting.custom', {}, [
                        state.customGreeting + ' ' + username,
                    ]]
                ));

                // fallback layout if the path does not match
                app(() => (state) => (
                    ['div.greeting.default', {}, [
                        state.defaultGreeting,
                    ]]
                ));
            `]],
        ]],
        ['hr'],
        ['div.footer', {}, [
            ['a', {href: 'https://github.com/okwolo/okwolo'}, [
                ['h2.title', {}, [
                    'View on GitHub',
                ]],
            ]],
        ]],
    ]]
);
