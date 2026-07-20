import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

const theme = createTheme();

export default function Authentication() {
  const { handleLogin, handleRegister } = React.useContext(AuthContext);

  const [formState, setFormState] = React.useState(0);

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleAuth = async () => {
    try {
      setError("");

      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const res = await handleRegister(name, username, password);

        setMessage(res);
        setOpen(true);

        setName("");
        setUsername("");
        setPassword("");

        setFormState(0);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid
        container
        sx={{
          minHeight: "100vh",
        }}
      >
        {/* LEFT SIDE - FORM */}

        <Grid
          size={{ xs: 12, sm: 5, md: 5 }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: { xs: 3, sm: 5 },
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main", mb: 2 }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h4" fontWeight="bold" mb={1}>
              {formState === 0 ? "Welcome Back" : "Create Account"}
            </Typography>

            <Typography color="text.secondary" mb={4}>
              {formState === 0
                ? "Sign in to continue"
                : "Register to get started"}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Button
                variant={formState === 0 ? "contained" : "text"}
                onClick={() => {
                  setFormState(0);
                  setError("");
                }}
                sx={{ mr: 2 }}
              >
                Sign In
              </Button>

              <Button
                variant={formState === 1 ? "contained" : "text"}
                onClick={() => {
                  setFormState(1);
                  setError("");
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 400 }}>
              {formState === 1 && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" mt={1}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* RIGHT SIDE - IMAGE */}

        <Grid
          size={{ xs: 0, sm: 7, md: 7 }}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            backgroundImage: "url('/auth-bg.avif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45))",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              textAlign: "center",
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
              >
                Welcome to ManthanMeet
              </Typography>

              <Typography variant="h6">
                Connect • Collaborate • Meet Anywhere
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}