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
                'Lorem Ipsum',
            ]],
        ]],
    ]]
);
