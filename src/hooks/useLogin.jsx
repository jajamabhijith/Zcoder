import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const {dispatch,user} = useAuthContext()
  const login = async (user) => {
    setError(null)
    const response = await fetch('/user/signin',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })
    const text = await response.text(); //gets plain text
    const userResponse = text ? JSON.parse(text) : {}; //if text is not empty it changes to object

    if(userResponse.status!="Failed"){
      //save user to local storage
      localStorage.setItem("user",JSON.stringify(userResponse))
      console.log(userResponse)
      //update auth context
      dispatch({type:'login',payload:userResponse})
      navigate("/",{replace:true}); // replace: true make sures that we will not go back to login page after we logged in
    }else{
      alert(`${userResponse.message}`)
    }
  }
  return { login,error}

}