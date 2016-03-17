const fs = require('fs');
const path = require('path');

const test = require('ava');
const requireFromString = require('require-from-string');
const jssLite = require('jss-lite');
const setsEqual = require('sets-equal');

const jssLiteLoader = require('.');

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
      jssLiteLoader.apply(mockLoaderApi(), [
        `module.exports = ${JSON.stringify(styleObject)};`,
      ])
    );

    assert.is(
      typeof result,
      'string'
    );

    assert.is(
      result,
      jssLite(styleObject)
    );
  }
);

test(
  'Is cacheable',
  (assert) => new Promise((resolve, reject) => {
    setTimeout(reject, 100);

    jssLiteLoader.apply(mockLoaderApi({
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

    jssLiteLoader.apply(mockLoaderApi({
      addDependency: dep => actual.add(dep),
    }), ['']);

    const dependenciesPath =
      path.resolve(fixturesPath, 'dependencies');
    const expected = new Set(
      fs.readdirSync(dependenciesPath).map(filename => (
        path.resolve(dependenciesPath, filename)
      ))
    );
    expected.add('external');

    assert.ok(setsEqual(
      actual,
      expected
    ));
  }
);
