import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { UserForm } from "../../../components/dashboard/user/user-form";

import { useDispatch, useSelector } from "../../../store/store";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../store/slices/users";
import { generatePassword } from "../../../utils/password";

const UserEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { users } = useSelector((state) => state.users);
  const { id } = router.query;

  useEffect(
    () => {
      const selectedUser = users.find((user) => user.id === id);
      if (selectedUser) setUser(selectedUser);
      else if (id === "new") setUser(null);
      else dispatch(getUsers());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) setUser(selectedUser);
  }, [users, id]);

  const handleDelete = async (id) => {
    dispatch(deleteUser(id));
    router.push("/dashboard/users");
  };

  const handleSubmit = (values) => {
    if (values.id) {
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
      };
      dispatch(updateUser(id, payload));
    } else {
      const payload = {
        name: values.name,
        email: values.email,
        password: generatePassword(10),
        role: values.role,
      };
      dispatch(createUser(payload));
    }
    router.push("/dashboard/users");
  };

  return (
    <>
      <Head>
        <title>Dashboard: {id === "new" ? "Create" : "Edit"} User</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/users" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Users</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          ></Box>
          <Box mt={3}>
            <UserForm
              user={user}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserEdit;
