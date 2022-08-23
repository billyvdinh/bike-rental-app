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
} from "@mui/material";
import { X as XIcon } from "../../icons/x";

export const ReservationCancelDialog = (props) => {
  const { onClose, onSubmit, open, reservation, ...other } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    onSubmit(reservation.id);
    setIsLoading(false);
    toast.success("Reservation canceled!");
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
        <Typography variant="h6">Cancel Reservation</Typography>
        <IconButton color="inherit" onClick={onClose}>
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6">Bike Name: </Typography>
              <Typography variant="body">{reservation?.bike?.name}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6">Reserved From: </Typography>
              <Typography variant="body">
                {reservation?.start_date &&
                  new Date(reservation?.start_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h6">Reserved To: </Typography>
              <Typography variant="body">
                {reservation?.end_date &&
                  new Date(reservation?.end_date).toLocaleDateString()}
              </Typography>
            </Grid>
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
              {isLoading ? <CircularProgress color="secondary" /> : "SUBMIT"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

ReservationCancelDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
