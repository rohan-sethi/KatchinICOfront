import React, { Component } from 'react';
import { connect } from 'react-redux'
// import {checkUser} from '../../redux/actions/actions'
import {RegisterUser} from '../../redux/actions/actions'
// import $ from 'jquery'
// const localIpUrl = require('local-ip-url');
import { Link} from "react-router-dom";

class Register extends Component {
	constructor(props){
	super(props)
		this.state = {		
			email:'',
			error:null,
			status:'no',
			isFormValid:'no'
		}
		this.handleSubmit = this.handleSubmit.bind(this);
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
		
		//alert($('#g-recaptcha-response').val());
		
		if (!this.showFormErrors()) {
			
     		 console.log('form is invalid: do not submit');
   		 } else {
			 
    	 	 console.log('form is valid: submit');
    	  	this.setState({isFormValid: 'yes' });
    	 	let userDataInfo ={
				email:this.state.email
				//recaptcha:$('#g-recaptcha-response').val(),
				//ipaddress:localIpUrl()
			}
			this.props.RegisterUser(userDataInfo);
			
   		 }		
	}
	
	componentDidMount() {
		document.body.className = 'users show'
	}
	
	 componentWillUpdate(nextProps, nextState) {	
			if (nextProps.userData && this.state.email != '') {	
				if(nextProps.userData.success==true){
					this.setState({email:''})					
				}else{
					//console.log('ddd')
				}			
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

    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);   
  

    if(refName==="email"){

		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;			
		if (!filter.test(this.state.email)) {
			error.textContent = refName+ ' Email not valid.';
			return false;
		}
			
    } 
    
    if(refValue===""){
    	error.textContent = refName.replace('_',' ')+ ' is a required field';    	
    	return false;
    } 

     if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
	  }
      return false;
    }

 	 error.textContent = '';
    return true;
	
  }


render() {
	// loading  paging
	let loading;
	let dataStatus='';
	if(this.props.userData){
		dataStatus= this.props.userData.success;		
		loading = 'none'
	}else{
		loading = 'block'
	}

return (
<div>
	<center>
	<div className="container">		
		<div className="clearfix" ></div>
		<div id="cover-spin" style={{display:loading}}></div>
		<form name="form"  onSubmit={this.handleSubmit}  >
			
			{this.props.userData.success === false && <div className="alert alert-danger">
				<strong>Danger! </strong> {this.props.userData.message }. </div> }	

			{this.props.userData.success === true && <div className="alert alert-success">
				<strong>Success! </strong> Please check Mail for password. </div> }			
	
			<label  id="emailLabel"  style={{paddingRight:'11%'}} ><b>Email </b></label>&nbsp;
			<input type="text" placeholder="Enter email" ref="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}   required />
			<div className="error" id="emailError" />
			<br/>
			
			{/*<div className="g-recaptcha" data-sitekey="6LeBhm8UAAAAAILX0EidWcZknoAhkWD8W1pupmv1"></div> */}
			<br/>
			<button type="submit" className="register-btn"> Register </button>
			<button className="login-btn" >
				<Link to ="/login" className="link">Login</Link> 
			</button>
			<br/>
		</form>
	</div>
	
	</center>
</div>
)}

}
const mapStateToProps = state => {
return {
	userData: state.authUser.user
}
}
export default connect(mapStateToProps, {RegisterUser:RegisterUser })(Register);