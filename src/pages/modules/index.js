const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');
const Link = require('../../components/link');

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

const ModuleTitle = ({children}) => {
    let moduleName = '';

    for (let i = 0; i < children.length; ++i) {
        if (typeof children[i] === 'string') {
            moduleName = children[i];
        }
    }

    if (!moduleName) {
        return () => (
            ['h2.title', {}, children]
        );
    }

    const path = `https://github.com/okwolo/okwolo/blob/master/src/modules/${moduleName}.js`;

    return () => (
        ['h2.title', {}, [
            [Link, {path}, children],
        ]]
    );
};

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
            [ModuleTitle, {}, [
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
            [ModuleTitle, {}, [
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
            [ModuleTitle, {}, [
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
            [ModuleTitle, {}, [
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
            [ModuleTitle, {}, [
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
                    // path handler should be called here.
                    // ...
                    return hasPathMatched;
                };
            `]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
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
            [ModuleTitle, {}, [
                'router.register.lite',
            ]],
            ['p.copy', {}, [
                'The lite version of the register module implements the string-to-regexp conversion instead of importing the expensive package. This means that some path variations are not supported (like parameter modifiers). However, it keeps support for simple path params.',
            ]],
            ['p.copy', {}, [
                'For convenience, this module also adds support for a catch-all pattern ("**") which will match any path.',
            ]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
                'view',
            ]],
            ['p.copy', {}, [
                'The view module is built to have no assumptions about the environment or about what type of render target is being output. This makes it more of a controller/orchestrator and allows things like render-to-string to exist. To do it\'s job, it needs a target, a builder function, a build function, a draw function, and an update function. More details about each of these blobs can be found on the ',
                [Link, {path: '/blobs/'}, ['dedicated page']],
                '. The module allows any of these blobs to change at any time and provides clear feedback if something is missing or invalid.',
            ]],
            ['p.copy', {}, [
                'The view module keeps track of two variables. The first one is a copy of the state. This copy is updated each time the state changes (by listening for the "state" event) and is used to rerender layout when one of the view blobs change. The second variable is the arbitrary layout data returned by both the draw and update blobs. This data is also passed to the update blob and can therefore be used to store any information about the view (ex. vdom).',
            ]],
            ['p.copy', {}, [
                'The view module also changes the app\'s primary function to make it update the builder func.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [viewModule],
                })();

                app.use('target', targetBlob);

                app.use('builder', builderBlob);

                app.use('build', buildBlob);

                app.use('draw', drawBlob);

                app.use('update', updateBlob);

                app(() => builderBlob);
            `]],
            ['p.copy', {}, [
                'This module can also be interacted with using two events: "update" and "sync". Both these events are also used internally and can be listened for from outside to give insight into the app\'s inner workings.',
            ]],
            [Codeblock, {}, [`
                const app = core({
                    modules: [viewModule],
                })();

                // updates layout using the update blob or the draw blob.
                app.send('update', forceRedraw);

                // updates a specific section of layout using the update blob.
                // the successor layout bypasses the state > builder > build pipeline.
                // identity can be used to confirm that the right element is being updated.
                app.send('sync', address, successor, identity);
            `]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
                'view.build',
            ]],
            ['p.copy', {}, [
                'The "view.build" module is a responsible for adding the build blob to the app. This build function is responsible for taking the output of the builder and transforming it into valid vdom, or throwing a syntax error. This also means it needs to be able to "unroll" components and initiate their updates using the "sync" event.',
            ]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
                'view.dom',
            ]],
            ['p.copy', {}, [
                'The "view.dom" module adds both the "draw" and the "update" blobs to the app. This is the only module (except "router") which should be aware of the browser and the document.',
            ]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
                'view.string',
            ]],
            ['p.copy', {}, [
                'The "view.string" module also adds the "draw" and "update" blobs, but makes them render to a safe html string.',
            ]],
        ]],
        ['div.section', {}, [
            [ModuleTitle, {}, [
                'primary.router.builder',
            ]],
            ['p.copy', {}, [
                'This module exists to avoid making the router and view modules coupled. It changes the app\'s primary function to a wrapper which makes it easier to create routes which change the builder.',
            ]],
            [Codeblock, {}, [`
                // without primary.router.builder module.
                app.use('route', {
                    path: '/user/:id',
                    handler: ({id}) => {
                        app.use('builder', (state) => {
                            // ...
                            return layout;
                        });
                    },
                });

                // with primary.router.builder module.
                app('/user/:id', ({id}) => (state) => {
                    // ...
                    return layout;
                });

                // maintains support for route-less builders.
                app(() => (state) => {
                    // ...
                    return layout;
                });
            `]],
        ]],
    ]]
);
