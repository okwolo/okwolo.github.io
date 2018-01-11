const Codeblock = require('../../components/codeblock');

const pageName = 'syntax';

module.exports = () => () => (
    ['div.tile-page', {}, [
        ['div.center', {}, [
            ['div.icon', {}, [
                ['img', {src: `/res/icons/${pageName}.svg`}],
            ]],
            ['h1.title', {}, [
                pageName,
            ]],
        ]],
        ['p.copy', {}, [
            'The view syntax is designed with a priority given to familiarity and with the goal of not needing to be transpiled. Elements are represented as an array containing the tagName, attributes and children. To facilitate common use cases ids, classes and styles can all be added inline after the tagName',
        ]],
        ['hr'],
        // text elements
        ['h2.title', {}, [
            'text elements',
        ]],
        [Codeblock, {}, [`
            let textElement = 'FizzBuzz';
        `]],
        ['p.copy', {}, [
            'Text elements produce a simple textNode and can be nested within more complex elements.',
        ]],
        ['p.copy', {}, [
            'Numbers can also be passed as a text element and will be converted to a string. Booleans and the null value will render nothing. An undefined text element will throw an error.',
        ]],
        ['hr'],
        // tag elements
        ['h2.title', {}, [
            'tag elements',
        ]],
        ['p.copy', {}, [
            'Tag elements represent the traditional html nodes. (parentheses used for readability)',
        ]],
        [Codeblock, {}, [`
            const tagElement = (
                ['div', {}, [
                    ['a', {href: 'http://okwolo.org'}, [
                        'website link',
                    ]],
                ]]
            );
        `]],
        ['p.copy', {}, [
            'For convenience, the tag string is parsed to extract the id, classname(s) and style. The "className" element attribute also supports ',
            ['a', {href: 'https://www.npmjs.com/package/classnames', target: '_blank'}, ['classnames']],
            ' style format.',
        ]],
        [Codeblock, {}, [`
            const tagElement = (
                ['div#wrapper', {}, [
                    ['div.class | width: 10px;'],
                    ['div', {
                        className: {
                            selected: true,
                            hide: !!window.isHidden,
                        },
                    }],
                ]]
            );
        `]],
        ['hr'],
        // components
        ['h2.title', {}, [
            'components',
        ]],
        ['p.copy', {}, [
            'Components have the same syntax as tag elements, but instead of having a tagName string, the first item in the array is a component function. At it\'s simplest, components can be written as a curried function which returns an element (or another component).',
        ]],
        [Codeblock, {}, [`
            const Component = () => () => (
                ['div.component', {}, [
                    'This is a test component',
                ]]
            );

            const componentElement = (
                [Component]
            );
        `]],
        ['p.copy', {}, [
            'Components can also receive props which are derived from the element\'s attributes object. The props will always include an array of the component\'s children (empty array when there are none). The second argument is an update function. This function can be used to trigger a scoped layout update that will only affect the current the component. Arguments passed to the update function are forwarded to the element generating function.',
        ]],
        [Codeblock, {}, [`
            let Component = (props, update) => (updateArgs = {}) => (
                ['div', {}, [
                    ...props.children,
                    ['span.name', {}, [
                        updateArgs.name || props.initialName,
                    ]],
                    ['button', {onclick: () => update({name: 'Steve'})}, [
                        'Steve',
                    ]],
                    ['button', {onclick: () => update({name: 'Emma'})}, [
                        'Emma',
                    ]],
                ]],
            );

            let layout = (
                ['div', {}, [
                    [Component, {initialName: 'John'}, [
                        ['h1', {}, [
                            'Pick your name!',
                        ]],
                    ]],
                ]]
            );
        `]],
        ['hr'],
        // footer
        ['div.footer.center', {}, [
            ['a', {href: 'https://github.com/okwolo/okwolo', target: '_blank'}, [
                ['h2.title', {}, [
                    'View on GitHub',
                ]],
            ]],
        ]],
    ]]
);