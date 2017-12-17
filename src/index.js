require('./style.scss');
require('./index.html');

require('okwolo');

const okwolo = window.okwolo;

const app = okwolo(document.querySelector('.wrapper'));

app.setState({});

app(() => () => (
    ['div', {}, [
        ['div.banner', {}, [
            ['div.title', {},
                'okwolo'.split('').map((letter) => (
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
                ['div.button.shadow', {}, [
                    'Get Started',
                ]],
            ]],
        ]],
    ]]
));

