const initState = {
    authErrorOrg: null
  }

const authReducerOrg = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR_ORG':
        console.log('login error');
        return {
          ...state,
          authErrorOrg: 'Login failed'
        }
  
      case 'LOGIN_SUCCESS_ORG':
        console.log('login success');
        return {
          ...state,
          authErrorOrg: null
        }
  
      case 'SIGNOUT_SUCCESS_ORG':
        console.log('signout success');
        return state;
  
      case 'SIGNUP_SUCCESS_ORG':
        console.log('signup success org')
       
        return {
          ...state,
          authErrorOrg: null
        }
  
      case 'SIGNUP_ERROR_ORG':
        console.log('signup error org')
        return {
          ...state,
          authError: action.err.message
        }
  
      default:
        return state
    }
  };
  
  export default authReducerOrg;