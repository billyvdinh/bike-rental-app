export const applyFilters = (reservations, filters) =>
  reservations.filter((reservation) => {
    if (filters.user) {
      const userMatched = reservation.user_id.includes(filters.user.id);

      if (!userMatched) {
        return false;
      }
    }

    if (filters.bike) {
      const bikeMatched = reservation.bike_id.includes(filters.bike.id);

      if (!bikeMatched) {
        return false;
      }
    }

    return true;
  });

export const applyPagination = (reservations, page, rowsPerPage) =>
  reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
