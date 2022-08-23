import { Box, Card, Typography } from "@mui/material";

export const UsersOverview = (props) => {
  const { users } = props;

  return (
    <Card {...props}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          p: 4,
        }}
      >
        <Box>
          <Typography color="primary" variant="h4">
            {users.length}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
            Users
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
