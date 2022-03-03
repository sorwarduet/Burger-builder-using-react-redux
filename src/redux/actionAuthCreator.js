import axios from "axios";
import * as actionTypes from './actionTypes';


export const authSuccess=(token, userId)=>{
  return{

      type: actionTypes.AUTHT_SUCCESS,
      payload: {
        token: token,
        userId: userId
      }
  }

}

export const authLoading = isLoading => {
  return {
    type: actionTypes.AUTHT_LOADING,
    payload: isLoading
  }
}


export const authFail = errorMessage => {
  return {
    type: actionTypes.AUTHT_FAIL,
    payload: errorMessage
  }
}


export const auth = (email, password, mode) => (dispatch) => {
  dispatch(authLoading(true));
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let authUrl = null;

  if (mode === "Sign Up") {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  const API_KEY = "AIzaSyDA6S9lRyMpVSWIJuIl_Eciwa7LRuIMo5M";

  axios.post(authUrl + API_KEY, authData).then((res) =>{
    if(res.status===200){
      dispatch(authLoading(false));
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);

      const expirationTime = new Date(new Date().getTime()+ res.data.expiresIn* 1000);

      localStorage.setItem('expirationTime', expirationTime);

     dispatch(authSuccess(res.data.idToken, res.data.localId))
    }
  })
  .catch(err=>{
    dispatch(authLoading(false));
    dispatch(authFail(err.response.data.error.message))
  })
};

export const logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationTime');

  return{
    type: actionTypes.AUTHT_LOGOUT
  }
}


export const authCheck =()=> dispatch =>{
  const token = localStorage.getItem('token');

  if (token===null){
    dispatch(logout())
  }else{
    const expirationTime = localStorage.getItem('expirationTime')

    if(expirationTime<=new Date()){
      //logout
      dispatch(logout())
    }else{
      const userId=localStorage.getItem('userId');

      dispatch(authSuccess(token, userId))
    }
  }
}




