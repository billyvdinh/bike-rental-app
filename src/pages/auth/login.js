import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { GuestGuard } from "../../components/auth/guest-guard";
import { FirebaseLogin } from "../../components/auth/firebase-login";
import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";

const Login = () => {
  const router = useRouter();
  const { platform } = useAuth();
  const { disableGuard } = router.query;

  return (
    <>
      <Head>
        <title>Login</title>
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
              <Typography variant="h4">Log in</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <FirebaseLogin />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard
                    ? `/auth/register?disableGuard=${disableGuard}`
                    : "/auth/register"
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  Create new account
                </Link>
              </NextLink>
            </div>
            {platform === "Amplify" && (
              <Box sx={{ mt: 1 }}>
                <NextLink
                  href={
                    disableGuard
                      ? `/auth/password-recovery?disableGuard=${disableGuard}`
                      : "/auth/password-recovery"
                  }
                  passHref
                >
                  <Link color="textSecondary" variant="body2">
                    Forgot password
                  </Link>
                </NextLink>
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
