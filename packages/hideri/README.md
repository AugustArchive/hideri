# Hideri

> **Logger in node.js made for Maika**

## Usage

```js
const { Logger, ConsoleTransport } = require('@maika.xyz/hideri');
const logger = new Logger({
    transports: [new ConsoleTransport()],
    prefix: 'Hideri> '
})
```