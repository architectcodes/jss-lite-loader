const cssInJs = require('css-in-js');
const requireList = require('require-list');

const flatListOfKeys = (object) => {
  if (typeof object !== 'object' || object === null) {
    return [];
  }

  const keys = Object.keys(object);

  return keys.reduce((result, key) => (
    result
      .concat([key])
      .concat(flatListOfKeys(object[key]))
  ), []);
};

module.exports = function cssInJsLoader(input) {
  this.cacheable();

  flatListOfKeys(requireList(this.resourcePath))
    .forEach(dependency => this.addDependency(dependency));

  const styleObject = this.exec(input, this.resourcePath);

  return (
    `module.exports = '${
      cssInJs(styleObject)
        .replace(/'/g, '\\\'')
        .replace(/\n/g, '\\n')
    }';`
  );
};
