import { Box, Card, Container, Grid, Link, Typography } from "@mui/material";

export const HomeHero = (props) => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      py: 15,
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Typography align="center" sx={{ pb: 6 }} variant="h3">
        Officia ad sit magna est mollit.
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              position: "relative",
            }}
            variant="outlined"
          >
            <Typography sx={{ color: "textPrimary" }} variant="h5">
              In ea eiusmod sunt sunt ut commodo cillum sint est velit sunt
              aliqua enim.
            </Typography>
            <Typography
              sx={{
                color: "textPrimary",
                py: 2,
              }}
              variant="body2"
            >
              Irure officia ex minim nisi officia sunt commodo ipsum labore
              pariatur occaecat fugiat incididunt. Anim ut ipsum commodo non ex
              esse. Proident mollit est deserunt esse ad et id voluptate
              excepteur. Mollit nulla dolore exercitation nulla sint consequat
              excepteur culpa ex ipsum nisi ullamco incididunt. Veniam fugiat
              velit cupidatat fugiat cillum laboris nostrud ex ut esse eu mollit
              labore duis. Consequat in ipsum officia ex nulla aliquip fugiat
              magna ipsum sit minim laborum. Qui nostrud adipisicing enim
              consectetur nulla amet excepteur do nulla. Do ad nisi eu do minim
              excepteur pariatur consectetur esse. Ex dolore laboris labore quis
              ad do adipisicing ullamco ex sunt reprehenderit anim sunt. Ad duis
              enim aliquip tempor sint exercitation ea id dolor labore qui.
            </Typography>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              position: "relative",
            }}
            variant="outlined"
          >
            <Typography sx={{ color: "textPrimary" }} variant="h5">
              In ea eiusmod sunt sunt ut commodo cillum sint est velit sunt
              aliqua enim.
            </Typography>
            <Typography
              sx={{
                color: "textPrimary",
                py: 2,
              }}
              variant="body2"
            >
              Enim quis nulla cupidatat laborum dolor laboris. Amet duis irure
              do consectetur fugiat eiusmod enim sit. Reprehenderit magna anim
              et ut cupidatat enim consequat sunt excepteur fugiat ad aute.
              Irure nisi incididunt ad aliquip sit nostrud ea incididunt
              excepteur minim. Qui sit irure velit nulla amet. Consequat ea aute
              exercitation dolor sunt sit ad velit ea sunt anim. Nulla do
              reprehenderit dolore in consequat in. Consequat magna labore nulla
              adipisicing. Cupidatat ea adipisicing ullamco excepteur minim
              minim proident sit id ad quis. Enim cillum consectetur esse quis
              qui sint. Aliqua aute magna irure commodo magna nostrud. Qui eu
              nostrud ipsum ex id commodo tempor laborum ipsum tempor non eu
              nisi.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
