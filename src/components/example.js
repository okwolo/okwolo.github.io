require('./example.scss');

// TODO add dropdown arrow

module.exports = ({children}) => () => (
    ['div.example', {}, [
        ['h3.title', {}, [
            'example',
        ]],
        ['div.children', {}, children],
    ]]
);
