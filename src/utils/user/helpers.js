export const applyFilters = (users, filters) =>
  users.filter((user) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          user[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.isManager && user.role !== "manager") {
      return false;
    }

    if (filters.isUser && user.role !== "user") {
      return false;
    }

    return true;
  });

export const descendingComparator = (a, b, sortBy) => {
  // When compared to something undefined, always returns false.
  // This means that if a field does not exist from either element ('a' or 'b') the return will be 0.

  if (b[sortBy] < a[sortBy]) {
    return -1;
  }

  if (b[sortBy] > a[sortBy]) {
    return 1;
  }

  return 0;
};

export const getComparator = (sortDir, sortBy) =>
  sortDir === "desc"
    ? (a, b) => descendingComparator(a, b, sortBy)
    : (a, b) => -descendingComparator(a, b, sortBy);

export const applySort = (users, sort) => {
  const [sortBy, sortDir] = sort.split("|");
  const comparator = getComparator(sortDir, sortBy);
  const stabilizedThis = users.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

export const applyPagination = (users, page, rowsPerPage) =>
  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
