
export const saveToken = (token) =>{
    localStorage.setItem("auth_token",token);
}

export const getToken = () =>{
    localStorage.getItem("auth_token")
}
