const cssInJs = require('css-in-js');

module.exports = function cssInJsLoader(input) {
  this.cacheable();

  const styleObject = this.exec(input, this.resourcePath);

  return (
    `module.exports = '${
      cssInJs(styleObject)
        .replace(/'/g, '\\\'')
        .replace(/\n/g, '\\n')
    }';`
  );
};
