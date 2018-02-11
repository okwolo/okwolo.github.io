// update prismjs syntax highlighting after codeblocks change.
const isBrowser = typeof window !== 'undefined';
let updateRequested = false;
const updatePrism = () => {
    if (updateRequested) {
        return;
    }
    if (!isBrowser) {
        return;
    }
    updateRequested = true;
    window.setTimeout(() => {
        window.requestAnimationFrame(() => {
            console.log('updated prism');
            updateRequested = false;
            window.Prism.highlightAll();
        });
    }, 50);
};

module.exports = ({language = 'javascript', children}) => {
    // remove extra indentation at the start of lines
    let minIndent = Infinity;
    children.forEach((child) => {
        if (typeof child !== 'string') {
            return child;
        }

        let match;
        const pattern = /(?:(?:^|\n)( +)[^\s])+/g;
        while (match = pattern.exec(child)) {
            minIndent = Math.min(minIndent, match[1].length);
        }
    });
    const pp = new RegExp(`(^|\\n) {${minIndent}}`, 'g');
    children = children.map((child) => {
        if (typeof child !== 'string') {
            return child;
        }

        return child
            .replace(pp, (match, prefix) => prefix)
            .trim();
    });

    updatePrism();

    return () => (
        ['pre.language-'+language, {}, [
            ['code', {}, children],
        ]]
    );
};
