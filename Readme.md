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




<a id="/installation"></a>&nbsp;

## Installation

```sh
npm install [--save] jss-lite-loader
```




<a id="/usage"></a>&nbsp;

## Usage

jss-lite-loader is very flexible. Feel free to combine it with other loaders – for example, [style-loader](https://github.com/webpack/style-loader) for adding the styles to the page or [apply-loader](https://github.com/mogelbrod/apply-loader) for configurable stylesheets.

<a id="/usage/simple"></a>

### Easy to use

You can use it like a good old CSS preprocessor like LESS or SASS:

**`∎ config.js`**

```js
const color = require('color');

exports.buttonBackground =
  color('#F44336').alpha(0.5).lighten(0.5).rgbaColor();
```

**`∎ style.js`**

```js
const { buttonBackground } = require('./config');

exports.stylesheet = {
  '.button': {
    'width': '50px',
    'background-color': buttonBackground,
  },

  '@media screen and (min-width: 80em)': {
    '.button': {
      'width': '100%',
    },
  },
};
```

**`∎ index.js`**

```js
require('style!jss-lite!./style');
```

<a id="/usage/code-sharing"></a>

### Sharing code between JS and CSS

Here’s a problem I encountered recently, which turned out to be a perfect match for *jss-lite-loader*. I use a bunch of brand-specific colors in my *jss-lite* stylesheets:

**`∎ header.js`**

```js
const colors = require('material-colors');

const headerColor = exports.headerColor =
  materialColors.grey[800];

exports.stylesheet = {
  '.header': {
    'height': '60px',
    'background-color': headerColor,
  },
};
```

And here’s the wow. I can use the same values in JS for things CSS can’t do. For example, setting the [`theme-color`](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android):

**`∎ index.js`**

```js
const h = require('hyperscript');

// This gets rendered and injected as CSS:
require('style!jss-lite!./header');

// The same file can be imported as a pure JS module, free of side effects:
const { headerColor } = require('./header');

document.head.appendChild(
  h('meta', { name: 'theme-color', content: headerColor })
);
```

Until now sharing variables between JS and CSS [was](http://www.ericponto.com/blog/2014/09/17/share-css-variables-with-javascript/) [notoriously](http://stackoverflow.com/a/5885372/2816199) [difficult](https://github.com/7sempra/rosetta).

<a id="/usage/powerful"></a>

### Flexible thus powerful

Because the API is so simple, you can add lots of features yourself. Here’s an example of unique, auto-generated class names and a configurable stylesheet function (for example, coming from a style framework) in a reusable hyperscript component. Whoah, that’s a lot at once!

**`∎ style.js`**

```js
const hash = require('hash-sum')(__filename);

const classes = {
  button = `${hash}-button`,
};

module.exports = ({
  backgroundColor,
}) => ({ stylesheet: {
  [`.${classes.button}`]: {
    'width': '50px',
    'background-color': indigo,
  },

  '@media screen and (min-width: 80em)': {
    [`.${classes.button}`]: {
      'width': '100%',
    },
  },
} });

Object.assign(module.exports, { classes });
```

**`∎ button.js`**

```js
require('style!jss-lite!apply?{ obj: { backgroundColor: "#F44336" } }!./style');
const { classes } = require('./style');

export default () => (
  h(`button.${classes.button}`)
);
```




<a id="/license"></a>&nbsp;

## License

[MIT](./License.md) © [Tomek Wiszniewski](https://github.com/tomekwi)
