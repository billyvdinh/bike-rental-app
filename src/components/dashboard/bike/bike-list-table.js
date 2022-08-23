import { Fragment, useEffect, useState } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { ChevronDown as ChevronDownIcon } from "../../icons/chevron-down";
import { ChevronUp as ChevronUpIcon } from "../../icons/chevron-up";
import { PencilAlt as PencilAltIcon } from "../../icons/user/pencil-alt";
import RoleGuard from "../../auth/role-guard";

import { SeverityPill } from "../../common/severity-pill";
import {
  models as modelOptions,
  colors as colorOptions,
  locations as locationOptions,
} from "../../../utils/bike/constants";

export const BikeListTable = (props) => {
  const {
    onBikeDelete,
    onBikeUpdate,
    onPageChange,
    onRowsPerPageChange,
    page,
    bikes,
    bikesCount,
    rowsPerPage,
    ...other
  } = props;
  const [openBike, setOpenBike] = useState(null);
  const [selectedBike, setSelectedBike] = useState({});

  const handleOpenBike = (bikeId) => {
    setOpenBike((prevValue) => (prevValue === bikeId ? null : bikeId));
  };

  useEffect(() => {
    const selected = bikes.find((bike) => bike.id === openBike);
    if (selected) {
      setSelectedBike({ ...selected });
    } else {
      setSelectedBike({
        id: "",
        name: "",
        model: "",
        color: "",
        location: "",
        available: false,
      });
    }
  }, [openBike, bikes]);

  const handleUpdateBike = () => {
    const payload = {
      id: selectedBike.id,
      name: selectedBike.name,
      model: selectedBike.model,
      color: selectedBike.color,
      location: selectedBike.location,
      available: selectedBike.available,
    };
    onBikeUpdate(selectedBike.id, payload);
    toast.success("Bike updated");
  };

  const handleCancelEdit = () => {
    setOpenBike(null);
  };

  const handleDeleteBike = () => {
    onBikeDelete(selectedBike.id);
    toast.success("Bike deleted");
  };

  return (
    <div {...other}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikes.map((bike) => {
            const open = bike.id === openBike;

            return (
              <Fragment key={bike.id}>
                <TableRow hover key={bike.id}>
                  <TableCell>{bike.name}</TableCell>
                  <TableCell>{bike.model}</TableCell>
                  <TableCell>{bike.color}</TableCell>
                  <TableCell>{bike.location}</TableCell>
                  <TableCell>{bike.rating}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={bike.available ? "success" : "warning"}
                    >
                      {bike.available ? "Available" : "Unavailable"}
                    </SeverityPill>
                  </TableCell>
                  <RoleGuard role="manager">
                    <TableCell padding="checkbox">
                      <IconButton onClick={() => handleOpenBike(bike.id)}>
                        {open ? (
                          <ChevronUpIcon fontSize="small" />
                        ) : (
                          <ChevronDownIcon fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                  </RoleGuard>
                  <RoleGuard role="user">
                    <TableCell>
                      {bike.available && (
                        <NextLink
                          href={`/dashboard/bikes/rent/${bike.id}`}
                          passHref
                        >
                          <IconButton component="a">
                            <PencilAltIcon fontSize="small" />
                          </IconButton>
                        </NextLink>
                      )}
                    </TableCell>
                  </RoleGuard>
                </TableRow>
                {open && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      sx={{
                        p: 0,
                        position: "relative",
                        "&:after": {
                          position: "absolute",
                          content: '" "',
                          top: 0,
                          left: 0,
                          backgroundColor: "primary.main",
                          width: 3,
                          height: "calc(100% + 1px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item md={4} xs={12}>
                            <Grid container spacing={3}>
                              <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Bike name"
                                  name="name"
                                  value={selectedBike.name}
                                  onChange={(e) =>
                                    setSelectedBike({
                                      ...selectedBike,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                              <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Model"
                                  select
                                  value={selectedBike.model}
                                  onChange={(e) =>
                                    setSelectedBike({
                                      ...selectedBike,
                                      model: e.target.value,
                                    })
                                  }
                                >
                                  {modelOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <Grid container spacing={3}>
                              <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Color"
                                  select
                                  value={selectedBike.color}
                                  onChange={(e) =>
                                    setSelectedBike({
                                      ...selectedBike,
                                      color: e.target.value,
                                    })
                                  }
                                >
                                  {colorOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                              <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="Location"
                                  select
                                  value={selectedBike.location}
                                  onChange={(e) =>
                                    setSelectedBike({
                                      ...selectedBike,
                                      location: e.target.value,
                                    })
                                  }
                                >
                                  {locationOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <Grid container spacing={3}>
                              <Grid item md={12} xs={12}>
                                <TextField
                                  value={selectedBike.rating}
                                  disabled
                                  fullWidth
                                  label="Rating"
                                  name="rating"
                                />
                              </Grid>
                              <Grid
                                item
                                md={12}
                                xs={12}
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Switch
                                  checked={selectedBike.available}
                                  onChange={(e) =>
                                    setSelectedBike({
                                      ...selectedBike,
                                      available: e.target.checked,
                                    })
                                  }
                                />
                                <Typography variant="subtitle2">
                                  Available
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          px: 2,
                          py: 1,
                        }}
                      >
                        <Button
                          onClick={handleDeleteBike}
                          color="error"
                          sx={{
                            m: 1,
                            mr: "auto",
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          sx={{ m: 1 }}
                          variant="outlined"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={handleUpdateBike}
                          sx={{ m: 1 }}
                          type="submit"
                          variant="contained"
                        >
                          Update
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={bikesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

BikeListTable.propTypes = {
  bikes: PropTypes.array.isRequired,
  bikesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
