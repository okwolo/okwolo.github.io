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
                });

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
                'This pattern of callbacks establishes a two-way communication channel between the state module and the optionnal handler while remaining optional for kits that do not need more state logic.'
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
                });

                app.use('watcher', myWatcher);

                app.use('middleware', myMiddleware);

                app.use('action', myAction);

                app.act('actionName', actionParams...);
            `]],
        ]],
    ]]
);
