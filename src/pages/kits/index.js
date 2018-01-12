const Codeblock = require('../../components/codeblock');
const Doc = require('../../components/doc');

const name = 'kits';
const icon = '/res/icons/kits.svg';
const copy = 'Okwolo is designed so that all functionality is provided by swappable modules. These modules can be used to add, modify or remove any features of the resulting apps. Kits represent different combinations of these modules which can be used to satisfy a wide variety of use cases. It is important to note that the order of modules can be important, especially in cases where one module depends on another. (ex. state and state.handler)';

module.exports = () => () => (
    [Doc, {name, icon, copy}, [
        ['div.section', {}, [
            ['p.copy', {}, [
                'This page lists describes some useful configurations and lists their included modules diffed with the default standard kit. All kits can be found in their transpiled/minified/gzipped forms in the ',
                ['a', {href: 'https://github.com/okwolo/okwolo/blob/master/dist', target: '_blank'}, [
                    'dist folder',
                ]],
                ' or in at the top level of the package. Most of the tools available to modules are also available after the app is instantiated and that the kit pattern exists primarily for development ergonomics.',
            ]],
            [Codeblock, {}, [`
                const okwolo = require('okwolo/{{kit-name}}}');
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'standard',
                ['a', {href: 'https://github.com/okwolo/okwolo/blob/master/dist/standard.min.js.gz', target: '_blank'}, [
                    ['img.badge', {src: 'https://img.shields.io/github/size/okwolo/okwolo/dist/standard.min.js.gz.svg'}],
                ]],
            ]],
            [Codeblock, {}, [`
                const okwolo = require('okwolo/standard');
            `]],
            ['p.copy', {}, [
                'Standard is the default kit and it includes the fullest set of features. Notably, the router uses the familiar matching logic from ',
                ['a', {href: 'https://www.npmjs.com/package/path-to-regexp', target: '_blank'}, [
                    'express',
                ]],
                ' and the state can be manipulated using actions, watchers, middleware and undo/redo.',
            ]],
            [Codeblock, {language: 'diff'}, [`
                primary.router.builder
                router
                router.fetch
                router.register
                state
                state.handler
                state.handler.history
                view
                view.build
                view.dom
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'lite',
                ['a', {href: 'https://github.com/okwolo/okwolo/blob/master/dist/lite.min.js.gz', target: '_blank'}, [
                    ['img.badge', {src: 'https://img.shields.io/github/size/okwolo/okwolo/dist/lite.min.js.gz.svg'}],
                ]],
            ]],
            [Codeblock, {}, [`
                const okwolo = require('okwolo/lite');
            `]],
            ['p.copy', {}, [
                'The lite kit is a trimmed down version of okwolo for projects where bundle size is a priority. It drops the advanced state management provided by the state handler and uses a simplified route registering module. This means that actions are not supported and that path params are the only special syntax understood by the router.',
            ]],
            [Codeblock, {language: 'diff'}, [`
                  primary.router.builder
                  router
                  router.fetch
                - router.register
                + router.register-lite
                  state
                - state.handler
                - state.handler.history
                  view
                  view.build
                  view.dom
            `]],
        ]],
        ['div.section', {}, [
            ['h2.title', {}, [
                'server',
                ['a', {href: 'https://github.com/okwolo/okwolo/blob/master/dist/server.min.js.gz', target: '_blank'}, [
                    ['img.badge', {src: 'https://img.shields.io/github/size/okwolo/okwolo/dist/server.min.js.gz.svg'}],
                ]],
            ]],
            [Codeblock, {}, [`
                const okwolo = require('okwolo/server');
            `]],
            ['p.copy', {}, [
                'The server kit is meant to be used as a server-side rendering tool. Since it is only concerned with producing html from state, there is no need for the router module or the elabotate state handling. The following example shows the minimal setup.',
            ]],
            [Codeblock, {}, [`
                // target is a callback which will receive the rendered html.
                const app = okwolo((htmlString) => {
                    // ...
                });

                app.setState({})

                app(() => () => (
                    ['div.app', {}, [
                        // ...
                    ]]
                ));
            `]],
            [Codeblock, {language: 'diff'}, [`
                - primary.router.builder
                - router
                - router.fetch
                - router.register
                  state
                - state.handler
                - state.handler.history
                  view
                  view.build
                - view.dom
                + view.string
            `]],
        ]],
    ]]
);
