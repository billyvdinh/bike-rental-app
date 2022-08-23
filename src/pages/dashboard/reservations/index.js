import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Card,
  Container,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import { AuthGuard } from "../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

import {
  applyFilters,
  applyPagination,
} from "../../../utils/reservation/helpers";

import { ReservationListTable } from "../../../components/dashboard/reservation/reservation-list-table";
import { Plus as PlusIcon } from "../../../components/icons/plus";

import { useAuth } from "../../../hooks/use-auth";
import { useDispatch, useSelector } from "../../../store/store";
import {
  getReservations,
  getReservationsByUserId,
} from "../../../store/slices/reservations";

import { getUsers } from "../../../store/slices/users";
import { getBikes } from "../../../store/slices/bikes";
import reservationDataService from "../../../services/firebase/reservations";
import bikeRatingDataService from "../../../services/firebase/bike_ratings";
import RoleGuard from "../../../components/auth/role-guard";

const ReservationList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    user: null,
    bike: null,
  });

  const dispatch = useDispatch();
  const { reservations, loadingReservations } = useSelector(
    (state) => state.reservations
  );
  const { users, loadingUsers } = useSelector((state) => state.users);
  const { bikes, loadingBikes } = useSelector((state) => state.bikes);

  useEffect(
    () => {
      dispatch(getBikes());
      if (user.role === "manager") {
        dispatch(getUsers());
        dispatch(getReservations());
      } else {
        dispatch(getReservationsByUserId(user.id));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCancelReservation = async (id) => {
    await reservationDataService.cancel(id);
    if (user.role === "manager") {
      dispatch(getReservations());
    } else {
      dispatch(getReservationsByUserId(user.id));
    }
  };

  const handleRateBike = async (bike_id, rating) => {
    const payload = {
      user_id: user.id,
      bike_id: bike_id,
      rating: rating,
    };
    await bikeRatingDataService.create(payload);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredReservations = applyFilters(reservations, filters);
  const paginatedReservations = applyPagination(
    filteredReservations,
    page,
    rowsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard: Reservation List</title>
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
                <Typography variant="h4">Reservations</Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            ></Box>
          </Box>
          <Card>
            <Grid
              container
              sx={{
                display: "flex",
                my: 2,
                px: 2,
              }}
            >
              <RoleGuard role="manager">
                <Grid item md={6} xs={12} sx={{ px: 2 }}>
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) =>
                      `${option.name}(${option.email})`
                    }
                    value={filters.user}
                    onChange={(e, val) => {
                      setFilters({ ...filters, user: val });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter by user"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </RoleGuard>
              <Grid item md={6} xs={12} sx={{ px: 2 }}>
                <Autocomplete
                  options={bikes}
                  getOptionLabel={(option) =>
                    `${option.name}(${option.model} - ${option.location} - ${option.color})`
                  }
                  value={filters.bike}
                  onChange={(e, val) => {
                    setFilters({ ...filters, bike: val });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter by bike"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ width: "100%" }}>
              {loadingReservations && loadingBikes && loadingUsers && (
                <LinearProgress />
              )}
            </Box>
            <ReservationListTable
              onCancelReservation={handleCancelReservation}
              onRateBike={handleRateBike}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              reservations={paginatedReservations}
              reservationsCount={filteredReservations.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ReservationList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ReservationList;
