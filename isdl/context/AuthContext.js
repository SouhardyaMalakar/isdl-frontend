import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'


const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({children}) =>{
    
    const [authToken,setAuthToken] = useState(null)
    const [user,setUser] = useState(null)
    const [date,setDate] = useState(new Date())
    const router = useRouter ();
    useEffect(() => {
        if(localStorage && localStorage.getItem('authTokens')){
            setAuthToken(JSON.parse(localStorage.getItem('authTokens')))
            setUser(jwt_decode(localStorage.getItem('authTokens')))
        }
      }, []);

    let User = null;
    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("https://isdllab.herokuapp.com/login", {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200 ){
            setUser(jwt_decode(data.jwt))
            setAuthToken(data.jwt)
            localStorage.setItem('authTokens', JSON.stringify(data.jwt))
            router.push('/dashboard')
         }else{
            alert("Something went wrong !")
        }
    }
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authTokens')
        router.push("/")
    }
    const updateDate = (e) => {
        setDate(e)
    }
    let contextData ={
        loginUser:loginUser,
        User:user,
        logout:logout,
        Jwt:authToken,  
        updateDate:updateDate,   
        date:date
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}