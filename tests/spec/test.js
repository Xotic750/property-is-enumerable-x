'use strict';

var propertyIsEnumerable;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  propertyIsEnumerable = require('../../index.js');
} else {
  propertyIsEnumerable = returnExports;
}

var workingDefProp;
var obj = {};
try {
  Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: false,
    value: 'Testing',
    writable: true
  });

  // eslint-disable-next-line no-prototype-builtins
  workingDefProp = obj.name === 'Testing' && obj.propertyIsEnumerable('name') === false;
} catch (ignore) {}

var itWorkingDefProp = workingDefProp ? it : xit;

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var itHasSymbols = hasSymbols ? it : xit;

describe('propertyIsEnumerable', function () {
  it('is a function', function () {
    expect(typeof propertyIsEnumerable).toBe('function');
  });

  it('should throw when target is null or undefined', function () {
    expect(function () {
      propertyIsEnumerable();
    }).toThrow();

    expect(function () {
      propertyIsEnumerable(void 0);
    }).toThrow();

    expect(function () {
      propertyIsEnumerable(null);
    }).toThrow();
  });

  it('should not throw for other primitives and return false for non-existent properties', function () {
    expect(propertyIsEnumerable(1)).toBe(false);
    expect(propertyIsEnumerable(true, null)).toBe(false);
    expect(propertyIsEnumerable('a', '')).toBe(false);
  });

  it('should return true for enumerable object properties', function () {
    var o = {};
    o.prop = 'is enumerable';

    expect(propertyIsEnumerable(o, 'prop')).toBe(true);
  });

  itWorkingDefProp('should return true false for non-enumerable object properties', function () {
    var o = {};
    Object.defineProperty(o, 'prop', {
      configurable: true,
      enumerable: false,
      value: 'is non-enumerable',
      writable: true
    });

    expect(propertyIsEnumerable(o, 'prop')).toBe(false);
  });

  it('should return true (OS buggy) for enumerable array properties', function () {
    var a = [];
    a[0] = 'is enumerable';
    // eslint-disable-next-line no-prototype-builtins
    expect(propertyIsEnumerable(a, 0)).toBe(a.propertyIsEnumerable(0));
  });

  it('should be true (OS buggy) for string indexes', function () {
    var s = 'is enumerable';
    // eslint-disable-next-line no-prototype-builtins
    expect(propertyIsEnumerable(s, 0)).toBe(Object(s).propertyIsEnumerable(0));
  });

  it('should return false for non-enumerable properties', function () {
    var a = [];

    expect(propertyIsEnumerable(a, 'length')).toBe(false);
    expect(propertyIsEnumerable(a, 'constructor')).toBe(false);
  });

  itHasSymbols('should work with symbols', function () {
    var s = Symbol('');
    var o = {};
    o[s] = 'is enumerable';

    expect(propertyIsEnumerable(o, s)).toBe(true);
    expect(propertyIsEnumerable(o, Object(s))).toBe(true);
  });
});
