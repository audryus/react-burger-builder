export const updateObject = (oldObject, updateddValues) => {
  return {
    ...oldObject,
    ...updateddValues
  }
};