/**
 * Description: joinName function that finds property names from a schema
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Function
 * @param parts
 * @returns {any}
 */
function joinName (...parts) {
  const name = parts.reduce((parts, part) => part || part === 0
    ? parts.concat(typeof part === 'string' ? part.split('.') : part)
    : parts,
    []
  );

  return parts[0] === null
    ? name.map(part => part.toString())
    : name.join('.')
    ;
}

export default joinName;