const requireAll = require('require-all');
const camelcase = require('camelcase');

const wrapper = require('../helpers/resolver-wrapper');

const rawResolvers = requireAll({
    dirname: __dirname,
    map: (name) => camelcase(name)
});

module.exports = (serverContext) => {
    const methods = {};

    Object.entries(rawResolvers).forEach(([ name, resolver ]) => {
        methods[name] = (args) => wrapper(serverContext, name, resolver, args);
    });

    return methods;
};