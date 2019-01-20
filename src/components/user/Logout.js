import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setSession,getSession} from '../../redux/actions/functionList' 
class Logout extends Component {

constructor(props){

	super(props)
	
		
	    window.localStorage.clear('Auth');
		setSession('twoFactorShow','no');
		setSession('twoFactorStatus','true');
		window.location = '/login';

	
}

	render() {
	 
	return (
		<div>Logout </div>
	)

	}
}

export default Logout;