require('./style.scss');

const Codeblock = require('../../components/codeblock');
const Link = require('../../components/link');

const tiles = [
    {
        title: 'syntax',
        copy: 'The view syntax is designed with a priority given to familiarity and with the goal of not needing to be transpiled. Elements are represented as an array containing the tagName, attributes and children. To facilitate common use cases ids, classes and styles can all be added inline after the tagName.',
    },
    {
        title: 'blobs',
        copy: 'Blobs are powerful configuration objects which all modules can listen for. This allows for customization far beyond what is available directly through the api. Okwolo is purposefully built to handle the addition of blobs at any time in an application\'s lifecycle.',
    },
    {
        title: 'modules',
        copy: 'Modules are very similar in purpose and capabilities to blobs, but they differ in the sense that they have already been consumed by the app at creation time. This also alows them to have privileged access to the app\'s "official" global object.',
    },
    {
        title: 'kits',
        copy: 'Kits represent preconfigured app bundles. These bundles are built from a group of modules and can be customized infinitely to add or remove features to the produced app as a project demands it. Okwolo currently ships with three different kits which share many modules, but behave very differently.',
    },
];

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
                'Here is a small Hello-World application which demonstrates the use of the router and some basic view syntax.',
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
            ['a', {href: 'https://github.com/okwolo/okwolo', target: '_blank'}, [
                ['h2.title', {}, [
                    'View on GitHub',
                ]],
            ]],
        ]],
    ]]
);
