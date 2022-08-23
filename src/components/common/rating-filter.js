import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Box, Slider, Menu, MenuItem } from "@mui/material";
import { ChevronDown as ChevronDownIcon } from "../icons/chevron-down";
export const RatingFilter = (props) => {
  const { label, onChange, value = [], ...other } = props;
  const [range, setRange] = useState([1, 5]);
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleChange = (event, newValue) => {
    setRange(newValue);
    onChange?.(newValue);
  };

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        {...other}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        <Box sx={{ mx: 4, mt: 5 }}>
          <Slider
            aria-label="Always visible"
            min={1}
            max={5}
            value={range}
            onChange={handleChange}
            valueLabelDisplay="on"
          />
        </Box>
      </Menu>
    </>
  );
};

RatingFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
};
