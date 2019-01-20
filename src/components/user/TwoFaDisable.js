import React, { Component } from 'react';
import { connect } from 'react-redux'
import {twoFactorKeyVerify,twoFactorDisbale} from '../../redux/actions/actions'

class TwoFaDisable extends Component {

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
			otpStatus:'',			
			name_0:'',			
			name_1:'',		
			name_2:''			
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
	 console.log(name +'___'+value)
	 console.log(this.state.name_0)
	 this.showInputError(e.target.name);
	}

	handleSubmit(e) {

		e.preventDefault();
		if (!this.showFormErrors()) {
     		 console.log('form is invalid: do not submit');
   		 } else {
    	 	 console.log('form is valid: submit');
    	  	this.setState({isFormValid: 'yes' });
	        const { username, password } = this.state;      
	        if (username && password) {
				this.props.twoFactorKeyVerify(username,password)				
				this.setState({msgOtp:this.props.userData.message})	
				this.setState({sendOtp:'yes'})	
				this.setState({resendOtp:'no'})	
				this.setState({otpStatus:'no'})
	        }
   		 }
            
	}
	
	
	handleSubmitOtp(e) {
		e.preventDefault();		
	        const { name_0, name_1 ,name_2,username,password} = this.state;
			
	        if (username && password && name_0) {
				var dataRes={email:username,password:password,value:name_0+name_1+name_2}
				console.log(dataRes)
				this.props.twoFactorDisbale(dataRes)
				this.setState({sendOtp:'no'})	
				this.setState({resendOtp:'no'})	
				this.setState({otpStatus:'yes'})	
	        }
   		
	}

	reSendOtoClick(e){
		e.preventDefault();
			
	        const { username, password } = this.state;
			console.log(username+'- '+  password  ); 
	        if (username && password ) {				
				this.props.doLogin(username,password)				
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
	 
	if(refName=='name_0' || refName=='name_1' || refName=='name_2'){
		return true;
	}
 
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
	console.log(refName+'    '+refValue)
    if(refValue==""){
    	error.textContent = refName.replace('_',' ')+ ' is a required field';
    	return false;
    } 

 	 error.textContent = '';
    return true;
  }

render() {
	
		let showForm='';
		let otpForm='none';
		let msg='';
		let OtpMsg='';
		let showMsg='';		
		let keyArr=[];		
		console.log(this.props)
	if(this.props.userData.key){		
		msg= this.props.userData.message;
		showForm =(this.props.userData.success===true)?'none':'block';
		otpForm =(this.props.userData.success===true)?'block':'none';
		showMsg =(this.props.userData.success===true)?'yes':'no';		
		keyArr = this.props.userData.key;		
		
		//keyArr=["R", "T", "R"];
		
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
			<button type="onSubmit" className="save btn"   >NEXT</button>
			<a href="/forgot" className="save btn" style={{textdecoration:'none',color:'#000'}} >Forgot</a>
			<br/>
		</form>	
		
	 <form name="formToFA"  onSubmit={this.handleSubmitOtp} style={{display:otpForm}} >
	 

		
		{this.state.otpStatus === 'yes' && this.props.userOtpStatus.success=== true && <div className="alert alert-success" style={{clear:'both'}}> 
			<strong>Success! </strong> {this.props.userOtpStatus.message}. </div> }	
			
		{/* otp validate message   */}		
		{this.state.otpStatus === 'yes' && this.props.userOtpStatus.success ===false && <div className="alert alert-danger" style={{clear:'both'}} >
		<strong>Danger! </strong> {this.props.userOtpStatus.message }. </div> }	
		
					
			<div  >
			<label id={'name_0Label'} ><b>Key :{(keyArr.length > 0)?keyArr[0]:''}</b></label>&nbsp; <input type="text" ref={'name_0'} name={'name_0'} value={this.state.name_0} onChange={this.handleChange} required  maxLength="2" style={{width:'6%'}} /> 
			  	<div className="error" id={'name_0Error'} />
				
			<label id={'name_1Label'} ><b>Key :{keyArr[1]}</b></label>&nbsp; <input type="text" ref={'name_1'}  name={'name_1'} value={this.state.name_1} onChange={this.handleChange} required   maxLength="2" style={{width:'6%'}} /> 
			<div className="error" id={'name_1Error'} />

			<label id={'name_2Label'} ><b>Key :{keyArr[2]}</b></label>&nbsp; <input type="text" ref={'name_2'}  name={'name_2'} value={this.state.name_2} onChange={this.handleChange} required   maxLength="2" style={{width:'6%'}} /> 
			<div className="error" id={'name_2Error'} />	
				
			</div>
		
	
	   
	   
		
	    <button className="save btn" type="onSubmit"  >OK</button>
	    <a  className="save btn"  href='/login'  >Login</a>
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
		userData: state.authUser.verifyTwoFa,
		userOtpStatus: state.authUser.disableTwoFa
	}
}

export default connect(mapStateToProps, {twoFactorKeyVerify:twoFactorKeyVerify , twoFactorDisbale:twoFactorDisbale })(TwoFaDisable);