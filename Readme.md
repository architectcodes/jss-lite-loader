[![Travis – build status
](https://img.shields.io/travis/tomekwi/jss-lite-loader/master.svg?style=flat-square
)](https://travis-ci.org/tomekwi/jss-lite-loader
) [![Coveralls – test coverage
](https://img.shields.io/coveralls/tomekwi/jss-lite-loader.svg?style=flat-square
)](https://coveralls.io/r/tomekwi/jss-lite-loader
) [![David – status of dependencies
](https://img.shields.io/david/tomekwi/jss-lite-loader.svg?style=flat-square
)](https://david-dm.org/tomekwi/jss-lite-loader
) [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-777777.svg?style=flat-square
)](https://github.com/airbnb/javascript
)




# jss-lite-loader

**Write stylesheets in JS.  
Works with any stack.**




<a                                                 id="/installation"></a>&nbsp;

## Installation

```sh
npm install [--save] jss-lite-loader
```




<a                                                        id="/usage"></a>&nbsp;

## Usage

jss-lite-loader is very flexible. Feel free to combine it with other loaders – for example, [style-loader](https://github.com/webpack/style-loader) for adding the styles to the page or [apply-loader](https://github.com/mogelbrod/apply-loader) for configurable stylesheets.

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
require('style!jss-lite!./style');

import { className } from './style';

export default () =>
  h(`button.${className}`)
```




<a                                                      id="/license"></a>&nbsp;

## License

[MIT](./License.md) © [Tomek Wiszniewski](https://github.com/tomekwi)
