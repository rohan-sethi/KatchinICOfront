import React, { Component } from 'react';

// start update from here
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import PlanDetails from './components/PlanDetails'
import PaymentType from './components/PaymentType'
import CoinToSwap from './components/CoinToSwap'
import Login from './components/user/Login'
import Register from './components/user/Register'
import LockConversion from './components/LockConversion'
import Transaction from './components/Transaction'
import TransactionStatus from './components/TransactionStatus'
import Tutorials from './components/Tutorials'
import Logout from './components/user/Logout'
import Header from './components/common/Header'
import UserHeader from './components/common/UserHeader'
import Profile from './components/user/Profile'
import Setpassword from './components/user/Setpassword'
import Forgot from './components/user/Forgot'
import Qrcode from './components/user/Qrcode'
import Security_code from './components/user/Security_code'
import TwoFaDisable from './components/user/TwoFaDisable'
import authentication from './components/Authentication'

class App extends Component {
	
	constructor(props){
		super(props)	
		
	}	
	render() {	
		
		var AddHeader='';
		var currentUrl = this.props.location.pathname.replace('/','');
		var userUrlArr=['profile','whitepaper','video']
       if(userUrlArr.indexOf(currentUrl) ==-1 ){
		   AddHeader=Header;		   
	   }else{
		   AddHeader=UserHeader;
	   }	
	

		return (
			<div className="video_background">
				<div className="container white_bg_video">
					<AddHeader/>		
					<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/set_password/:token" component={Setpassword} /> 
					<Route exact path="/profile" component={authentication(Profile)} />
					<Route exact path="/qrcode" component={authentication(Qrcode)} />
					<Route exact path="/security_code" component={Security_code} />
					<Route exact path="/twofadisable" component={TwoFaDisable} />
					<Route exact path="/" component={Home} />
					<Route exact path="/plan/:id" component={authentication(PlanDetails)} />
					<Route exact path="/payment/:id" component={authentication(PaymentType)} />
					<Route exact path="/coin_to_swap/:id" component={authentication(CoinToSwap)} />
					<Route exact path="/lock_conversion/:id" component={authentication(LockConversion)} />      
					<Route exact path="/transaction/:id" component={authentication(Transaction)} /> 
					<Route exact path="/transaction_status/:id" component={authentication(TransactionStatus)} /> 	
					<Route exact path="/tutorials/:id" component={authentication(Tutorials)} /> 
					<Route exact path="/forgot" component={Forgot} /> 
					</Switch>
				</div>
			</div>
		);
	
		}
    }
    export default App;