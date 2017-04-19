const mapStringsToObjects = (collection, fieldName) => collection.map(
  value => ({
    [fieldName]: value
  })
);

export { mapStringsToObjects };
