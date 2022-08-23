import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Typography, useForkRef } from "@mui/material";
import { AuthGuard } from "../../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { BikeRentForm } from "../../../../components/dashboard/bike/bike-rent-form";
import { useAuth } from "../../../../hooks/use-auth";

import { useDispatch, useSelector } from "../../../../store/store";
import { getBikes } from "../../../../store/slices/bikes";
import { getBikeReservations } from "../../../../store/slices/reservations";
import reservationDataService from "../../../../services/firebase/reservations";

const BikeRent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [bike, setBike] = useState(null);
  const { bikes } = useSelector((state) => state.bikes);
  const { bikeReservations } = useSelector((state) => state.reservations);
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(
    () => {
      dispatch(getBikeReservations(id));
      const selectedBike = bikes.find((bike) => bike.id === id);
      if (selectedBike) setBike(selectedBike);
      else if (id === "new") setBike(null);
      else dispatch(getBikes());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const selectedBike = bikes.find((bike) => bike.id === id);
    setBike(selectedBike);
  }, [bikes, id]);

  useEffect(() => {
    const selectedBike = bikes.find((bike) => bike.id === id);
    if (selectedBike) setBike(selectedBike);
  }, [bikes, id]);

  const handleRent = async (payload) => {
    const res = await reservationDataService.create({
      user_id: user.id,
      ...payload,
    });
  };

  const checkAvailability = async (startDate, endDate) => {
    const bikeReservations = await reservationDataService.getByBikeId(id);
    console.log(bikeReservations);
    return true;
  };

  if (!bike) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Bike Rent</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Rent {bike.name}</Typography>
          </Box>
          <BikeRentForm
            bike={bike}
            bikeReservations={bikeReservations}
            handleRent={handleRent}
          />
        </Container>
      </Box>
    </>
  );
};

BikeRent.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BikeRent;
