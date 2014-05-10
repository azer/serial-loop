var loop = require("./");
var test = require("prova");

test('looping serially', function (assert) {
  var i = 0;

  loop(5, each, function (error) {
    assert.notOk(error);
    assert.end();
  });

  function each (next, t) {
    assert.equal(i++, t);
    next();
  }
});

test('ending when it fails', function (assert) {
  var i = 0;

  loop(5, each, function (error) {
    assert.equal(error.message, 'hello world');
    assert.end();
  });

  function each (next, t) {
    assert.equal(i++, t);
    assert.ok(i < 4);

    if (i==3) return next(new Error('hello world'));


    next();
  }
});

test('zero length', function (t) {
  loop(0, each, t.end);

  function each () {
    throw new Error('fail');
  }
});
