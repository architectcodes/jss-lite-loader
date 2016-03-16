const test = require('ava');
const requireFromString = require('require-from-string');
const cssInJs = require('css-in-js');

const cssInJsLoader = require('.');

const mockLoaderApi = (mocks) => (
  Object.assign({
    exec: source => requireFromString(source),
    cacheable: () => {},
    resourcePath: '/any/file.js',
  }, mocks)
);

test(
  'Returns a module exporting a string of CSS',
  (assert) => {
    const styleObject = { '.a': { margin: '0' } };
    const result = requireFromString(
      cssInJsLoader.apply(mockLoaderApi(), [
        `module.exports = ${JSON.stringify(styleObject)};`,
      ])
    );

    assert.is(
      typeof result,
      'string'
    );

    assert.is(
      result,
      cssInJs(styleObject)
    );
  }
);

test(
  'Is cacheable',
  (assert) => new Promise((resolve, reject) => {
    setTimeout(reject, 100);

    cssInJsLoader.apply(mockLoaderApi({
      cacheable: () => {
        assert.pass();
        resolve();
      },
    }), ['']);
  })
);
