import { Box, Card, Typography } from "@mui/material";

export const BikesOverview = (props) => {
  const { bikes } = props;

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
            {bikes.length}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
            Bikes
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
