module.exports = [
    {
        pathname: '/',
        title: 'okwolo',
        description: 'light javascript framework to build web applications',
        component: require('../pages/home'),
    },
    {
        pathname: '/syntax/',
        title: 'Syntax - okwolo',
        description: 'The view syntax is designed with a priority given to familiarity and with the goal of not needing to be transpiled. Elements are represented as an array containing the tagName, attributes and children. To facilitate common use cases ids, classes and styles can all be added inline after the tagName.',
        component: require('../pages/syntax'),
    },
    {
        pathname: '/blobs/',
        title: 'Blobs - okwolo',
        description: 'Blobs are powerful configuration objects which all modules can listen for. This allows for customization far beyond what is available directly through the api. Okwolo is purposefully built to handle the addition of blobs at any time in an application\'s lifecycle.',
        component: require('../pages/blobs'),
    },
    {
        pathname: '/modules/',
        title: 'Modules - okwolo',
        description: 'Modules are very similar in purpose and capabilities to blobs, but they differ in the sense that they have already been consumed by the app at creation time. This also alows them to have privileged access to the app\'s "official" global object.',
        component: require('../pages/modules'),
    },
    {
        pathname: '/kits/',
        title: 'Kits - okwolo',
        description: 'Kits represent preconfigured app bundles. These bundles are built from a group of modules and can be customized infinitely to add or remove features to the produced app as a project demands it. Okwolo currently ships with three different kits which share many modules, but behave very differently.',
        component: require('../pages/kits'),
    },
    {
        pathname: '/api/',
        title: 'API - okwolo',
        description: 'light javascript framework to build web applications',
        component: require('../pages/api'),
    },
];
