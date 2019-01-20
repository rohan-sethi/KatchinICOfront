/** */
import axios from 'axios'

const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5001/api/"
//const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://172.104.173.247:5001/api/"
 var users = JSON.parse(localStorage.getItem('Auth'));
const  userToken =(users)?users[0].token:'';
export function doLogin (username,password) {
    return (dispatch) => {
        console.log('adding us..')
        var user_login ={email:username,password:password};

        axios.post(`${url}user/authenticateCredential`,user_login, {headers: { 'Authorization': 'Bearer ' +userToken } }).then((res)=>{
            let user = res.data
            let users = []
            console.log('==================signin=======')
            console.log(user)
            console.log('==================signin=======')


         if(user.success === true){

			console.log('==================next Day=======')
			users[0]=user;
            //localStorage.setItem('Auth', JSON.stringify(users))
			dispatch({type: 'SET_USER', user})
            //window.location = '/';
			  
          let planId =window.sessionStorage.getItem("setPlanId");

            if(planId){
             //window.location = '/plan/'+planId;
            }else{
            // window.location = '/';
            }       


         }else{

            dispatch({type: 'LOGIN_USER', user})
            //window.location = '/login'            
         }       
           

        }).catch((err)=>

			console.log(err))
            //window.location = '/login'


       
    }
}


export function userAuthenticated () {
    return (dispatch) => {
        console.log('adding us..')
        axios.get(`${url}user/valid`,{headers: { 'Authorization': 'Bearer ' +userToken } }).then((res)=>{
            let user = res.data
            console.log('==================RegisterUser=======')
            console.log(user)
            console.log('==================signin=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'VALIDATE_USER', user})
        }).catch(error =>{
                dispatch({type: 'VALIDATE_USER', error:'true'})
             });
		
		
		
    }
}
export function RegisterUser (user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user/signup`,user_data).then((res)=>{
            let user = res.data
            console.log('==================RegisterUser=======')
            console.log(user)
            console.log('==================signin=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'REG_USER', user})
        }).catch((err)=>console.log(err))
    }
}

export function twoFactorDisable (username,password) {
    return (dispatch) => {
		
        var user_login ={email:username,password:password};
        axios.post(`${url}user/authenticateCredential`,user_login, {headers: { 'Authorization': 'Bearer ' +userToken } }).then((res)=>{
            let user = res.data
            let users = []
            console.log('==================twoFactorDisable=======')
            console.log(user)			
			dispatch({type: 'SET_USER', user})
        }).catch((err)=>
			console.log(err))       
    }
}


export function twoFactorKeyVerify (username,password) {
    return (dispatch) => {
		
        var user_login ={email:username,password:password};
        axios.post(`${url}user/requestDisableTwoFa`,user_login, {headers: { 'Authorization': 'Bearer ' +userToken } }).then((res)=>{
            let user = res.data
            let users = []
            console.log('==================twoFactorDisable=======')
            console.log(user)
				dispatch({type: 'VARIFY_TWO_FA', user})
				//window.location = '/';

        }).catch((err)=>
			console.log(err))       
    }
}



export function twoFactorDisbale (userData) {
    return (dispatch) => {
		
        //var user_login ={email:username,password:password};
        axios.post(`${url}user/disableTwoFa`,userData, {headers: { 'Authorization': 'Bearer ' +userToken } }).then((res)=>{
            let user = res.data
            let users = []
            console.log('==================twoFactorDisbale=======')
            console.log(user)
				dispatch({type: 'DISABLE_TWO_FA', user})
				//window.location = '/';

        }).catch((err)=>
			console.log(err))       
    }
}



export function requestEnableTwoFa(user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user/requestEnableTwoFa`,user_data).then((res)=>{
            let requestData = res.data
            console.log('==================requestEnableTwoFa=======')
            console.log(requestData)
            console.log('==================requestEnableTwoFa=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'ENABLE_TWOFA_USER', requestData})
        }).catch((err)=>console.log(err))
    }
}

export function setEnableTwoFa(user_data) {
    return (dispatch) => {
        console.log('enableTwoFa us..')
        axios.put(`${url}user/enableTwoFa`,user_data).then((res)=>{
            let requestData = res.data
            console.log('==================EnableTwoFa=======')
            console.log(requestData)
            console.log('==================EnableTwoFa=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_ENABLE_TWOFA', requestData})
        }).catch((err)=>console.log(err))
    }
}



export function forgotPasswordUser (user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user/forgotPasswordUser`,user_data).then((res)=>{
            let user = res.data
            console.log('==================forgotPasswordUser=======')
            console.log(user)
            console.log('==================signin=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'FORGOT_USER', user})
        }).catch((err)=>console.log(err))
    }
}

export function checkUser (user_check) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user/checkemail`,user_check).then((res)=>{
            let user = res.data
            console.log('==================getUser=======')
            console.log(user)
            console.log('==================signin=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'CHECK_USER', user})
        }).catch((err)=>console.log(err))
    }
}


export function savePassword (user_check) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user/setPasswordUser`,user_check).then((res)=>{
            let user = res.data
            console.log('==================getUser=======')
           // console.log(user)
            console.log('==================signin=======')
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER_PASSWORD', user})
        }).catch((err)=>console.log(err))
    }
}



export function validateUserOtp (user_check) {
    return (dispatch) => {
        console.log('validateUserOtp us..')
        axios.post(`${url}user/authenticateUser`,user_check).then((res)=>{
            let user = res.data
            console.log('==================getUser=======')
            console.log(user)
            console.log('==================signin=======')
			
			
			if(user.token){
				console.log('==================next Day=======')				
				var setUser =user.userData;
				var dataSetUser=[];
				dataSetUser[0]={token:user.token,email:setUser.email,twoFactor:setUser.twoFactor,_id:setUser._id}
				localStorage.setItem('Auth', JSON.stringify(dataSetUser))				
				window.location = '/';
			 }
						
           // localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'VALIDATE_USER_OTP', user})
        }).catch((err)=>console.log(err))
    }
}


export function loadPlans () {
       console.log(`plans++`)
    return (dispatch) => {
        axios.get(`${url}plan`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res) => {
         let plans = res.data
        dispatch({type:'LOAD_PLANS', plans})
            
        }).catch((err) => {
            console.log(err)
        })
    }
}


export function getPlan(plan_id) {
    return (dispatch) => {

        var getDataSession = window.sessionStorage.getItem("user_data_array");
        var getDataSessionJson = JSON.parse(getDataSession);
        
       // axios.post(`${url}plan/${plan_id}`,getDataSessionJson, {headers: { 'Authorization': 'Bearer ' +userToken }})
        axios.post(`${url}plan/${plan_id}`,getDataSessionJson, {headers: { 'Authorization': 'Bearer ' +userToken }})
        .then((res) => {
            let plan =  res.data
            dispatch({type: 'VIEW_PLAN', plan})
        }).catch((err) => console.log(err))
    }
}

export function loadArticles () {

       console.log(`articles++`)
    return (dispatch) => {
        axios.get(`${url}articles`)
        .then((res) => {
            let articles = res.data
            dispatch({type:'LOAD_ARTICLES', articles})
        }).catch((err) => {
            console.log(err)
        })
    }
}
export function getUser (_id) {
    return axios.get(`${url}user/${_id}`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
        return res.data
    }).catch(err=>console.log(err))
}

export function getUserProfile (_id) {
    return (dispatch) => {
        axios.get(`${url}user/profile/${_id}`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let profile = res.data
            dispatch({type: 'SET_PROFILE', profile})
        }).catch(err=>console.log(err))
    }
}

export function getUserOrders(pageNo,_id) {
    return (dispatch) => {
        axios.post(`${url}user/orders`,{pageNo,_id}, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let orders = res.data
			//console.log(orders)
            dispatch({type: 'SET_USER_ORDERS', orders})
        }).catch(err=>console.log(err))
    }
}


export function getOrderDetails(_id) {
    return (dispatch) => {
        axios.get(`${url}transaction_details/`+_id, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let transactionDetails = res.data
			//console.log(transactionDetails)
            dispatch({type: 'GET_ORDERS_DETAILS', transactionDetails})
        }).catch(err=>console.log(err))
    }
}

export function getArticle (article_id) {
    return (dispatch) => {
        axios.get(`${url}article/${article_id}`)
        .then((res) => {
            let article = res.data
            dispatch({type: 'VIEW_ARTICLE', article})
        }).catch((err) => console.log(err))
    }
}
// article_id, author_id, comment
export function comment () {
    return (dispatch) => {

    }
}
//req.body.article_id
export function clap (article_id) {
    return (dispatch) => {
        console.log('clapping...')
        axios.post(`${url}article/clap`,{ article_id }).then((res) => {
            dispatch({type:'CLAP_ARTICLE'})
        }).catch((err)=>console.log(err))
    }
}
//id, user_id
export function follow (id, user_id) {
    console.log(`${id} following ${user_id}`)
    return (dispatch) => {
        axios.post(`${url}user/follow`,{ id, user_id }).then((res) => {
            dispatch({type:'FOLLOW_USER', user_id})
        }).catch((err)=>console.log(err))        
    }
}

export function SignInUser (user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user`,user_data).then((res)=>{
            let user = res.data
            console.log('==================signin=======')
            console.log(user)
            console.log('==================signin=======')
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER', user})
        }).catch((err)=>console.log(err))
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
    }    
}

export function orderAdd() {
    return (dispatch) => {
        console.log('order Load us..')
        axios.get(`${url}conversion`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let order = res.data
            console.log('==================conversion=======')
           // console.log(order)
            console.log('==================conversion=======')
            localStorage.setItem('orderData', JSON.stringify(order))
            dispatch({type: 'CREATE_ORDERS', order})
        }).catch((err)=>console.log(err))
    }
}

export function orderTransaction(order_transaction) {
    return (dispatch) => {
       // console.log('order transaction us..')
       
        // console.log(order_transaction)
        axios.post(`${url}transaction`,order_transaction, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let transaction = res.data
            console.log('==================transaction=======')
           // console.log(order)
            console.log('==================transaction=======')
           // localStorage.setItem('orderData', JSON.stringify(order))
            //console.log(transaction.amount)
            dispatch({type: 'ORDER_TRANSACTION', transaction})
        }).catch((err)=>console.log(err))
    }
}


export function transactionStatus(tranId) {
    return (dispatch) => {
       // console.log('order transaction us..')
       
         console.log('order_transaction call')
        axios.get(`${url}transaction_status/${tranId}`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res)=>{
            let transactionStatus = res.data
            console.log('==================transaction=======')
           // console.log(order)
            console.log('==================transaction=======')
           // localStorage.setItem('orderData', JSON.stringify(order))
            //console.log(transactionStatus)
            dispatch({type: 'ORDER_TRANSACTION_STATUS', transactionStatus})
        }).catch((err)=>console.log(err))
    }
}