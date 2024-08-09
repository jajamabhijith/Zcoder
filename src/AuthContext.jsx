import React, { createContext, useEffect,useReducer } from 'react';

export const AuthContext = createContext();
export const authReducer = (state,action) => {

  // define actions
  switch (action.type){
    case 'signup' :
      return{
        user: action.payload,
        isAuthenticated:false,
      }
    case 'login':
      return {
        userLogin: action.payload,
        isAuthenticated:true,
        isEdited:false,
      }
    case 'profileEdit' :
      return{
        isEdited:true,
        updatedUser:action.payload,
      }
    case 'logout':
      return {
        user:null,
        userLogin:null,
        isAuthenticated:false,
      }
    // default:
    //   return state
  }
}

//set the initial state
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userLogin:null,
    isAuthenticated: false,
  });
  
//Even after we refresh the page the page will not lose the user info
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type : 'login', payload: user})
    }
  },[])

  //when the user is logged in users data is stored in local storage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  console.log('AuthContext state', state);

  return (
    //passing data from parent to child
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
