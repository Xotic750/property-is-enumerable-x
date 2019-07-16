import propertyIsEnumerable from '../src/property-is-enumerable-x';

let workingDefProp;
const obj = {};
try {
  Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: false,
    value: 'Testing',
    writable: true,
  });

  /* eslint-disable-next-line no-prototype-builtins */
  workingDefProp = obj.name === 'Testing' && obj.propertyIsEnumerable('name') === false;
} catch (ignore) {
  // empty
}

const itWorkingDefProp = workingDefProp ? it : xit;

const hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const itHasSymbols = hasSymbols ? it : xit;

describe('propertyIsEnumerable', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof propertyIsEnumerable).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(3);
    expect(function() {
      propertyIsEnumerable();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      propertyIsEnumerable(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      propertyIsEnumerable(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should not throw for other primitives and return false for non-existent properties', function() {
    expect.assertions(3);
    expect(propertyIsEnumerable(1)).toBe(false);
    expect(propertyIsEnumerable(true, null)).toBe(false);
    expect(propertyIsEnumerable('a', '')).toBe(false);
  });

  it('should return true for enumerable object properties', function() {
    expect.assertions(1);
    const o = {};
    o.prop = 'is enumerable';

    expect(propertyIsEnumerable(o, 'prop')).toBe(true);
  });

  itWorkingDefProp('should return true false for non-enumerable object properties', function() {
    expect.assertions(1);
    const o = {};
    Object.defineProperty(o, 'prop', {
      configurable: true,
      enumerable: false,
      value: 'is non-enumerable',
      writable: true,
    });

    expect(propertyIsEnumerable(o, 'prop')).toBe(false);
  });

  it('should return true (OS buggy) for enumerable array properties', function() {
    expect.assertions(1);
    const a = [];
    a[0] = 'is enumerable';
    /* eslint-disable-next-line no-prototype-builtins */
    expect(propertyIsEnumerable(a, 0)).toBe(a.propertyIsEnumerable(0));
  });

  it('should be true (OS buggy) for string indexes', function() {
    expect.assertions(1);
    const s = 'is enumerable';
    /* eslint-disable-next-line no-prototype-builtins */
    expect(propertyIsEnumerable(s, 0)).toBe(Object(s).propertyIsEnumerable(0));
  });

  it('should return false for non-enumerable properties', function() {
    expect.assertions(2);
    const a = [];

    expect(propertyIsEnumerable(a, 'length')).toBe(false);
    expect(propertyIsEnumerable(a, 'constructor')).toBe(false);
  });

  itHasSymbols('should work with symbols', function() {
    expect.assertions(2);

    const s = Symbol('');
    const o = {};
    o[s] = 'is enumerable';

    expect(propertyIsEnumerable(o, s)).toBe(true);
    expect(propertyIsEnumerable(o, Object(s))).toBe(true);
  });
});
