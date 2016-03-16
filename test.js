const test = require('ava');

const cssInJsLoader = require('.');

const mockLoaderApi = (mocks) => (
  Object.assign({
    exec: () => ({}),
    cacheable: () => {},
    resourcePath: '/any/file.js',
  }, mocks)
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
