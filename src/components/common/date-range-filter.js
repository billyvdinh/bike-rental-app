import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Box } from "@mui/material";
import { DateRangePicker } from "mui-daterange-picker";

import { ChevronDown as ChevronDownIcon } from "../icons/chevron-down";
export const DateRangeFilter = (props) => {
  const { label, onChange, value = {}, ...other } = props;
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({});

  const toggle = () => setOpen(!open);

  const handleApply = () => {
    setOpen(false);
    setDateRange(dateRange);
    onChange?.(dateRange);
  };

  const handleCancel = () => {
    setOpen(false);
    setDateRange({});
  };

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={toggle}
        style={{ zIndex: 1 }}
        {...other}
      >
        {label}
      </Button>
      <Grid container>
        <Grid
          item
          md={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
          }}
        >
          <DateRangePicker
            open={open}
            definedRanges={[]}
            minDate={new Date()}
            initialDateRange={value}
            closeOnClickOutside={false}
            style={{ zIndex: -1 }}
            onChange={(range) => {
              const startDate = new Date(range.startDate.setHours(0, 0, 0, 0));
              const endDate = new Date(range.endDate.setHours(23, 59, 59, 999));
              setDateRange({ startDate, endDate });
            }}
          />
          {open && (
            <Box>
              <Button sx={{ m: 1 }} variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>

              <Button sx={{ m: 1 }} variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

DateRangeFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
