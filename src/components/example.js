require('./example.scss');

module.exports = ({children}, update) => (closed = true) => (
    ['div.example', {
        onclick: () => update(!closed),
    }, [
        ['h3.title', {}, [
            ['span.prefix', {}, [
                closed ? '+' : '-',
            ]],
            'example',
        ]],
        ['div.children', {
            className: {closed},
            onclick: (e) => e.stopPropagation(),
        }, children],
    ]]
);
