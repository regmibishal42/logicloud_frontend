
export const GetHeader = (token) =>{
    return {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }
}