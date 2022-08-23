import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const FirebaseRegister = (props) => {
  const isMounted = useMounted();

  const { createUserWithEmailAndPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      policy: true,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().min(7).max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await createUserWithEmailAndPassword({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div {...props}>
      <form noValidate onSubmit={formik.handleSubmit}>
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
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />

        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
            mt: 2,
          }}
        >
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
          />
          <Typography color="textSecondary" variant="body2">
            I have read the{" "}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <FormHelperText error>{formik.errors.policy}</FormHelperText>
        )}
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};
