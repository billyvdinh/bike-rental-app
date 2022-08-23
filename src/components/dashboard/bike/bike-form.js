import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  models as modelOptions,
  colors as colorOptions,
  locations as locationOptions,
} from "../../../utils/bike/constants";

export const BikeForm = (props) => {
  const { bike, handleSubmit, handleDelete, ...other } = props;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id: bike?.id,
      name: bike?.name ?? "",
      model: bike?.model ?? "",
      color: bike?.color ?? "",
      location: bike?.location ?? "",
      available: bike?.name ?? false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      model: Yup.string().max(255).required(),
      color: Yup.string().max(5000).required(),
      location: Yup.string().max(255).required(),
      available: Yup.boolean().required(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        handleSubmit(values);
        toast.success("Bike created!");
        router.push("/dashboard/bikes").catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Bike details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Bike Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />

              <TextField
                error={Boolean(formik.touched.model && formik.errors.model)}
                fullWidth
                label="Model"
                name="model"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 2 }}
                value={formik.values.model}
              >
                {modelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={Boolean(formik.touched.color && formik.errors.color)}
                fullWidth
                label="Color"
                name="color"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 2 }}
                value={formik.values.color}
              >
                {colorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={Boolean(
                  formik.touched.location && formik.errors.location
                )}
                fullWidth
                label="Location"
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                sx={{ mt: 2 }}
                value={formik.values.location}
              >
                {locationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      error={Boolean(
                        formik.touched.available && formik.errors.available
                      )}
                      name="available"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.available}
                    />
                  }
                  label="Available"
                />
              </Box>
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
          {bike && (
            <Button
              color="error"
              sx={{
                m: 1,
                mr: "auto",
              }}
              disabled={formik.isSubmitting}
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          )}

          <NextLink href="/dashboard/bikes" passHref>
            <Button
              component="a"
              disabled={formik.isSubmitting}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            {bike ? "Update" : "Create"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
