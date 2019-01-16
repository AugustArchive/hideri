const chalk          = require('chalk');
const { inspect }    = require('util');
const { dateformat } = require('@maika.xyz/miu');

module.exports = class HideriLogger {
    /**
     * Create a new Hideri logger instance
     * @param {IOptions} [options] Contains the initialized options
     */
    constructor(options) {
        this.options = options || { methods: this.getDefaultMethods() };
        this.methods = this.options.methods;

        for (let i = 0; i < this.methods.length; i++)
            this.constructMethod(this.methods[i], false);
    }

    /**
     * Constructs a new Method instance
     * @param {Method} method The method data
     * @param {boolean} [append=true] Internal check to prevent loops
     * @returns {HideriLogger} Instance to chain
     */
    constructMethod(method, append = true) {
        method.inspectDepth = method.inspectDepth || 3;
        method.padRight = method.padRight || 1;
        method.padLeft = method.padLeft || 1;

        for (let a = 0; a < method.levels.length; a++) {
            method.levels[a].padLeft = method.levels[a].padLeft || 1;
            method.levels[a].padRight = method.levels[a].padRight || 1;
        }

        this.assign(method);
        if (append)
            this.methods.push(method);

        return this;
    }

    /**
     * Clears off all methods & deassigns the property
     * @returns {HideriLogger} Chainable instance
     */
    deleteMethods() {
        for (let i = 0; i < this.methods.length; i++)
            delete this[this.methods[i].name];

        this.methods = [];
        return this;
    }

    /**
     * Processes any text to the console
     * @param {string} text The text to print
     * @returns {HideriLogger} Chainable instance
     */
    print(text) {
        process.stdout.write(`${text.replace(/'/g, '')}\n`);
        return this;
    }

    /**
     * Constructs a new Level instance
     *   - Appends the output of all levels of a method together
     * 
     * @param {Method} method The method to get
     * @returns {IBuildResult}
     */
    constructLevel(method) {
        let res = '';
        let filler = '';
        let level;

        for (let i = 0; i < method.levels.length; i++) {
            level = method.levels[i];
            let text = this.getText(level.text);
            let padLeft = this.getPaddingText(level.padLeft, text);
            res += level.color(padLeft);
            filler += level.color(padLeft);

            for (let j = 0; j < text.length; j++)
                filler += level.color(' ');
            
            res += level.color(text);
            let padRight = this.getPaddingText(level.padRight, text);
            res += level.color(padRight);
            filler += level.color(padRight);
        }

        return {
            result: res,
            fill: filler
        };
    }

    /**
     * Get text from any data type
     * @param {string|function|number|symbol} text Text to convert
     * @returns {string}
     */
    getText(text) {
        let res;

        if (typeof text === 'function')
            res = text();
        else
            res = text;

        return String(res);
    }

    /**
     * Gets the padding text from a level
     * @param {number|function} pad The padding to convert
     * @param {string} [text] The text to use if the padding method is an function
     * @returns {string}
     */
    getPaddingText(pad, text) {
        let result = '';
        if (typeof pad === 'function')
            pad = pad(text);
        
        if (pad > 0)
            for (let i = 0; i < pad; i++)
                result += ' ';

        return result;
    }

    /**
     * Adds the method to the Logger class
     * @param {Method} method The method to assign
     * @returns {HideriLogger} The chainable instance
     */
    assign(method) {
        this[method.name] = (...text) => {
            text = text.map((t) => typeof text === 'object' ? inspect(t, false, method.inspectDepth) : text).join(' ');
            let result = this.constructLevel(method);
            let padLeft = 1;
            let padRight = 1;

            if (typeof method.padLeft === 'function')
                padLeft = method.padLeft(text);
            else
                padLeft = method.padLeft;

            if (typeof method.padRight === 'function')
                padRight = method.padRight(text);
            else
                padRight = method.padRight;

            if (typeof text === 'object')
                text = inspect(text, null, method.inspectDepth);
            else if (typeof text === 'function')
                text = text();
            else
                text = text;

            const lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (i !== 0)
                    result.result += result.fill;
                
                for (let j = 0; j < padLeft; j++)
                    result.result += ' ';

                result.result += lines[i];

                for (let k = 0; k < padRight; k++)
                    result.result += ' ';

                if (i < lines.length - 1)
                    result.result += '\n';
            }

            this.print(result.result);
        };

        return this;
    }

    /**
     * All of the default methods
     * @returns {Method[]}
     */
    getDefaultMethods() {
        return [
            {
                name: 'debug',
                color: chalk.reset,
                levels: [
                    {
                        color: chalk.black.bgYellowBright,
                        text: process.pid
                    },
                    {
                        color: chalk.black.bgWhite,
                        text: () => dateformat(Date.now(), 'HH:MM:ss')
                    },
                    {
                        color: chalk.black.bgHex('#AEC6CF'),
                        text: 'debug'
                    }
                ]
            },
            {
                name: 'info',
                color: chalk.reset,
                levels: [
                    {
                        color: chalk.black.bgYellowBright,
                        text: process.pid
                    },
                    {
                        color: chalk.black.bgWhite,
                        text: () => dateformat(Date.now(), 'HH:MM:ss')
                    },
                    {
                        color: chalk.black.bgHex('#77DD77'),
                        text: 'info'
                    }
                ]
            },
            {
                name: 'error',
                color: chalk.reset,
                levels: [
                    {
                        color: chalk.black.bgYellowBright,
                        text: process.pid
                    },
                    {
                        color: chalk.black.bgWhite,
                        text: () => dateformat(Date.now(), 'HH:MM:ss')
                    },
                    {
                        color: chalk.black.bgHex('#FF6961'),
                        text: 'error'
                    }
                ]
            },
            {
                name: 'warn',
                color: chalk.reset,
                levels: [
                    {
                        color: chalk.black.bgYellowBright,
                        text: process.pid
                    },
                    {
                        color: chalk.black.bgWhite,
                        text: () => dateformat(Date.now(), 'HH:MM:ss')
                    },
                    {
                        color: chalk.black.bgHex('#FDFD96'),
                        text: 'warning'
                    }
                ]
            },
            {
                name: 'verbose',
                color: chalk.reset,
                levels: [
                    {
                        color: chalk.black.bgYellowBright,
                        text: process.pid
                    },
                    {
                        color: chalk.black.bgWhite,
                        text: () => dateformat(Date.now(), 'HH:MM:ss')
                    },
                    {
                        color: chalk.black.bgHex('#B19CD9'),
                        text: 'verbose'
                    }
                ]
            }
        ];
    }
};

/**
 * @typedef {Object} Method
 * @prop {string} name The name used to assign the method
 * @prop {string} color Colour for output text
 * @prop {number} [inspectDepth] How deep objects will be inspected to
 * @prop {number} [padLeft] The number used to pad to the left
 * @prop {number} [padRight] The number used to pad to the right
 * @prop {Level[]} levels An array of levels to output
 */

/**
 * @typedef {Object} Level
 * @prop {string} text The text of the level
 * @prop {string} color The color of the level text
 * @prop {number} [padLeft] The number used to pad to the left
 * @prop {number} [padRight] The number used to pad to the right
 */

/**
 * @typedef {Object} IOptions
 * @prop {Method[]} [methods] The methods to assign by default
 */

/**
 * @typedef {Object} IBuildResult
 * @prop {string} result The result
 * @prop {string} fill The filler of the text (used for prefixing)
 */