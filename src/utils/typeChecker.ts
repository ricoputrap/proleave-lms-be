/**
 * Validate Numeric Variable
 * =========================
 * Check whether a variable is numeric (number) or not.
 * @param value the variable that will be validated
 * @returns `true` if the variable is numeric, `false` otherwise
 */
export const isNumeric = (value: any): boolean => {
  return /^-?\d+$/.test(value);
}

/**
 * Validate All Numbers
 * =====================
 * Check whether all elements in the array are numbers (numeric)
 * @param values array of elements that will be validated
 * @returns `true` if all elements in the array are numbers, `false` otherwise
 */
export const isArrayNumeric = (values: any[]): boolean => {

  for (let i = 0; i < values.length; i++) {
    if (!isNumeric(values[i]))
      return false;
  }

  return true;
}

/**
 * Validate Unique Numbers
 * ========================
 * Check whether all elements in the array are unique.
 * @param values elements that will be validated
 * @returns `true` if all elements are unique, `false` otherwise
 */
export const isUniqueNumbers = (values: any[]): boolean => {
  const numbers: number[] = values.map(val => parseInt(val));
  return (new Set(numbers)).size === values.length;
}