require('./example.scss');

// TODO add dropdown arrow (waiting on okwolo@3.0.0)

module.exports = ({children}) => (
    ['div.example', {}, [
        ['h3.title', {}, [
            'example',
        ]],
        ['div.children', {}, children],
    ]]
);
