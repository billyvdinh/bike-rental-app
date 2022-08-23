import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../icons/search";
import { wait } from "../../utils/wait";
import { X as XIcon } from "../icons/x";

export const ContentSearchDialog = (props) => {
  const { onClose, open, ...other } = props;
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open} {...other}>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            label="Search"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search..."
            sx={{ mt: 3 }}
            value={value}
          />
        </form>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

ContentSearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
