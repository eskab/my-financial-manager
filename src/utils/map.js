const mapStringsToObjects = (collection, fieldName) => collection.map(
  value => ({
    key: value.toLowerCase(),
    [fieldName]: value
  })
);

export { mapStringsToObjects };
