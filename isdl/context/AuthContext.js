import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/router'


const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({children}) =>{
    
    const [authToken,setAuthToken] = useState(null)
    const [user,setUser] = useState(null)
    const router = useRouter ();
    useEffect(() => {
        if(localStorage && localStorage.getItem('authTokens')){
            setAuthToken(JSON.parse(localStorage.getItem('authTokens')))
            setUser(jwt_decode(localStorage.getItem('authTokens')))
        }
        
      }, []);

    let User =null;
    let loginUser = async (e ) => {
        console.log('Form Submitted')
        e.preventDefault()
        let response = await fetch("https://isdllab.herokuapp.com/login", {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({'name':e.target.name.value, 'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log(response)
        if(response.status === 200 ){
            setUser(jwt_decode(data.jwt))
            console.log(user)
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
        router.push("/login")
    }
    let contextData ={
        loginUser:loginUser,
        User:user,
        logout:logout
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}