
export const saveToken = (token) =>{
    localStorage.setItem("auth_token",token);
}

export const getToken = () =>{
    return localStorage.getItem("auth_token")
}

export const removeToken =() =>{
    localStorage.removeItem("auth_token")
    return
}
