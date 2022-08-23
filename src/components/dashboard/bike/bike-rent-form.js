import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DateRangePicker } from "mui-daterange-picker";

import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { isOverlapped } from "../../../utils/dateUtils";

export const BikeRentForm = (props) => {
  const { bike, bikeReservations, handleRent, ...other } = props;
  const router = useRouter();
  const [dateRange, setDateRange] = useState({});
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    // Check availability
    const checkHelper = () => {
      if (
        typeof dateRange.startDate !== "undefined" &&
        typeof dateRange.endDate !== "undefined"
      ) {
        for (const res of bikeReservations) {
          if (
            isOverlapped(
              new Date(res.start_date),
              new Date(res.end_date),
              dateRange.startDate,
              dateRange.endDate
            )
          ) {
            setAvailable(false);
            return;
          }
        }

        setAvailable(true);
      } else {
        setAvailable(false);
      }
    };
    checkHelper();
  }, [dateRange, bikeReservations]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const startDate = new Date(dateRange.startDate.setHours(0, 0, 0, 0));
      const endDate = new Date(dateRange.endDate.setHours(23, 59, 59, 999));

      const payload = {
        bike_id: router.query.id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: "reserved",
      };
      await handleRent(payload);
      toast.success("Rent success!");
      router.push("/dashboard/bikes").catch(console.error);
    } catch (e) {
      toast.error("Rent failed!");
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Card>
        <CardContent>
          <Grid container>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">Bike details</Typography>
            </Box>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h6">Name:</Typography>
                <Typography variant="body">{bike.name}</Typography>
              </Box>

              <Box>
                <Typography variant="h6">Model:</Typography>
                <Typography variant="body">{bike.model}</Typography>
              </Box>

              <Box>
                <Typography variant="h6">Color:</Typography>
                <Typography variant="body">{bike.color}</Typography>
              </Box>

              <Box>
                <Typography variant="h6">Location: </Typography>
                <Typography variant="body">{bike.location}</Typography>
              </Box>
            </Grid>
            <Grid container sx={{ mt: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5">Reservations</Typography>
              </Box>
              <Grid
                item
                md={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {bikeReservations.length > 0 ? (
                  <>
                    {bikeReservations.map((reservation) => (
                      <Box key={reservation.id}>
                        <Typography variant="body">
                          {new Date(
                            reservation.start_date
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(reservation.end_date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Box>
                    <Typography variant="body">
                      No reservations found
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", gap: 4, mt: 4, justifyContent: "center" }}
            >
              <DateRangePicker
                open={true}
                definedRanges={[]}
                minDate={new Date()}
                closeOnClickOutside={false}
                onChange={(range) => {
                  setDateRange(range);
                }}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                mt: 4,
                gap: 4,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {typeof dateRange.startDate === "undefined" ? (
                <Box>Select date range.</Box>
              ) : available ? (
                <>
                  <Box>
                    <Typography variant="h6">From</Typography>
                    <Typography variant="body">
                      {dateRange.startDate?.toLocaleString() ?? ""}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">To</Typography>
                    <Typography variant="body">
                      {dateRange.endDate?.toLocaleString() ?? ""}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box>Date range overlapped with other reservation.</Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <NextLink href="/dashboard/bikes" passHref>
            <Button component="a" disabled={false} variant="outlined">
              Cancel
            </Button>
          </NextLink>
          <Button
            disabled={!available}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
