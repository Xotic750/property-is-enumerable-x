import toPropertyKey from 'to-property-key-x';
import toObject from 'to-object-x';
var propIsEnumerable = {}.propertyIsEnumerable;
/**
 * This method returns a Boolean indicating whether the specified property is
 * enumerable. Does not attempt to fix bugs in IE<9 or old Opera, otherwise it
 * does ES6ify the method.
 *
 * @param {!object} object - The object on which to test the property.
 * @param {string|symbol} property - The name of the property to test.
 * @throws {TypeError} If target is null or undefined.
 * @returns {boolean} A Boolean indicating whether the specified property is
 *  enumerable.
 */

var propertyIsEnumerable = function propertyIsEnumerable(object, property) {
  return propIsEnumerable.call(toObject(object), toPropertyKey(property));
};

export default propertyIsEnumerable;

//# sourceMappingURL=property-is-enumerable-x.esm.js.map