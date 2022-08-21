const arraySortByRatingAsc = (arr, key) => {
  if (arr && key) {
    const sortArrayOfObjects = arr.sort((a, b) => {
      return a[key] - b[key];
    });
    return sortArrayOfObjects;
  }
};

export { arraySortByRatingAsc };
