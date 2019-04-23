/**
 * @prettier
 * @description:
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import invariant from 'fbjs/lib/invariant'

/**
 * Helper function to resolve references in schemas
 * @param {string} reference
 * @param {object} schema
 * @returns {Object}
 */
const resolveRef = (reference, schema) => {
  invariant(
    reference.startsWith('#'),
    'Reference is not an internal reference, and only such are allowed: "%s"',
    reference
  )

  const resolvedReference = reference
    .split('/')
    .filter(part => part && part !== '#')
    .reduce((definition, next) => definition[next], schema)

  invariant(resolvedReference, 'Reference not found in schema: "%s"', reference)

  return resolvedReference
}

export default resolveRef
