export function isArray(possibleArray) {
  return Array.isArray(possibleArray);
}

export function isSimpleObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}
