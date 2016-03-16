**Heads up!** This is a work in progress! Not ready for use yet!

[![Travis – build status
](https://img.shields.io/travis/tomekwi/css-in-js-loader/master.svg?style=flat-square
)](https://travis-ci.org/tomekwi/css-in-js-loader
) [![Coveralls – test coverage
](https://img.shields.io/coveralls/tomekwi/css-in-js-loader.svg?style=flat-square
)](https://coveralls.io/r/tomekwi/css-in-js-loader
) [![David – status of dependencies
](https://img.shields.io/david/tomekwi/css-in-js-loader.svg?style=flat-square
)](https://david-dm.org/tomekwi/css-in-js-loader
) [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-777777.svg?style=flat-square
)](https://github.com/airbnb/javascript
)




# css-in-js-loader

**Write stylesheets in JS.  
Works with any stack.**




<a                                                 id="/installation"></a>&nbsp;

## Installation

```sh
npm install [--save] css-in-js-loader
```




<a                                                        id="/usage"></a>&nbsp;

## Usage

css-in-js-loader is very flexible. Feel free to combine it with other loaders – for example, [style-loader](https://github.com/webpack/style-loader) for adding the styles to the page or [apply-loader](https://github.com/mogelbrod/apply-loader) for configurable stylesheets.

Here’s one way to use it in a generic hyperscript component:

**`🗋 style.js`**

```js
const uniqueHash = require('hash-sum');
export const className = uniqueHash(__filename);

export const stylesheet = {
  [`.${className}`]: {
    'width': '50px',
    'background-color': indigo,
  },

  '@media screen and (min-width: 80em)': {
    [`.${className}`]: {
      'width': '100%',
    },
  },
};
```

**`🗋 button.js`**

```js
require('style!css-in-js!./style');

import { className } from './style';

export default () =>
  h(`button.${className}`)
```




<a                                                      id="/license"></a>&nbsp;

## License

[MIT](./License.md) © [Tomek Wiszniewski](https://github.com/tomekwi)
