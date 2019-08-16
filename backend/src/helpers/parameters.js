import { isArray, isSimpleObject } from "./checkDataType";

export function getParametersFromObject(requireParams, object) {
  if (!isArray(requireParams)) {
    throw new Error(`${requireParams} is not an array`);
  }

  if (!isSimpleObject) {
    throw new Error(`${object} is not a simple object`);
  }

  const strictObject = {};
  for (let i = 0; i < requireParams.length; i++) {
    for (let key in object) {
      if (key === requireParams[i]) {
        strictObject[key] = object[key];
      }
    }
  }
  return strictObject;
}
