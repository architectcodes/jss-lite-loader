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

  // Report dependencies
  const dependencies = flatListOfKeys(requireList(this.resourcePath));
  dependencies.forEach(dependency => this.addDependency(dependency));

  // Get the stylesheet object
  const stylesheetObject = this.exec(input, this.resourcePath);

  // Clear the require cache
  dependencies.forEach(dep => delete require.cache[dep]);

  return (
    `module.exports = '${
      cssInJs(stylesheetObject)
        .replace(/'/g, '\\\'')
        .replace(/\n/g, '\\n')
    }';`
  );
};
