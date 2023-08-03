import React from "react";
import { Button, Container, Typography, Grid, Checkbox, Paper, Box, TextField, CssBaseline, FormControlLabel, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useGQLQuery,useGQLMutation } from "../../useRequest";
import { GET_ALL_USERS } from "../../Query/queries";
import { useToast } from "use-toast-mui";
import {LOGIN_USER} from "../../Query/user.query.js"

const Login = React.memo(() => {
  const toast = useToast();
  const {mutate} = useGQLMutation(LOGIN_USER);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    //todo := validate form data
    const inputData = {
      email:"bishalregmi@kcc.edu.np",
      password:"hello123"
    }
    mutate(inputData)
  };
  
  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{ borderRadius: 10, marginTop: 10 }}>
        <Box
          sx={{
            marginTop: 0,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
              sx={{
                borderBottomRightRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h3" sx={{ marginTop: 1, marginBottom: 5 }}>
                  LogiCloud
                </Typography>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="#">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signup">
                        <Typography variant="body2" >
                          {"Don't have an account? Sign Up"}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
});

export default Login


