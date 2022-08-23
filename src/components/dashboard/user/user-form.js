import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { roleOptions } from "../../../utils/user/constants";

export const UserForm = (props) => {
  const { user, handleSubmit, handleDelete } = props;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role || "user",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      role: Yup.string().max(255).required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await handleSubmit(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("User updated!");
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
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title="Edit user" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
          <TextField
            error={Boolean(formik.touched.role && formik.errors.role)}
            fullWidth
            label="Role"
            name="role"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            sx={{ mt: 2 }}
            value={formik.values.role}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          {user && (
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

          <NextLink href="/dashboard/users" passHref>
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
            {user ? "Update" : "Create"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
