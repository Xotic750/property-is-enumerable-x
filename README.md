<a href="https://travis-ci.org/Xotic750/property-is-enumerable-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/property-is-enumerable-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/property-is-enumerable-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/property-is-enumerable-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/property-is-enumerable-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/property-is-enumerable-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/property-is-enumerable-x"
  title="npm version">
<img src="https://badge.fury.io/js/property-is-enumerable-x.svg"
  alt="npm version" height="18">
</a>
<a href="https://www.jsdelivr.com/package/npm/property-is-enumerable-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/property-is-enumerable-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>

<a name="module_property-is-enumerable-x"></a>

## property-is-enumerable-x

Indicates whether the specified property is enumerable.

<a name="exp_module_property-is-enumerable-x--module.exports"></a>

### `module.exports(object, property)` ⇒ <code>boolean</code> ⏏

This method returns a Boolean indicating whether the specified property is
enumerable. Does not attempt to fix bugs in IE<9 or old Opera, otherwise it
does ES6ify the method.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - A Boolean indicating whether the specified property is
enumerable.  
**Throws**:

- <code>TypeError</code> If target is null or undefined.

| Param    | Type                                       | Description                               |
| -------- | ------------------------------------------ | ----------------------------------------- |
| object   | <code>Object</code>                        | The object on which to test the property. |
| property | <code>string</code> \| <code>Symbol</code> | The name of the property to test.         |

**Example**

```js
import propertyIsEnumerable from 'property-is-enumerable-x';

const o = {};
const a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';

console.log(propertyIsEnumerable(o, 'prop')); // true
console.log(propertyIsEnumerable(a, 0)); // true
```
