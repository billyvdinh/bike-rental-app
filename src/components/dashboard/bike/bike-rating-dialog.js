import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import {
  Grid,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Divider,
  Rating,
} from "@mui/material";
import { X as XIcon } from "../../icons/x";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export const BikeRatingDialog = (props) => {
  const { onClose, onSubmit, open, reservation, ...other } = props;
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit(reservation.bike_id, value);
    setIsLoading(false);
    toast.success("Bike rating saved!");
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={!!open} {...other}>
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
        <Typography variant="h6">Rate Bike</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <form>
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Bike Name: </Typography>
              <Typography variant="body">{reservation?.bike?.name}</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Model: </Typography>
              <Typography variant="body">{reservation?.bike?.model}</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Color: </Typography>
              <Typography variant="body">{reservation?.bike?.color}</Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Typography variant="h6">Location: </Typography>
              <Typography variant="body">
                {reservation?.bike?.location}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid
            item
            md={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "center", my: 4 }}
          >
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                size="large"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              component="a"
              variant="outlined"
              size="small"
              sx={{ ml: "auto" }}
              onClick={onClose}
            >
              CLOSE
            </Button>
            <Button
              component="a"
              variant="contained"
              size="small"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <CircularProgress color="secondary" size="30" />
              ) : (
                "SUBMIT"
              )}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

BikeRatingDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
