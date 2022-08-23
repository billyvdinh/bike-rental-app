import PropTypes from "prop-types";
import NextLink from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "../logo";

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "none",
                  },
                  height: 40,
                  width: 40,
                }}
              />
            </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <NextLink href="/auth/login" passHref>
              <Link color="textSecondary" underline="none" variant="subtitle2">
                SIGN IN
              </Link>
            </NextLink>
            <NextLink href="/auth/register" passHref>
              <Button
                component="a"
                size="medium"
                sx={{ ml: 2 }}
                variant="contained"
              >
                SIGN UP
              </Button>
            </NextLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
