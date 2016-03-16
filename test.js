const fs = require('fs');
const path = require('path');

const test = require('ava');
const requireFromString = require('require-from-string');
const cssInJs = require('css-in-js');
const setsEqual = require('sets-equal');

const cssInJsLoader = require('.');

const fixturesPath =
  path.resolve(__dirname, 'test/fixtures');

const mockLoaderApi = (mocks) => (
  Object.assign({
    exec: source => requireFromString(source),
    cacheable: () => {},
    addDependency: () => {},
    resourcePath: path.resolve(fixturesPath, 'entry.js'),
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

test(
  'Reports dependencies',
  (assert) => {
    const actual = new Set();

    cssInJsLoader.apply(mockLoaderApi({
      addDependency: dep => actual.add(dep),
    }), ['']);

    const dependenciesPath =
      path.resolve(fixturesPath, 'dependencies');
    const expected = new Set(
      fs.readdirSync(dependenciesPath).map(filename => (
        path.resolve(dependenciesPath, filename)
      ))
    );

    assert.ok(setsEqual(
      actual,
      expected
    ));
  }
);
