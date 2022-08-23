import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { useUpdateEffect } from "../../../hooks/use-update-effect";
import { MultiSelect } from "../../common/multi-select";
import { DateRangeFilter } from "../../common/date-range-filter";
import { RatingFilter } from "../../common/rating-filter";
import {
  models as modelOptions,
  colors as colorOptions,
  locations as locationOptions,
} from "../../../utils/bike/constants";

const availabilityOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Unavailable",
    value: "unavailable",
  },
];

export const BikeListFilters = (props) => {
  const { onChange, ...other } = props;
  const [filterItems, setFilterItems] = useState([]);

  useUpdateEffect(
    () => {
      const filters = {
        model: [],
        color: [],
        location: [],
        date_range: {},
        rating: {},
        availability: undefined,
      };

      // Transform the filter items in an object that can be used by the parent component to call the
      // serve with the updated filters
      filterItems.forEach((filterItem) => {
        switch (filterItem.field) {
          case "model":
            filters.model.push(filterItem);
            break;
          case "color":
            filters.color.push(filterItem);
            break;
          case "location":
            filters.location.push(filterItem);
            break;
          case "availability":
            filters.availability = filterItem;
            break;
          case "date_range":
            filters.date_range = filterItem;
            break;
          case "rating":
            filters.rating = filterItem;
            break;
          default:
            break;
        }
      });

      onChange?.(filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterItems]
  );

  const handleDelete = (filterItem) => {
    setFilterItems((prevState) =>
      prevState.filter((_filterItem) => {
        return !(
          filterItem.field === _filterItem.field &&
          filterItem.value === _filterItem.value
        );
      })
    );
  };

  const handleModelChange = (values) => {
    setFilterItems((prevState) => {
      const valuesFound = [];

      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== "model") {
          return true;
        }

        const found = values.includes(filterItem.value);
        if (found) {
          valuesFound.push(filterItem.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = modelOptions.find((option) => option.value === value);

          newFilterItems.push({
            label: "Model",
            field: "model",
            value,
            displayValue: option.label,
          });
        }
      });

      return newFilterItems;
    });
  };

  const handleColorChange = (values) => {
    setFilterItems((prevState) => {
      const valuesFound = [];

      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== "color") {
          return true;
        }

        const found = values.includes(filterItem.value);

        if (found) {
          valuesFound.push(filterItem.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = colorOptions.find((option) => option.value === value);

          newFilterItems.push({
            label: "Color",
            field: "color",
            value,
            displayValue: option.label,
          });
        }
      });

      return newFilterItems;
    });
  };

  const handleLocationChange = (values) => {
    setFilterItems((prevState) => {
      const valuesFound = [];

      // First cleanup the previous filter items
      const newFilterItems = prevState.filter((filterItem) => {
        if (filterItem.field !== "location") {
          return true;
        }

        const found = values.includes(filterItem.value);

        if (found) {
          valuesFound.push(filterItem.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newFilterItems;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = locationOptions.find(
            (option) => option.value === value
          );

          newFilterItems.push({
            label: "Location",
            field: "location",
            value,
            displayValue: option.label,
          });
        }
      });

      return newFilterItems;
    });
  };

  const handleAvailabilityChange = (values) => {
    // Available can only have one value, even if displayed as multi-select, so we select the first one.
    // This example allows you to select one value or "All", which is not included in the
    // rest of multi-selects.

    setFilterItems((prevState) => {
      // First cleanup the previous filter items
      const newFilterItems = prevState.filter(
        (filterItem) => filterItem.field !== "availability"
      );
      const latestValue = values[values.length - 1];

      switch (latestValue) {
        case "available":
          newFilterItems.push({
            label: "Availability",
            field: "availability",
            value: "available",
            displayValue: "Available",
          });
          break;
        case "unavailable":
          newFilterItems.push({
            label: "Availability",
            field: "availability",
            value: "unavailable",
            displayValue: "Unavailable",
          });
          break;
        default:
          // Should be "all", so we do not add this filter
          break;
      }

      return newFilterItems;
    });
  };

  const handleDateRangeChange = (values) => {
    setFilterItems((prevState) => {
      // First cleanup the previous filter items
      const newFilterItems = prevState.filter(
        (filterItem) => filterItem.field !== "date_range"
      );

      newFilterItems.push({
        label: "Date Range",
        field: "date_range",
        value: values,
        displayValue: `${values.startDate.toLocaleString()}-${values.endDate.toLocaleString()}`,
      });

      return newFilterItems;
    });
  };

  const handleRatingChange = (value) => {
    setFilterItems((prevState) => {
      // First cleanup the previous filter items
      const newFilterItems = prevState.filter(
        (filterItem) => filterItem.field !== "rating"
      );

      newFilterItems.push({
        label: "Rating",
        field: "rating",
        value: value,
        displayValue: `${value[0]}-${value[1]}`,
      });

      return newFilterItems;
    });
  };

  // We memoize this part to prevent re-render issues
  const modelValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === "model")
        .map((filterItems) => filterItems.value),
    [filterItems]
  );

  const colorValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === "color")
        .map((filterItems) => filterItems.value),
    [filterItems]
  );

  const locationValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === "location")
        .map((filterItems) => filterItems.value),
    [filterItems]
  );

  const availabilityValue = useMemo(() => {
    const values = filterItems
      .filter((filterItems) => filterItems.field === "availability")
      .map((filterItems) => filterItems.value);

    // Since we do not display the "all" as chip, we add it to the multi-select as a selected value
    if (values.length === 0) {
      values.unshift("all");
    }

    return values;
  }, [filterItems]);

  const dateRangeValue = useMemo(() => {
    const value = filterItems.find((item) =>
      item.filed === "date_range" ? item.value : {}
    );
    return value;
  }, [filterItems]);

  const ratingValue = useMemo(() => {
    const value = filterItems.find((item) =>
      item.filed === "rating" ? item.value : []
    );
    return value;
  }, [filterItems]);

  return (
    <div {...other}>
      {filterItems.length > 0 ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            p: 2,
          }}
        >
          {filterItems.map((filterItem, i) => (
            <Chip
              key={i}
              label={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    "& span": {
                      fontWeight: 600,
                    },
                  }}
                >
                  <span>{filterItem.label}</span>:{" "}
                  {filterItem.displayValue || filterItem.value}
                </Box>
              }
              onDelete={() => handleDelete(filterItem)}
              sx={{ m: 1 }}
              variant="outlined"
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography color="textSecondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          p: 1,
        }}
      >
        <MultiSelect
          label="Model"
          onChange={handleModelChange}
          options={modelOptions}
          value={modelValues}
        />
        <MultiSelect
          label="Color"
          onChange={handleColorChange}
          options={colorOptions}
          value={colorValues}
        />
        <MultiSelect
          label="Location"
          onChange={handleLocationChange}
          options={locationOptions}
          value={locationValues}
        />

        <MultiSelect
          label="Availability"
          onChange={handleAvailabilityChange}
          options={availabilityOptions}
          value={availabilityValue}
        />

        <RatingFilter
          label="Rating"
          onChange={handleRatingChange}
          value={ratingValue}
        />

        <DateRangeFilter
          label="Date Range"
          onChange={handleDateRangeChange}
          value={dateRangeValue}
        />
      </Box>
    </div>
  );
};

BikeListFilters.propTypes = {
  onChange: PropTypes.func,
};
