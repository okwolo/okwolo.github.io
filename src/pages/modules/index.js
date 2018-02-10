const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');

const name = 'modules';
const icon = '/res/icons/kits.svg';
const copy = 'Modules are very similar in purpose and capabilities to blobs, but they differ in the sense that they have already been consumed by the app at creation time. This also alows them to have privileged access to the app\'s "official" global object.';
const menu = [
    null,
    'state',
    'state.handler',
    'state.handler.history',
    'router',
    'router.fetch',
    'router.register',
    'router.register-lite',
    'view',
    'view.build',
    'view.dom',
    'view.string',
    'primary.router.builder',
];

module.exports = () => () => (
    [Doc, {name, icon, copy, menu}, [
        ['div.section', {}, [
            ['p.copy', {}, [
                'Although modules are useful for creating custom kits, they do not need to be understood if you are using a pre-configured one. Modules are defined by a function which receives reference to the app-wide bus and to the global object (as defined at app creation).',
            ]],
            [Codeblock, {}, [`
                const myModule = ({on, send}, global) => {
                    // ...
                };
            `]],
            ['p.copy', {}, [
                'Modules are then passed to the core which generates the okwolo function. If module A depends on module B, module B should be included earlier than A.',
            ]],
            [Codeblock, {}, [`
                const myKit = core({
                    modules: [
                        myModule,
                        // ...
                    ],
                    options: {
                        // ...
                    },
                });
            `]],
            ['p.copy', {}, [
                'Module names should express their purpose and make dependencies clear. For example, the state handler module depends on the state one and is therefore named "state.handler" even if handler might suffice.',
            ]],
            ['p.copy', {}, [
                'By convention, all cross-module communication should be done through the app\'s bus to lower coupling and allow for inspection. Another convention followed by the modules is that all events being fired or listened for should be clearly indicated in a comment at the top of the file. Here is an example header from the state module.',
            ]],
            [Codeblock, {}, [`
                // @fires   state        [state]
                // @fires   blob.api     [core]
                // @fires   blob.handler [state]
                // @listens state
                // @listens blob.handler
            `]],
            ['p.copy', {}, [
                'Events fired by the module should include additional information about the receiving modules (even when it is the same module).',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'state',
            ]],
            ['p.copy', {}, [
                'The state module\'s primary purpose is to offer lightweight "canonical" state management for the application. It adds the getState and setState methods for convenient access to a copy of its state. It also enables accepts state handlers which are discussed in the following section.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [stateModule],
                })();

                app.setState('test');

                app.getState(); // 'test'

                app.use('handler', handlerBlob);
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'state.handler',
            ]],
            ['p.copy', {}, [
                'The state module makes it possible for other modules (or a blob) to become the state handler in it\'s place. This allows the handler to manage the "setState" calls and add features around this event. This pattern is used in the standard kit where a state handler adds actions, watchers and middleware to state management.',
            ]],
            ['p.copy', {}, [
                'For consistency, the standard handler adds a "SET_STATE" action and uses it to modify state when setState is called. This allows watchers and/or middleware to be interact with the action as usual.',
            ]],
            [Codeblock, {}, [`
                const customHandler = (newState) => {
                    // ...
                    // the handler must fire an event to make the state module aware of the new state.
                    app.send('state', newState);
                };

                // the function given to the handler blob has direct access to the real state variable.
                const handlerBlob = (getState) => {
                    return customHandler;
                }
            `]],
            ['p.copy', {}, [
                'This pattern of callbacks establishes a two-way communication channel between the state module and the optionnal handler while remaining optional for kits that do not need more state logic.',
            ]],
            ['p.copy', {}, [
                'The following snippet shows the different ways to interact with the "state.handler" module used in the standard kit.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [
                        stateModule,
                        stateHandlerModule,
                    ],
                })();

                app.use('watcher', myWatcher);

                app.use('middleware', myMiddleware);

                app.use('action', myAction);

                app.act('actionName', actionParams...);
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'state.handler.history',
            ]],
            ['p.copy', {}, [
                'The state handler history module adds actions to undo and redo the application\'s state. It also exposes these actions and a function to reset the stored history on the app\'s api.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [
                        stateModule,
                        stateHandlerModule,
                        stateHandlerHistoryModule,
                    ],
                })();

                app.undo();

                app.redo();

                app.resetHistory();
            `]],
            ['p.copy', {}, [
                'The module keeps track of a maximum of 20 past states.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'router',
            ]],
            ['p.copy', {}, [
                'The router module offers utilities to manage the browser\'s location and to respond to it\'s changes. This includes registering routes, changing the base path and changing the view. By default, the router only calls functions. Its relationship with the view module is handled by the "primary.router.builder" module.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [routerModule],
                })();

                app.use('route', {
                    path: '/users',
                    handler: () => {
                        // ...
                    },
                })();

                app.use('base', '/acmeapp');

                app.redirect('/home');

                app.show('/home');
            `]],
            ['p.copy', {}, [
                'Alone, this module does not contain functions to encode and decode the pathname. It relies on implementations of these two functions to be added by another module or through blobs. By modifying both functions, it is possible to define an entirely different syntax/storage mechanism for the routes while not needing to think about the browser\'s location. This also means the router module has absolutely no opinions on the format of the storage and that the format needs to be managed by fetch and register.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'router.fetch',
            ]],
            ['p.copy', {}, [
                'The fetch module adds the functionality to the router module to call registered path/handler combos. This same module is currently being used in both the standard and lite kits, because the route store format is the same.',
            ]],
            [Codeblock, {}, [`
                // store format:
                //  [{
                //      pattern: RegExp,
                //      keys: [String],
                //      handler: Function,
                //  }]
                const fetchBlob = (store, path, params) => {
                    // path handler should be called here
                    // ...
                    return hasPathMatched;
                };
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'router.register',
            ]],
            ['p.copy', {}, [
                'This router registering module leans heavily on the "path-to-regex" npm package also being used by express. This means the features and syntax should be familiar to a large proportion of developers.',
            ]],
            ['p.copy', {}, [
                'Path strings are converted to regular expressions with included capture groups for each parameter in the path. Params are variables inside the path that act as placeholders. For example, the route "/user/:id" contains an "id" param which should match with "/user/123" and "/user/456". These named params are mapped to capture groups in the fetch blob to extract information from paths.',
            ]],
            ['p.copy', {}, [
                'For convenience, this module also adds support for a catch-all pattern ("**") which will match any path.',
            ]],
            [Codeblock, {}, [`
                const registerBlob = (store, path, handler) => {
                    // ...
                    return store;
                };
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'router.register.lite',
            ]],
            ['p.copy', {}, [
                'The lite version of the register module implements the string-to-regexp conversion instead of importing the expensive package. This means that some path variations are not supported (like parameter modifiers). However, it keeps support for simple path params.',
            ]],
            ['p.copy', {}, [
                'For convenience, this module also adds support for a catch-all pattern ("**") which will match any path.',
            ]],
        ]],
    ]]
);
