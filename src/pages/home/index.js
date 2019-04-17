require('./style.scss');

const Codeblock = require('../../components/codeblock');
const Footer = require('../../components/footer');
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
        copy: 'Modules are very similar in purpose and capabilities to blobs, but they differ in the sense that they have already been consumed by the app at creation time. This also allows them to have privileged access to the app\'s "official" global object.',
    },
    {
        title: 'kits',
        copy: 'Kits represent pre-configured app bundles. These bundles are built from a group of modules and can be customized infinitely to add or remove features to the produced app as a project demands it. Okwolo currently ships with three different kits which share many modules, but behave very differently.',
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
                [Link, {path: '#quickstart'}, [
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
                <script src="https://dl.okwolo.org/standard.min.js"></script>
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
                app('**', () => (state) => (
                    ['div.greeting.default', {}, [
                        state.defaultGreeting,
                    ]]
                ));
            `]],
            ['p.copy', {}, [
                'For more information, read the ',
                [Link, {path: '/api/'}, [
                    'api guide',
                ]],
                '.',
            ]],
        ]],
        ['hr#about'],
        ['div.about', {}, [
            ['h2.title', {}, [
                'About',
            ]],
            ['p.copy', {}, [
                'Okwolo is meant to be used and distributed in kits, each with their own unique flavor and purpose. Although there are currently only three officially supported kits, the modules they are built from are can be reused and replaced easily.',
            ]],
            ['p.copy', {}, [
                'Okwolo\'s kits/modules are designed to support asynchronous configuration. This means that an instantiated app\'s config can be modified at any time without needing to be restarted. An example use case of this property would be to progressively load a web app\'s routes/actions while a user is navigating a page.',
            ]],
            ['p.copy', {}, [
                'Each module also contains a lot of error catching code to fail as fast as possible when a problem occurs, and to provide clear and useful feedback. This means errors should always have added context. If you find an error that is not handled, please ',
                [Link, {path: 'https://github.com/okwolo/okwolo/issues/new'}, ['open an issue']],
                '.',
            ]],
            ['p.copy', {}, [
                'The two client side kits "standard" and "lite" come ready with a built-in client-side router. The "standard" kit also includes more advanced state management which takes inspiration from the redux pattern.',
            ]],
            ['p.copy', {}, [
                'The view portion of okowlo uses a vdom implementation which runs keyed diffs to update layout. It also allows for scoped updates of this layout to update individual components. For more details about components, visit the ',
                [Link, {path: '/syntax/'}, ['syntax page']],
                '.',
            ]],
            ['p.copy', {}, [
                'For the view syntax, a decision was made early on to avoid non-standard javascript language features. Although things like jsx or vue\'s single-file-components are powerful tools, they add distance between the developer and the code running in the browser. Not only do these new constructs need to be learned, it also means that users who transpile get a different experience from those using a simple script tag to load the library.',
            ]],
        ]],
        ['hr'],
        [Footer],
    ]]
);
