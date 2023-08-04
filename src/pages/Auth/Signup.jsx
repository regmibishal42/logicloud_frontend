import { Button, Container, Typography, Grid, Box, TextField, CssBaseline, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../../utils/token";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_USER } from "../../Query/user.query";
import { useGQLMutation } from "../../useRequest";
import { CreateUserValidation } from "../../utils/validation/user.validators";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error, data } = useGQLMutation(CREATE_USER);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputData = {
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName")
    }
    const validationError = CreateUserValidation(inputData);
    console.log("VAlidation",validationError)
    if (validationError){
      toast(validationError)
      return
    }
    
    console.log(inputData);
   mutate(inputData);
  };
  if (error != null) {
    toast.error("Network Error Occurred", error.message);
    console.log("Error From Query", error)
  }
  if (data) {
    console.log("Create User Data",data);
  }
  useEffect(() => {
    const token = getToken();
    if (token != null) {
      navigate("/login")
    }
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                  Sign Up
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
                    name="firstName"
                    label="FirstName"
                    type="text"
                    id="firstName"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="LastName"
                    type="text"
                    id="lastName"
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="#">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/login">
                        {"Already have an account? Sign In"}
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
}

export default SignUp;



