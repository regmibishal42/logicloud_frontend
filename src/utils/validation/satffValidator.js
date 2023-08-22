// {
//     contactNumber:"",
//     email:"",
//     firstName:"",
//     lastName:"",
//     post:"",
//     joinedOn:"",
//     isAuthorized:false,
// }

export const CreateStaffValidator = (staffData) =>{
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (staffData.firstName.length < 3){
        return "firstName should be at-least 3 char long"
    }
    if (staffData.lastName.length < 3){
        return "lastName should be at-least 3 char long"
    }
    if (staffData.post.length < 3){
        return "post should be at-least 3 char long"
    }
    if(!emailValidator.test(staffData.email)){
        return "enter a valid email"
    }
    if(staffData.salary < 1){
        return "salary must be greater then 0"
    }
    return null
}