import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { GuestGuard } from "../../components/auth/guest-guard";
import { FirebaseRegister } from "../../components/auth/firebase-register";
import { Logo } from "../../components/logo";

const Register = () => {
  const router = useRouter();
  const { disableGuard } = router.query;

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">Register</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <FirebaseRegister />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard
                    ? `/auth/login?disableGuard=${disableGuard}`
                    : "/auth/login"
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  Having an account
                </Link>
              </NextLink>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Register;
