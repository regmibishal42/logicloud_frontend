
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useGQLMutation } from '../../useRequest';
import { Container, Box, Typography, CssBaseline, Grid, TextField, Button, Paper } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import {ForgetPasswordValidation} from "../../utils/validation/user.validators";
import { FORGET_PASSWORD } from "../../Query/user.query";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const {mutate,isLoading,error,data} = useGQLMutation(FORGET_PASSWORD);

    //submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputData = {
            email:formData.get("email")
        }
        const validationError = ForgetPasswordValidation(inputData);
        if(validationError){
            toast.error(validationError);
            return
        }
        mutate(inputData);
    }
    if (error != null){
        toast.error(error.message)
        console.log("Query Error",error)
    }
    if (data != null){
        console.log("Data From Query",data)
        if (data?.auth?.forgetPassword?.error){
            toast.error(data?.auth?.forgetPassword?.error.message)
        }
        if(data?.auth?.forgetPassword?.userID){
            alert("reset OTP send to your email")
        }
    }
    return (
        <>
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
                                backgroundImage: "url(https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg)",
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
                                    Forget Password??
                                </Typography>
                                <Typography component="h6" variant="h6">
                                    Don't Worry.
                                </Typography>
                                <Typography sx={{ color: "grey" }}>
                                    Just Verify your email and receive an OTP
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
                                        sx={{ml:0}}

                                    />
                                    <Typography sx={{ color: "grey" }}>
                                        *enter your account's email address
                                    </Typography>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Receive OTP
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
        </>
    )
}

export default ForgetPassword
