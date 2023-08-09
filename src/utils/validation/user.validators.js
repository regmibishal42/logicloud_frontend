
export const CreateUserValidation = (inputData) =>{
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const nameValidator = /^[a-z ,.'-]+$/i
    const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (inputData.email == "" || inputData.firstName =="" || inputData.password == "" || inputData.lastName == ""){
        return "Please Fill All The Fields"
    }
    if(!emailValidator.test(inputData.email)){
        return "Enter a valid email"
    }
    if (!nameValidator.test(inputData.firstName)){
        return "Enter a valid firstName"
    }
    if (!nameValidator.test(inputData.lastName)){
        return "Enter a valid firstName"
    }
    if (inputData.password.length < 8){
        return "password should be at-least 8 char long"
    }
    if (!passwordValidator.test(inputData.password)){
        return "Password Must Contain a number and special character"
    }
    return
}

export const LoginValidation = (loginData) =>{
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (loginData.email == "" || loginData.password == ""){
        return "Please Fill All The Fields"
    }
    if(!emailValidator.test(loginData.email)){
        return "Enter a valid email"
    }
    if (loginData.password.length < 8){
        return "password should be at-least 8 char long"
    }
    return

}

export const ForgetPasswordValidation = (forgetPasswordData) =>{
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (forgetPasswordData.email == "") {
        return "Please Enter Your Email"
    }
    if(!emailValidator.test(forgetPasswordData.email)){
        return "Enter a valid email"
    }
    return
}

export const ResetPasswordValidation = (resetPasswordData) =>{
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (resetPasswordData.email == ""|| resetPasswordData.otp =="" || resetPasswordData.newPassword == "") {
        return "Please Fill All the Fields"
    }
    if(!emailValidator.test(resetPasswordData.email)){
        return "Enter a valid email"
    }
    if (resetPasswordData.otp.length != 6 ){
        return "Enter a valid otp"
    }
    if (resetPasswordData.newPassword.length < 8){
        return "password should be at-least 8 char long"
    }
    if (!passwordValidator.test(resetPasswordData.newPassword)){
        return "Password Must Contain a number and special character"
    }
    return
}
