export const applyFilters = (bikes, filters) =>
  bikes.filter((bike) => {
    if (filters.name) {
      const nameMatched = bike.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    // It is possible to select multiple model options
    if (filters.model?.length > 0) {
      const modelMatched = filters.model
        .map((item) => item.value)
        .includes(bike.model);

      if (!modelMatched) {
        return false;
      }
    }

    // It is possible to select multiple color options
    if (filters.color?.length > 0) {
      const colorMatched = filters.color
        .map((item) => item.value)
        .includes(bike.color);

      if (!colorMatched) {
        return false;
      }
    }

    // It is possible to select multiple location options
    if (filters.location?.length > 0) {
      const locationMatched = filters.location
        .map((item) => item.value)
        .includes(bike.location);

      if (!locationMatched) {
        return false;
      }
    }

    // Present only if filter required
    if (typeof filters.availability !== "undefined") {
      const availability = bike.available ? "available" : "unavailable";
      const availabilityMatched = filters.availability.value === availability;

      if (!availabilityMatched) {
        return false;
      }
    }

    if (typeof filters.rating !== "undefined") {
      if (typeof filters.rating.value !== "undefined") {
        if (typeof bike.rating === "undefined") return false;

        if (
          bike.rating < filters.rating.value[0] ||
          bike.rating > filters.rating.value[1]
        )
          return false;
      }
    }

    return true;
  });

export const applyPagination = (bikes, page, rowsPerPage) =>
  bikes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
