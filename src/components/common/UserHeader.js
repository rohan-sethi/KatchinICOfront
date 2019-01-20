import React, { Component } from 'react';
import {setSession,getSession} from '../../redux/actions/functionList' 

class UserHeader extends Component {

constructor(props){

	super(props)
	this.state = {
			username:''	,
			twoFa:'yes'	
		}
	//alert(getSession('twoFactorStatus'))

}

 
render() {
 	var liSet='';
	
 	if(getSession('twoFactorStatus')){
 		liSet=<div className="col-md-8 nopl pt20"><ul className="list-inline profile"><li><a href="/">HOME</a></li><li><a href="/profile">WHITEPAPER</a></li>
			<li><a href="/profile">VIDEO</a></li><li><a href="/profile">PROFILE</a></li><li><a href="/qrcode">QRCODE</a></li><li className="last"><a href="/logout">LOGOUT</a></li></ul></div>; 
	}else{

		liSet=<div className="col-md-8 nopl pt20"><ul className="list-inline profile"><li><a href="/">HOME</a></li><li><a href="/profile">WHITEPAPER</a></li>
			<li><a href="/profile">VIDEO</a></li><li><a href="/profile">PROFILE</a></li><li className="last"><a href="/logout">LOGOUT</a></li></ul></div>; 
	}

	return (
		<div className="ContentOuterProfile ">
		
			{liSet}
			<div className="col-md-4 digicryt nopr">
			<img src="assets/images/prfoile_logo.jpg" className="img-responsive" /></div>
		</div>

	)
}

}
export default UserHeader;