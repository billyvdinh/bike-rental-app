import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { BikeForm } from "../../../components/dashboard/bike/bike-form";

import { useDispatch, useSelector } from "../../../store/store";
import {
  getBikes,
  createBike,
  updateBike,
  deleteBike,
} from "../../../store/slices/bikes";

const BikeDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [bike, setBike] = useState(null);
  const { bikes } = useSelector((state) => state.bikes);
  const { id } = router.query;

  useEffect(
    () => {
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
    if (selectedBike) setBike(selectedBike);
  }, [bikes, id]);

  const handleDelete = async (id) => {
    dispatch(deleteBike(id));
    router.push("/dashboard/bikes");
  };

  const handleSubmit = (values) => {
    const payload = {
      name: values.name,
      model: values.model,
      color: values.color,
      location: values.location,
      available: values.available,
    };

    if (values.id) {
      dispatch(updateBike(id, payload));
    } else {
      dispatch(createBike(payload));
    }
    router.push("/dashboard/bikes");
  };

  return (
    <>
      <Head>
        <title>Dashboard: Bike Create</title>
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
            <Typography variant="h4">Create a new bike</Typography>
          </Box>
          <BikeForm
            bike={bike}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
        </Container>
      </Box>
    </>
  );
};

BikeDetail.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BikeDetail;
