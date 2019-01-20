import React, { Component } from 'react';
import { connect } from 'react-redux'
import {checkUserToken} from '../../redux/actions/actions'
import {savePassword} from '../../redux/actions/actions'

class Setpassword extends Component {
	constructor(props){
	super(props)
		this.state = {
			password:'',
			conf_password:'',
			token:this.props.match.params.token,
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
		
		if (!this.showFormErrors()) {			
     		 console.log('form is invalid: do not submit');
   		 } else {			 
    	 	 console.log('form is valid: submit');
    	  	this.setState({isFormValid: 'yes' });
    	 	let userDataInfo ={
				password:this.state.password,
				confirmPassword:this.state.conf_password,
				token:this.props.match.params.token
			}
			this.props.savePassword(userDataInfo);
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
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'conf_password';
   
    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.conf_password.value) {
        this.refs.conf_password.setCustomValidity('Passwords do not match');
      } else {
        this.refs.conf_password.setCustomValidity('');
      }
    } 
    
    if(refValue===""){
    	error.textContent = refName.replace('_',' ')+ ' is a required field';
    	//this.refs[refName].validity='invalid';
    	return false;
    } 

     if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      }  else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`; 
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }

 	 error.textContent = '';
    return true;
  }
  
  
  

render() {
	// loading  paging
	console.log(this.props)
	let loading;
	let dataStatus='';
	let msg='';

	
	if(this.props.userPassword.message){
		dataStatus= this.props.userPassword.success;
		msg= this.props.userPassword.message;
		//showForm =(this.props.userPassword.success===true)?'none':'block';
		loading = 'none'
	}
	
	

return (
<div>
	<center>
	<div className="container">		
		<div className="clearfix" ></div>
		<div id="cover-spin" style={{display:loading}}></div>
			{this.props.userPassword.success === false && <div className="alert alert-danger">
			<strong>Danger! </strong> {this.props.userPassword.message }. </div> }	

			{this.props.userPassword.success === true && <div className="alert alert-success"> 
			<strong>Success! </strong> {msg}. <a href="/login">Login</a> </div> }
		<form name="form"  onSubmit={this.handleSubmit}  >
			
			<label id="passwordLabel" style={{paddingRight:'9%'}}><b>Password </b></label>&nbsp;
			<input type="password" placeholder="Enter Password" ref="password" name="password" value={this.state.password} onChange={this.handleChange}  required />
			<div className="error" id="passwordError" />
			<br/>
			<label id="conf_passwordLabel" style={{paddingRight:'4%'}} ><b>Confirm Password </b></label>&nbsp;
			<input type="password" placeholder="Enter Conf Password" ref="conf_password" name="conf_password" value={this.state.conf_password} onChange={this.handleChange} required />
			<div className="error" id="conf_passwordError" />
			<br/>	
			
		<button type="onSubmit"  >Save</button>
			
			<br/>
		</form>
	</div>
	
	</center>
</div>
)}

}
const mapStateToProps = state => {
return {
	userData: state.authUser.user,
	userPassword: state.authUser.userSetPass
}
}
export default connect(mapStateToProps, {savePassword:savePassword })(Setpassword);