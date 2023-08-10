import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useGQLMutation } from '../../useRequest';
import { Container, Box, Typography, CssBaseline, Grid, TextField, Button, Paper, tableSortLabelClasses } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import { RESET_PASSWORD } from "../../Query/user.query";
import { ResetPasswordValidation } from "../../utils/validation/user.validators";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { error, mutate, data } = useGQLMutation(RESET_PASSWORD);

    //submit handler function
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputData = {
            email: formData.get("email"),
            newPassword: formData.get("newPassword"),
            otp: formData.get("otp"),
        }
        const validationError = ResetPasswordValidation(inputData);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        mutate(inputData);
    }
    //error while query
    if (error) {
        toast.error(error.message);
        console.log("Query Error", error)
    }
    //data from query/mutation
    if(data){
        if(data?.auth?.resetPassword?.error){
            toast.error(data?.auth?.resetPassword?.error.message)
        }
        if(data?.auth?.resetPassword?.userID){
            toast("Password Reset Successful")
            navigate("/login")
        }
    }
    return (
        <Container component="main" maxWidth="lg" sx={{ borderRadius: 10, marginTop: 10 }}>
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
                            backgroundImage: "url(https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg?w=826&t=st=1691581292~exp=1691581892~hmac=d569ec3231958de2960db8fd1dc784a018531f12cd38d62b4666e24151db9d78)",
                            backgroundRepeat: "no-repeat",
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
                                Reset Password
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                flexGrow={1}
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
                                    sx={{ ml: 0 }}

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="New Password"
                                    name="newPassword"
                                    sx={{ ml: 0 }}

                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="OTP"
                                    name="otp"
                                    sx={{ ml: 0 }}

                                />
                                <Typography sx={{ color: "grey" }}>
                                    *enter the OTP that has been send to you in email
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Reset Password
                                </Button>
                                <Link to="/login">
                                    Remember  Password? Login
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ResetPassword
