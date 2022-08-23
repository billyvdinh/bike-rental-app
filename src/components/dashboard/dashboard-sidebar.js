import { useEffect, useMemo } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Home as HomeIcon } from "../icons/dashboard/home";
import { UserCircle as UserCircleIcon } from "../icons/dashboard/user-circle";
import { Logo } from "../logo";
import Scrollbar from "../common/scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { useAuth } from "../../hooks/use-auth";

const getSections = () => [
  {
    title: "General",
    items: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
        roles: ["manager", "user"],
      },

      {
        title: "Bikes",
        path: "/dashboard/bikes",
        icon: <UserCircleIcon fontSize="small" />,
        roles: ["manager", "user"],
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <UserCircleIcon fontSize="small" />,
        roles: ["manager"],
      },
      {
        title: "Reservations",
        path: "/dashboard/reservations",
        icon: <UserCircleIcon fontSize="small" />,
        roles: ["manager", "user"],
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { user, logout } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const sections = useMemo(() => getSections(), []);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleLogout = async () => {
    router.push("/").catch(console.error);
    await logout();
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    {user?.name}
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    Role: {user?.role}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Button
              color="secondary"
              component="a"
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Scrollbar>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
