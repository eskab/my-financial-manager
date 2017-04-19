const mapStringsToObject = (collection, fieldName) => collection.map(
  value => ({
    [fieldName]: value
  })
);

export { mapStringsToObject };
