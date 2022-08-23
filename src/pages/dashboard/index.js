import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AuthGuard } from "../../components/auth/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { BikesOverview } from "../../components/dashboard/overview/bikes-overview";
import { UsersOverview } from "../../components/dashboard/overview/users-overview";
import { ReservationsOverview } from "../../components/dashboard/overview/reservations-overview";

import RoleGuard from "../../components/auth/role-guard";
import { useAuth } from "../../hooks/use-auth";
import { useDispatch, useSelector } from "../../store/store";
import { getUsers } from "../../store/slices/users";
import { getBikes } from "../../store/slices/bikes";
import {
  getReservations,
  getReservationsByUserId,
} from "../../store/slices/reservations";
import { useEffect } from "react";

const Overview = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { bikes } = useSelector((state) => state.bikes);
  const { reservations } = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(getBikes());
    if (user?.role === "manager") {
      dispatch(getUsers());
      dispatch(getReservations());
    } else {
      dispatch(getReservationsByUserId(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Welcome!</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  m: -1,
                }}
              ></Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <BikesOverview bikes={bikes} />
            </Grid>
            <Grid item md={4} xs={12}>
              <ReservationsOverview reservations={reservations} />
            </Grid>
            <RoleGuard role="manager">
              <Grid item md={4} xs={12}>
                <UsersOverview users={users} />
              </Grid>
            </RoleGuard>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Overview;
