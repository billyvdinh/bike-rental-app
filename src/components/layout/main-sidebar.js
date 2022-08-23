import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Drawer, Link, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainSidebarLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handlePathChange = () => {
    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={!lgUp && open}
      PaperProps={{ sx: { width: 256 } }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant="temporary"
    >
      <Box sx={{ p: 2 }}>
        <NextLink href="/auth/login" passHref>
          <MainSidebarLink
            color="textSecondary"
            underline="none"
            variant="subtitle2"
          >
            SIGN IN
          </MainSidebarLink>
        </NextLink>
        <NextLink href="/auth/register" passHref>
          <Button component="a" fullWidth sx={{ mt: 1.5 }} variant="contained">
            SIGN UP
          </Button>
        </NextLink>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
