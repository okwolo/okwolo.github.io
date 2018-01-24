require('./footer.scss');

const Link = require('./link');

module.exports = () => () => (
    ['div.footer', {}, [
        [Link, {path: 'https://www.npmjs.com/package/okwolo'}, [
            ['img', {src: 'https://img.shields.io/npm/v/okwolo.svg'}],
        ]],
        [Link, {path: 'https://travis-ci.org/okwolo/okwolo'}, [
            ['img', {src: 'https://travis-ci.org/okwolo/okwolo.svg?branch=master'}],
        ]],
        [Link, {path: 'https://codecov.io/gh/okwolo/okwolo'}, [
            ['img', {src: 'https://img.shields.io/codecov/c/github/okwolo/okwolo.svg'}],
        ]],
        [Link, {path: 'https://github.com/okwolo/okwolo'}, [
            ['h2.title', {}, [
                'View on GitHub',
            ]],
        ]],
    ]]
);
