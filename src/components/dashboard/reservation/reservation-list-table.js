import { Fragment, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { SeverityPill } from "../../common/severity-pill";
import { BikeRatingDialog } from "../bike/bike-rating-dialog";
import { ReservationCancelDialog } from "./reservation-cancel-dialog";
import RoleGuard from "../../auth/role-guard";

export const ReservationListTable = (props) => {
  const {
    onCancelReservation,
    onRateBike,
    onPageChange,
    onRowsPerPageChange,
    page,
    reservations,
    reservationsCount,
    rowsPerPage,
    ...other
  } = props;
  const [reservation, setReservation] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openRateDialog, setOpenRateDialog] = useState(false);

  const handleOpenCancelDialog = (reservation) => {
    setReservation(reservation);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setReservation(null);
    setOpenCancelDialog(false);
  };

  const handleOpenRateDialog = (reservation) => {
    setReservation(reservation);
    setOpenRateDialog(true);
  };

  const handleCloseRateDialog = () => {
    setReservation(null);
    setOpenRateDialog(false);
  };

  return (
    <div {...other}>
      <ReservationCancelDialog
        reservation={reservation}
        onClose={handleCloseCancelDialog}
        onSubmit={onCancelReservation}
        open={openCancelDialog}
      />
      <BikeRatingDialog
        reservation={reservation}
        onClose={handleCloseRateDialog}
        onSubmit={onRateBike}
        open={openRateDialog}
      />
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <RoleGuard role="manager">
              <TableCell>User Name</TableCell>
            </RoleGuard>
            <TableCell>Bike Name</TableCell>
            <TableCell>Reserve Start</TableCell>
            <TableCell>Reserve End</TableCell>
            <TableCell>Status</TableCell>
            <RoleGuard role="user">
              <TableCell>Actions</TableCell>
            </RoleGuard>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => {
            return (
              <Fragment key={reservation.id}>
                <TableRow hover key={reservation.id}>
                  <RoleGuard role="manager">
                    <TableCell>{reservation?.user?.name}</TableCell>
                  </RoleGuard>
                  <TableCell>{reservation?.bike?.name}</TableCell>
                  <TableCell>
                    {reservation?.start_date &&
                      new Date(reservation?.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {reservation?.end_date &&
                      new Date(reservation?.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        reservation.status === "reserved"
                          ? "success"
                          : reservation.status === "canceled"
                          ? "warning"
                          : "info"
                      }
                    >
                      {reservation.status}
                    </SeverityPill>
                  </TableCell>
                  <RoleGuard role="user">
                    <TableCell>
                      {reservation.status === "reserved" ? (
                        <Button
                          component="a"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() => handleOpenCancelDialog(reservation)}
                        >
                          CANCEL
                        </Button>
                      ) : reservation.status === "finished" ? (
                        <Button
                          component="a"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() => handleOpenRateDialog(reservation)}
                        >
                          RATE BIKE
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </RoleGuard>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={reservationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ReservationListTable.propTypes = {
  reservations: PropTypes.array.isRequired,
  reservationsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
