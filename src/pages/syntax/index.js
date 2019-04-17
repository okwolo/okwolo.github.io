const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');
const Link = require('../../components/link');

const name = 'syntax';
const icon = '/res/icons/syntax.svg';
const copy = 'The view syntax is designed with a priority given to familiarity and with the goal of not needing to be transpiled. Elements are represented as an array containing the tagName, attributes and children. To facilitate common use cases ids, classes and styles can all be added inline after the tagName';

module.exports = () => () => (
    [Doc, {name, icon, copy}, [
        ['div.section', {}, [
            ['h2#text.title', {}, [
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
        ]],
        ['div.section', {}, [
            ['h2#elements.title', {}, [
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
                [Link, {path: 'https://www.npmjs.com/package/classnames'}, ['classnames']],
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
            ['p.copy', {}, [
                'Including a key in the attributes will ensure that the element will be diffed with itself on next update. If no key is specified, the array index is used instead.',
            ]],
            [Codeblock, {}, [`
                const list = [{id: 321, data: ...}, {id: 456, data: ...}];

                const tagElement = (
                    ['div', {},
                        list.map(({id, data}) => (
                            ['div', {key: id}, [
                                ...
                            ]]
                        )),
                    ]
                );
            `]],
        ]],
        ['div.section', {}, [
            ['h2#components.title', {}, [
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
                'Components can also receive props which are derived from the element\'s attributes object. The props will always include an array of the component\'s children (empty array when there are none).',
            ]],
            ['p.copy', {}, [
                'The second argument is an update function. This function can be used to trigger a scoped layout update that will only affect the current component. Arguments passed to the update function are forwarded to the element generating function.',
            ]],
            [Codeblock, {}, [`
                let NameComponent = (props, update) => {
                    let displayedName = props.initialName;

                    const nameChoices = [
                        'Steve',
                        'Emma',
                    ];

                    const changeName = (name) => () => {
                        if (nameChoices.indexOf(name) < 0) {
                            update('Error: Name is not in the list!');
                            return;
                        }
                        displayedName = name;
                        update();
                    };

                    return (error) => (
                        ['div', {}, [
                            ['div.decoration', {}, [
                                ...props.children,
                            ]],
                            !!error && (
                                ['div.error', {}, [
                                    error,
                                ]]
                            ),
                            ['span.name', {}, [
                                displayedName,
                            ]],
                            ['div.buttons', {},
                                nameChoices.map((name) => (
                                    ['button', {onclick: changeName(name)}, [
                                        name,
                                    ]]
                                )),
                            ],
                        ]]
                    );
                };

                let layout = (
                    ['div', {}, [
                        [NameComponent, {initialName: 'John'}, [
                            ['h1', {}, [
                                'Pick your name!',
                            ]],
                        ]],
                    ]]
                );
            `]],
            ['p.copy', {}, [
                'The model of having a function X which returns a function Y which returns an element is very convenient. The first benefit is that function X will only be called once (unless a parent up the chain gets updated). This makes it the perfect place to parse props and provide clean data for the Y function to render from. Since variables declared in X are in the Y function\'s scope, they can be treated as the component\'s state and used accordingly. As shown in the above example, functions can also be declared within this scope to provide utilities to modify "state" and then update the layout when they complete.',
            ]],
            ['p.copy', {}, [
                'The update function should generally not be "leaked" out of the component. If it is called after the component has been replaced, okwolo will throw an error. Calling update will add that task to a queue to be executed in the same order they are added. This means calling update within the X function (as defined in the earlier paragraph) will not preempt the initial draw and it\'s result will be correctly displayed. It also means it is safe to call update within itself as long as the recursion avoids maxing out the stack.',
            ]],
        ]],
    ]]
);
