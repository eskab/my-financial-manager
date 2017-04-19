const sortBy = (collection, direction, field) => collection
  .sort((a, b) => {
    if (direction === "ASC" ? a[field] > b[field] : a[field] < b[field]) {
      return 1;
    }
    if (direction === "ASC" ? a[field] < b[field] : a[field] > b[field]) {
      return -1;
    }
    return 0;
  });

export { sortBy };
