import React, { Component } from 'react';
import { connect } from 'react-redux'
import {doLogin,validateUserOtp} from '../../redux/actions/actions'

class Login extends Component {

constructor(props){

	super(props)
	this.state = {
			otp:'',
			username:'',
			password:'',
		    submitted: false,
			msgOtp:'',			
			sendOtp:'',			
			resendOtp:'',			
			otpStatus:''			
		}

	this.handleSubmit = this.handleSubmit.bind(this);	
	this.handleSubmitOtp = this.handleSubmitOtp.bind(this);	
	this.reSendOtoClick = this.reSendOtoClick.bind(this);	
	 this.handleChange = this.handleChange.bind(this);	
}

 	handleChange(e) {
	 e.target.classList.add('active');
	 const { name, value } = e.target;
	 this.setState({ [name]: value });
	 this.showInputError(e.target.name);
	}

    handleSubmit(e) {

		e.preventDefault();
		if (!this.showFormErrors()) {
     		 console.log('form is invalid: do not submit');
   		 } else {
    	 	 console.log('form is valid: submit');
    	  	this.setState({isFormValid: 'yes' });
    	 	// this.setState({ submitted: true });
	        const { username, password } = this.state;      
	        if (username && password) {
	            //dispatch(userActions.login(username, password));
				this.props.doLogin(username,password)
				window.sessionStorage.getItem("Auth");
				this.setState({msgOtp:'We have send OTP to your Email or Google Auth'})	
				this.setState({sendOtp:'yes'})	
				this.setState({resendOtp:'no'})	
				this.setState({otpStatus:'no'})
	        }
   		 }
            
	}
	
	
	handleSubmitOtp(e) {
		e.preventDefault();		
	        const { username, password ,otp} = this.state;
			console.log(username+'- '+  password +'- '+ otp  ); 
	        if (username && password && otp) {
	            //dispatch(userActions.login(username, password));
				var dataRes={email:username,password:password,otp:otp}
				this.props.validateUserOtp(dataRes)
				this.setState({sendOtp:'no'})	
				this.setState({resendOtp:'no'})	
				this.setState({otpStatus:'yes'})	
				//window.sessionStorage.getItem("Auth");			
	        }
   		
	}

	reSendOtoClick(e){
		e.preventDefault();		
	        const { username, password } = this.state;
			console.log(username+'- '+  password  ); 
	        if (username && password ) {
				
				//dispatch(userActions.login(username, password));				
				this.props.doLogin(username,password)				
				//window.sessionStorage.getItem("Auth");
				this.setState({msgOtp:'We have Re-send OTP to your email'})	
				this.setState({sendOtp:'no'})	
				this.setState({resendOtp:'yes'})	
				this.setState({otpStatus:'no'})
	        }
		
	}
	
	componentDidUpdate(prevProps){
		console.log(this.props);
		if (this.props.userLogin === 'FAILED' ) {
			console.log('dialog is hidden');
			
			//this.setState({status:'yes'});
			
		}
	}

showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {

      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name,input.value);
      
      if (!isInputValid) {
        isFormValid = false;        
      }
    });
    
    return isFormValid;
  }


 showInputError(refName,refValue) {
	if(refName=='otp'){
		return true;
	}
 
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
  
    if(refValue==""){
    	error.textContent = refName.replace('_',' ')+ ' is a required field';
    	return false;
    } 

 	 error.textContent = '';
    return true;
  }

render() {
	
		let showForm='';
		let otpForm='';
		let msg='';
		let OtpMsg='';
		let showMsg='';		
		console.log(this.props)
	if(this.props.userData){		
		msg= this.props.userData.message;
		showForm =(this.props.userData.success===true)?'none':'block';
		otpForm =(this.props.userData.success===true)?'block':'none';
		showMsg =(this.props.userData.success===true)?'yes':'no';		
	}
	
	if(this.props.userOtpStatus){		
		 OtpMsg= this.props.userOtpStatus.message;	
		 showMsg =(this.props.userOtpStatus.success===false)?'no':'yes';	 
	}
 
 
return (
<div>	
 <center>
	  
	  <div className="container">
		  <form name="form"  onSubmit={this.handleSubmit} style={{display:showForm}} >
			{this.props.userData.success === false && <div className="alert alert-danger" style={{clear:'both'}}>
			<strong>Danger! </strong> {this.props.userData.message }. </div> }	

			{this.props.userData.success === true && <div className="alert alert-success" style={{clear:'both'}}> 
			<strong>Success! </strong> {msg}. </div> }
			<label id="usernameLabel" ><b>Email </b></label>&nbsp;
			<input type="text" ref="username" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} required  />
			<div className="error" id="usernameError" />
			<br/>
			<label id="passwordLabel" ><b>Password </b></label>&nbsp;
			<input type="password" ref="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} required />
			<div className="error" id="passwordError" />
			 <br/>   
			<button type="onSubmit" className="save btn"   >Login</button>
			<a href="/register" className="save btn" style={{textdecoration:'none',color:'#000'}} >Sign Up</a>
			<a href="/forgot" className="save btn" style={{textdecoration:'none',color:'#000'}} >Forgot</a>
			<a href="/twofadisable" className="save btn" style={{textdecoration:'none',color:'#000'}} >Disable 2FA</a>
			<br/>
		</form>	
		
	 <form name="formOtp"  onSubmit={this.handleSubmitOtp} style={{display:otpForm}} >
	 
		{/* send otp message   */}
		{this.state.sendOtp === 'yes' && this.props.userData.success ===false && <div className="alert alert-danger" style={{clear:'both'}} >
		<strong>Danger! </strong> {this.props.userData.message }. </div> }	
		
		{this.state.sendOtp === 'yes' && this.props.userData.success=== true && <div className="alert alert-success" style={{clear:'both'}}> 
			<strong>Success! </strong> {this.state.msgOtp}. </div> }
			
		{/* resend otp message   */}	
		{this.state.resendOtp === 'yes' && this.props.userData.success ===false && <div className="alert alert-danger" style={{clear:'both'}} >
		<strong>Danger! </strong> {this.props.userData.message }. </div> }	
		
		{this.state.resendOtp === 'yes' && this.props.userData.success=== true && <div className="alert alert-success" style={{clear:'both'}}> 
			<strong>Success! </strong> {this.state.msgOtp}. </div> }	
			
		{/* otp validate message   */}		
		{this.state.otpStatus === 'yes' && this.props.userOtpStatus.success ===false && <div className="alert alert-danger" style={{clear:'both'}} >
		<strong>Danger! </strong> {this.props.userOtpStatus.message }. </div> }	
		
		
			
		
	
	    <label id="otpLabel" ><b>OTP </b></label>&nbsp;
	    <input type="text" ref="otp" placeholder="Enter OTP" name="otp" value={this.state.otp} onChange={this.handleChange} required  />
	   	<div className="error" id="otpError" />
	 
	    <button type="onSubmit"  >OK</button>
	    <button  className="cancelbtn" onClick={this.reSendOtoClick}>Re-Send</button>
	    <br/>
	</form>	
	
	 </div>	
	</center>
</div>
)}
}

const mapStateToProps = state => {
	return {
		userLogin: state.authUser.isAuth,
		userData: state.authUser.user,
		userOtpStatus: state.authUser.userOtpStatus
	}
}

export default connect(mapStateToProps, {doLogin:doLogin , validateUserOtp:validateUserOtp })(Login);