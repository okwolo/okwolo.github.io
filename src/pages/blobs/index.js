const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');

const name = 'blobs';
const icon = '/res/icons/blobs.svg';
const copy = 'Blobs are powerful configuration objects which all modules can listen for. This allows for customization far beyond what is available directly through the api. Okwolo is purposefully built to handle the addition of blobs at any time in an application\'s lifecycle.';
const menu = [
    null,
    'action',
    'base',
    'build',
    'builder',
    'draw',
    'middleware',
    'route',
    'target',
    'update',
    'watcher',
];

module.exports = () => () => (
    [Doc, {name, icon, copy, menu}, [
        ['div.section', {}, [
            ['p.copy', {}, [
                'Blobs are added to an application with the "use" function. It takes the name of the blob as the first parameter and the rest of the arguments will be passed to the blob handling functions.',
            ]],
            [Codeblock, {}, [`
                app.use('blobName', arg1, arg2, ...);
            `]],
            ['p.copy', {}, [
                'This page lists the blobs understood by at least one module in the okwolo package, even if that module is not necessarily present in all kits.',
            ]],
            ['p.copy', {}, [
                'Note that there is no return value and that blobs which are not listened for will not produce any errors.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'action',
            ]],
            ['p.copy', {}, [
                'Actions are received by the state handler module and can be used to modify the state. Action handlers are given a copy of the state and must return the modified value.',
            ]],
            [Codeblock, {}, [`
                const action = {type, target, handler};
                  // type: string which names the action
                  // target: array to restrict the scope of an action to a specific "address" in the state
                  //   OR    function which returns the action's target [(state, params) => target]
                  // handler: function that makes the change on the target [(target, params) => modifiedTarget]
            `]],
            [Codeblock, {}, [`
                app.setState({
                    name: 'John',
                    hobbies: ['tennis', 'gardening'],
                });

                app.use('action', {
                    type: 'REMOVE_HOBBY',
                    target: ['hobbies'],
                    handler: (hobbies, index) => {
                        hobbies.splice(index, 1);
                        return hobbies;
                    },
                });

                app.act('REMOVE_HOBBY', 0);

                app.getState(); // {name: 'John', hobbies: ['gardening']}
            `]],
            ['p.copy', {}, [
                'More than one actions can be added at the same time by passing an array of action objects instead of a single one.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'base',
            ]],
            ['p.copy', {}, [
                'The path base is received by the router module and can be useful when the app is not located in the website\'s base directory.',
            ]],
            [Codeblock, {}, [`
                app.use('base', '/subdir/myapp');

                app.redirect('/users');
                // navigates to '/subdir/myapp/users'
                // matches routes for '/users'
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'build',
            ]],
            ['p.copy', {}, [
                'The build function is responsible for generating vdom from the input layout syntax.',
            ]],
            [Codeblock, {}, [`
                const element = (             =>        const vdom = {
                    ['div#title', {}, [       =>            tagName: 'div',
                        'Hello World!',       =>            attributes: {
                    ]]                        =>                id: 'title',
                );                            =>            },
                                              =>            children: {
                                              =>                0: {
                                              =>                    text: 'Hello World!',
                                              =>                },
                                              =>            },
                                              =>            childOrder: ['0'],
                                              =>        };
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'builder',
            ]],
            ['p.copy', {}, [
                'The builder is the function which generates layout. This is the blob being sent at startup and when a redirect is issued.',
            ]],
            [Codeblock, {}, [`
                app.use('builder', (state) => (
                    ['div | background-color: red;', {}, [
                        ['span.title', {} [
                            state.title,
                        ]],
                    ]]
                ));
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'draw',
            ]],
            ['p.copy', {}, [
                'The draw function handles the inital drawing to a new target. It should return a view object that will be given to the update function. The format of this object is not enforced. Note that the view module does not verify the type of the target and it is therefore good practice to make these checks before intracting with the target.',
            ]],
            [Codeblock, {}, [`
                app.use('draw', (target, vdom) => {
                    target.innerHTML = magicallyStringify(vdom);
                    return vdom;
                });
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'middleware',
            ]],
            ['p.copy', {}, [
                'Middleware is received and applied by the state handler. It is given control of all actions before they are executed and can be asynchronous.',
            ]],
            [Codeblock, {}, [`
                app.use('middleware', (next, state, actionType, params) => {
                    if (params.test) {
                        console.log('action changed to TEST');
                        next(state, 'TEST');
                    } else {
                        next();
                    }
                });
            `]],
            ['p.copy', {}, [
                'If "next" is called with arguments, they will override the ones issued by the act call.',
            ]],
            ['p.copy', {}, [
                'Middleware functions are called in the order that they are added.',
            ]],
            ['p.copy', {}, [
                'More than one middleware can be added at the same time by passing an array of middleware functions instead of a single one.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'route',
            ]],
            [Codeblock, {}, [`
                const route = {path, handler}
                  // path: string pattern to match paths (using express' syntax)
                  // handler: function that is called with the route params as argument [(routeParams) => ...]
            `]],
            [Codeblock, {}, [`
                app.use('route', {
                    path: '/user/:uid/profile',
                    handler: ({uid}) => {
                        // ...
                    },
                });

                app.redirect('/user/123/profile');
                // handler is called with uid='123'
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'target',
            ]],
            ['p.copy', {}, [
                'The target will be given to the view\'s drawing and updating functions and can be of any type. In the client-side kits, the target should be a dom node whereas the ssr kit expects a callback.',
            ]],
            [Codeblock, {}, [`
                app.use('target', document.querySelector('.app-wrapper'));
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'udpate',
            ]],
            ['p.copy', {}, [
                'The update function updates the target with new vdom. It also receives the update address and the view object from a draw or a previous render as third and fourth arguments respectively. However, there is no defined format for either of these values and they can be omitted if not necessary.',
            ]],
            ['p.copy', {}, [
                'By overriding both the draw and update functions, it is possible to "render" to any target in any way. Here is an example of an app that renders to a string instead of a DOM node.',
            ]],
            [Codeblock, {}, [`
                let realTarget = '';

                app.use('draw', (target, vdom) => {
                    realTarget = magicallyStringify(vdom);
                });

                app.use('update', (target, vdom, address, view) => {
                    realTarget = magicallyStringify(vdom);
                });
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'watcher',
            ]],
            ['p.copy', {}, [
                'Watchers are funtctions that get called after all state changes. They cannot modify the state directly since they are given a copy, but they can safely issue more actions.',
            ]],
            [Codeblock, {}, [`
                app.use('watcher', (state, actionType, params) => {
                    console.log(\`action of type \${actionType} was performed\`);
                });
            `]],
            ['p.copy', {}, [
                'More than one watchers can be added at the same time by passing an array of watcher functions instead of a single one.',
            ]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'plugins',
            ]],
            ['p.copy', {}, [
                'To accomodate the creation of plugins, the use function can also accept an object as the first argument. This object can contain multiple blobs.',
            ]],
            [Codeblock, {}, [`
                app.use({
                    watcher: [myFirstWatcher, mySecondWatcher],
                    route: myRoute
                });
            `]],
            ['p.copy', {}, [
                'Plugins can also be named to ensure they are only ever used once in a single app instance. This is done by adding a name key to the plugin.',
            ]],
            [Codeblock, {}, [`
                let myPlugin = {
                    name: 'myPluginName',
                    middleware: myMiddlware,
                }

                app.use(myPlugin);
                app.use(myPlugin); // will not add the middleware again
            `]],
        ]],
    ]]
);
