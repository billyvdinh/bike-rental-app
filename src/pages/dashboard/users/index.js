import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { AuthGuard } from "../../../components/auth/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { UserListTable } from "../../../components/dashboard/user/user-list-table";
import { Plus as PlusIcon } from "../../../components/icons/plus";
import { Search as SearchIcon } from "../../../components/icons/search";

import { applyFilters, applyPagination } from "../../../utils/user/helpers";

import { useDispatch, useSelector } from "../../../store/store";
import { getUsers } from "../../../store/slices/users";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Users",
    value: "isUser",
  },
  {
    label: "Managers",
    value: "isManager",
  },
];

const sortOptions = [
  {
    label: "Last update (newest)",
    value: "updatedAt|desc",
  },
  {
    label: "Last update (oldest)",
    value: "updatedAt|asc",
  },
];

const UserList = () => {
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    query: "",
    isUser: undefined,
    isManager: undefined,
  });
  const dispatch = useDispatch();
  const { users, loadingUsers } = useSelector((state) => state.users);

  useEffect(
    () => {
      dispatch(getUsers());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      isUser: undefined,
      isManager: undefined,
    };

    if (value !== "all") {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredUsers = applyFilters(users, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>Dashboard: User List</title>
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
                <Typography variant="h4">Users</Typography>
              </Grid>
              <Grid item>
                <NextLink href="/dashboard/users/new" passHref>
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Box
              sx={{
                m: -1,
                mt: 3,
              }}
            ></Box>
          </Box>
          <Card>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
            <Divider />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5,
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search users"
                />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              {loadingUsers && <LinearProgress />}
            </Box>
            <UserListTable
              users={paginatedUsers}
              usersCount={filteredUsers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

UserList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default UserList;
