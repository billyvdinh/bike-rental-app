import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Logo } from "../logo";

export const Footer = (props) => (
  <Box
    sx={{
      backgroundColor: "background.default",
      borderTopColor: "divider",
      borderTopStyle: "solid",
      borderTopWidth: 1,
      pb: 3,
      pt: {
        md: 6,
        xs: 3,
      },
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            order: {
              md: 1,
              xs: 4,
            },
          }}
          xs={12}
        >
          <Logo />
          <Typography color="textSecondary" sx={{ mt: 1 }} variant="caption">
            © 2022
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
