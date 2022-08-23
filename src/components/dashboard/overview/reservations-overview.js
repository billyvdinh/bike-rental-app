import { Box, Card, Typography } from "@mui/material";

export const ReservationsOverview = (props) => {
  const { reservations } = props;

  return (
    <Card {...props}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          p: 4,
        }}
      >
        <Box>
          <Typography color="primary" variant="h4">
            {reservations.length}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
            Reservations
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
