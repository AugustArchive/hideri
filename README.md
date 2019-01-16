# @maika.xyz/hideri
> :pencil: **A logger for Node.js made for Maika.**

## Warning
This is a modification of [PassTheMayo/mayo-logs](https://github.com/PassTheMayo/mayo-logs) with the following modifications:

```diff
+ TypeScript Typings
- Removed `Logger.Colors` and `Logger.DateFormat`
* Redid JSDoc
```

## Example Usage
```js
const { Logger } = require('@maika.xyz/hideri');
const logger = new Logger();

logger.info('hi');
logger.debug('hi');
logger.error('hi');
logger.warn('hewwo >w<~');
logger.verbose('OwO');
```

returns

```
 5292  20:33:46  info  hi
 5292  20:33:46  debug  hi
 5292  20:33:46  error  hi
 5292  20:33:46  warning  hewwo >w<~
 5292  20:33:46  verbose  OwO
```

## License
> [@maika.xyz/hideri](https://github.com/MaikaBot/hideri) is maintained by the Maika developers & released under the [MIT](https://github.com/MaikaBot/hideri/blob/master/LICENSE) license.

```
Copyright (c) 2019-present auguwu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```