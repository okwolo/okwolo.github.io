const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');
const Example = require('../../components/example');
const Link = require('../../components/link');

const name = 'api';
const menu = [
    'okwolo',
    'app',
    'setState',
    'getState',
    'act',
    'undo',
    'redo',
    'redirect',
    'show',
    'use',
    'update',
];

module.exports = () => () => (
    [Doc, {name, menu}, [
        ['div.section', {}, [
            ['h2.title', {}, [
                'okwolo()',
            ]],
            [Codeblock, {}, [`
                const app = okwolo([target[, window]]);
                  // target: DOM node
                  // window: window object can be specified if needed
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    const okwolo = require('okwolo/standard');

                    // create an app that does not render (target blob can be added later)
                    const app1 = okwolo();

                    // create an app that renders to the body
                    const app2 = okwolo(document.body);

                    // create an app that uses a different window object
                    const app3 = okwolo(document.body, _window);
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app()',
            ]],
            ['p.copy', {}, [
                'The app function defines the layout for the application. It is overloaded to also accept a path as first argument in order to easily describe routes.',
            ]],
            [Codeblock, {}, [`
                app(init)
                  // init: curried element builder function [() => (state) => element]
                app(route, init);
                  // route: string pattern to match paths (same as in express)
                  // init: curried element builder function [(routeParams) => (state) => element]
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    const app = okwolo(document.body);

                    app.setState({
                        greeting: 'Hello ',
                        default: 'Hello World!',
                    });

                    // render this element if path matches
                    app('/user/:username', ({username}) => (state) => (
                        ['div', {}, [
                            state.greeting,
                            username,
                        ]]
                    ));

                    // fallback to render this element regardless of route
                    app(() => (state) => (
                        ['div', {}, [
                            state.default,
                        ]]
                    ));
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.setState()',
            ]],
            ['p.copy', {}, [
                'Sets the state from which layout is created.',
            ]],
            ['p.copy', {}, [
                'The setState function needs to be called in order for the app to render to any target.',
            ]],
            [Codeblock, {}, [`
                app.setState(state);
                  // state: an object to replace the current state
                app.setState(updater);
                  // updater: function that returns the new state [(currentState) => ... newState]
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    // will not render until state is set
                    app(() => (state) => (
                        ['div', {}, [
                            ['h1', {}, [
                                'Title',
                            ]],
                            ['p', {}, [
                                'Content',
                            ]],
                        ]]
                    ));

                    // will throw an error if state has not been set
                    app.act('ACTION_TYPE');

                    // will throw an error if state has not been set
                    app.getState();

                    // set the internal state
                    app.setState({});
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.getState()',
            ]],
            ['p.copy', {}, [
                'Returns a copy of the current state.',
            ]],
            [Codeblock, {}, [`
                app.getState();
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app.setState([0, 1, 2]);

                    app.getState(); // [0, 1, 2]
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.act()',
            ]],
            ['p.copy', {}, [
                'Executes an action on the state.',
            ]],
            [Codeblock, {}, [`
                app.act(type[, params]);
                  // type: string of the action type
                  // params: arguments given to the action handler
                app.act(action);
                  // action: function that returns the new state [(currentState) => ... newState]
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app.setState({
                        friendlist: [],
                    });

                    app.use('action', {
                        type: 'ADD_FRIEND',
                        target: [],
                        handler: (state, newFriend) => {
                            state.friendlist.push(newFriend);
                            return state;
                        },
                    });

                    const newFriend = {
                        name: 'John',
                        hobbies: ['kayaking', 'cooking'],
                    };

                    /* calling an ADD_FRIEND action and passing
                    the newFriend to the action handler */
                    app.act('ADD_FRIEND', newFriend);
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.undo()',
            ]],
            ['p.copy', {}, [
                'Undoes the last action (or setState).',
            ]],
            [Codeblock, {}, [`
                app.undo();
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app.setState(0);

                    app.use('action', {
                        type: 'INC',
                        target: [],
                        handler: (state, amount = 1) => {
                            return state + amount;
                        },
                    });

                    app.act('INC'); // 1
                    app.act('INC', 3); // 4
                    app.undo(); // 1
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.redo()',
            ]],
            ['p.copy', {}, [
                'Redoes the previous action.',
            ]],
            [Codeblock, {}, [`
                app.redo();
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app.setState(0);

                    app.use('action', {
                        type: 'INC',
                        target: [],
                        handler: (state, amount = 1) => {
                            return state + amount;
                        },
                    });

                    app.act('INC'); // 1
                    app.act('INC', 3); // 4
                    app.undo(); // 1
                    app.redo(); // 4
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.redirect()',
            ]],
            ['p.copy', {}, [
                'Changes the url and renders layout from the new route.',
            ]],
            [Codeblock, {}, [`
                app.redirect(path[, params]);
                  // path: string of the new pathname
                  // params: object to be passed to the route handler
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app('/home', (params) => (state) => (
                        ['div', {}, [
                            params.content || 'home',
                        ]]
                    ));

                    // renders the route and passes it the params
                    // will also change the browser's url
                    app.redirect('/home', {content: 'Hello World!'});
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.show()',
            ]],
            ['p.copy', {}, [
                'Renders layout from the new route.',
            ]],
            [Codeblock, {}, [`
                app.show(path[, params]);
                  // path: string of the requested route's path
                  // params: object to be passed to the route handler
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    app('/home', (params) => (state) => (
                        ['div', {}, [
                            params.content || 'home',
                        ]]
                    ));

                    // renders the route and passes it the params
                    // will NOT change the browser's url
                    app.show('/home', {content: 'Hello World!'});
                `]],
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.use()',
            ]],
            ['p.copy', {}, [
                'Adds a blob to the app and notifies all modules.',
            ]],
            [Codeblock, {}, [`
                app.use('blobName', arg1, arg2, ...);
                  // blob: the blob to be added
                  // args: any object supported by the configured blob handler
            `]],
            [Example, {}, [
                [Codeblock, {}, [`
                    // use a blob with a target key
                    app.use('target', document.querySelector('body .wrapper'));

                    // blob keys can be arrays
                    app.use('watcher', [
                        (state, actionType) => console.log(actionType),
                        (state, actionType, params) => {
                            if (actionType === 'MY_ACTION') {
                                console.log(params);
                            }
                        },
                    ]);

                    const plugin = {
                        name: 'my-middlware-plugin',
                        middleware: (next, state, actionType, params) => {
                            if (state.items.length === 0) {
                                params.empty = true;
                            }
                            next(state, actionType, params);
                        },
                    };

                    // named plugins will only be added once
                    app.use(plugin);
                    app.use(plugin);
                `]],
            ]],
            ['p.copy', {}, [
                'For more information about blobs, visit ',
                [Link, {path: '/blobs/'}, [
                    'the dedicated page',
                ]],
                '.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'app.update()',
            ]],
            ['p.copy', {}, [
                'Triggers a rerender of the whole app from current state.',
            ]],
            [Codeblock, {}, [`
                app.update();
            `]],
            ['p.copy', {}, [
                'This function allows "state" to be stored outside the app itself and is convenient to use when performance is a priority.',
            ]],
            [Example, {}, [
                [Codeblock, {}, [`
                    let counter = 0;

                    // button clicks will not automatically change the rendered count
                    app(() => () => (
                        ['div', {}, [
                            'count: ',
                            ['pre', {}, [
                                String(counter),
                            ]],
                            ['button', {onclick: () => counter++}, [
                                'click',
                            ]],
                        ]]
                    ));

                    // re-renders the app which updates the count
                    app.update();
                `]],
            ]],
        ]],
    ]]
);
