const Logger = require('./lib/logger');

module.exports = {
    version: require('../package').version,
    Logger,
    /**
     * Create a new instance with the `Hideri#create` function
     * @param {import('./lib/logger').Options} [options] The options
     */
    create: (options) => new Logger(options? options: null)
};