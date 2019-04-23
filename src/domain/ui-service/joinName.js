/**
 * @prettier
 * @description: joinName function that resolves property names from a schema
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * joinName
 * @param parts
 * @returns {any}
 */
function joinName(...parts) {
  const name = parts.reduce(
    (parts, part) =>
      part || part === 0 ? parts.concat(typeof part === 'string' ? part.split('.') : part) : parts,
    []
  )

  return parts[0] === null ? name.map(part => part.toString()) : name.join('.')
}

export default joinName
