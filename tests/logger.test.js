const Hideri = require('../build');
const logger = Hideri.create({
    transports: [new Hideri.ConsoleTransport(), new Hideri.FileTransport(require('path').join(__dirname, 'tmp', 'build.log'))]
});

logger.info('yes');
logger.error('no');
logger.verbose('yeyyy');
logger.debug('no u!');
logger.warn('this.self = false');