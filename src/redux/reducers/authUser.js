const initialState = {
    user: {},
    isAuth: false,
    profile: {},
    orders: {},
    userSetPass: {},
    userOtpStatus: {},
    userForgotPassword: {},
    userRequestEnableTwoFa: {},
    setEnableTwoFa: {},
    verifyTwoFa: {},
    disableTwoFa: {},
    authenticated: {},
}

export default (state = initialState, action) => {
  switch (action.type) {

	case 'VALIDATE_USER':
    console.log('VALIDATE_USER user...')
    console.log(action.user)
        return {
            ...state,          
            authenticated: action.user
        }
    case 'UPDATE_USER':
    console.log('check user...')
    console.log(action.user)
    console.log(action.user.first_name)
        return {
            ...state,
            isAuth: Object.keys(action.user).length > 0 ? true : false,
            duplicateEmail: 'update',
        }
    case 'CHECK_USER':
    console.log('check user...')
    console.log(action.user)
    console.log(action.user.first_name)
        return {
            ...state,
            isAuth: Object.keys(action.user).length > 0 ? true : false,
            duplicateEmail: Object.keys(action.user).length > 0 ? 'yes' : 'no',
        }
    
    case 'SET_USER':
    console.log('setting user...')
    console.log(action.user)
    console.log(action.user.first_name)
        return {
            ...state,
            isAuth: Object.keys(action.user).length > 0 ? true : false,
            user: action.user
        }
    
    case 'LOGIN_USER':
    console.log('setting user...')
    console.log(action.user)
  
        return {
            ...state,
            isAuth: Object.keys(action.user).length > 0 ? true : 'FAILED',
            user: action.user
        }
  case 'REG_USER':
    console.log('setting user...')
    console.log(action.user)
    console.log(action.user.first_name)
        return {
            ...state,
            isAuth: Object.keys(action.user).length > 0 ? true : false,
            user: action.user
        }
    
    case 'SET_PROFILE':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        profile: action.profile
    }
	case 'SET_USER_ORDERS':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        orders: action.orders
    }
	case 'VALIDATE_USER_TOKENN':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        user: action.user
    }
	case 'SET_USER_PASSWORD':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        userSetPass: action.user
    }
	case 'VALIDATE_USER_OTP':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        userOtpStatus: action.user
    }
	case 'FORGOT_USER':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        userForgotPassword: action.user
    }
	case 'ENABLE_TWOFA_USER':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        userRequestEnableTwoFa: action.requestData
    }
	case 'SET_ENABLE_TWOFA':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        setEnableTwoFa: action.requestData
    }	
	case 'VARIFY_TWO_FA':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        verifyTwoFa: action.user
    }	
	case 'DISABLE_TWO_FA':
    return {
        ...state,
		//isAuth: Object.keys(action.user).length > 0 ? true : false,
        disableTwoFa: action.user
    }
	
    default:
      return state;
  }
}
