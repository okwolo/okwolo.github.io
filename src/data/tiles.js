module.exports = [
    {
        title: 'syntax',
        copy: 'The view syntax is designed with a priority given to familiarity and with the goal of not needing to be transpiled. Elements are represented as an array containing the tagName, attributes and children. To facilitate common use cases ids, classes and styles can all be added inline after the tagName.',
    },
    {
        title: 'blobs',
        copy: 'Blobs are powerful configuration objects which all modules can listen for. This allows for customization far beyond what is available directly through the api. Okwolo is purposefully built to handle the addition of blobs at any time in an application\'s lifecycle.',
    },
    {
        title: 'modules',
        copy: 'Modules are very similar in purpose and capabilities to blobs, but they differ in the sense that they have already been consumed by the app at creation time. This also alows them to have privileged access to the app\'s "official" global object.',
    },
    {
        title: 'kits',
        copy: 'Kits represent preconfigured app bundles. These bundles are built from a group of modules and can be customized infinitely to add or remove features to the produced app as a project demands it. Okwolo currently ships with three different kits which share many modules, but behave very differently.',
    },
];
