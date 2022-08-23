import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import { AuthGuard } from "../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

import { BikeListFilters } from "../../../components/dashboard/bike/bike-list-filters";
import { BikeListTable } from "../../../components/dashboard/bike/bike-list-table";
import { Plus as PlusIcon } from "../../../components/icons/plus";

import RoleGuard from "../../../components/auth/role-guard";
import { usePrevious } from "../../../hooks/use-previous";
import { useDispatch, useSelector } from "../../../store/store";
import {
  getBikes,
  updateBike,
  deleteBike,
  getBikesByDateRange,
} from "../../../store/slices/bikes";
import { applyFilters, applyPagination } from "../../../utils/bike/helpers";

const BikeList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    model: [],
    color: [],
    location: [],
    rating: {},
    date_range: {},
    availability: undefined,
  });
  const prevFilters = usePrevious(filters);
  const dispatch = useDispatch();
  const { bikes, loadingBikes } = useSelector((state) => state.bikes);

  useEffect(
    () => {
      dispatch(getBikes());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (
      prevFilters?.date_range?.displayValue !==
      filters?.date_range?.displayValue
    ) {
      if (filters?.date_range?.displayValue) {
        dispatch(
          getBikesByDateRange(
            filters.date_range.value.startDate,
            filters.date_range.value.endDate
          )
        );
      } else {
        dispatch(getBikes());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const onBikeDelete = async (id) => {
    dispatch(deleteBike(id));
  };

  const onBikeUpdate = (id, payload) => {
    dispatch(updateBike(id, payload));
  };

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredBikes = applyFilters(bikes, filters);
  const paginatedBikes = applyPagination(filteredBikes, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>Dashboard: Bike List</title>
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
                <Typography variant="h4">Bikes</Typography>
              </Grid>
              <RoleGuard role="manager">
                <Grid item>
                  <NextLink href="/dashboard/bikes/new" passHref>
                    <Button
                      component="a"
                      startIcon={<PlusIcon fontSize="small" />}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </NextLink>
                </Grid>
              </RoleGuard>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            ></Box>
          </Box>
          <Card>
            <BikeListFilters onChange={handleFiltersChange} />
            <Box sx={{ width: "100%" }}>
              {loadingBikes && <LinearProgress />}
            </Box>
            <BikeListTable
              onBikeDelete={onBikeDelete}
              onBikeUpdate={onBikeUpdate}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              bikes={paginatedBikes}
              bikesCount={filteredBikes.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

BikeList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BikeList;
