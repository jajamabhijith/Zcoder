import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (user) => {
    setError(null);
    try {
      const response = await fetch('/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};//gets an object having user data
      console.log(response);
      console.log(text);
        console.log(result);
      // console.log(response.ok);
      if (result.status!=="Failed") {
        localStorage.setItem("user", JSON.stringify(result)); //store the user data in local storage so that it detects user login even after closing the window
        dispatch({ type: 'signup', payload: result });
        return true;
      } else {
        alert(result.message);
        return false;
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
      return false;
    }
  };

  return { signup, error };
};
