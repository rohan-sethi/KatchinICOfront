import React, { Component } from 'react';
import { connect } from 'react-redux'
import {checkUser} from '../../redux/actions/actions'
import {RegisterUser} from '../../redux/actions/actions'

class Register extends Component {
	constructor(props){
	super(props)
		this.state = {
			username:'',
			password:'',
			conf_password:'',
			first_name:'',					
			last_name:'',
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
		//console.log('call submit');

		if (!this.showFormErrors()) {
     		 console.log('form is invalid: do not submit');
   		 } else {
    	 	 console.log('form is valid: submit');
    	  	this.setState({isFormValid: 'yes' });
    	 	let userDataInfo ={
			email:this.state.email
			}
			this.props.checkUser(userDataInfo);
   		 }		
	}
	
	componentDidMount() {
		document.body.className = 'users show'

	}
	componentDidUpdate(prevProps){


		if (this.props.checkEmail === 'no' && this.state.status==='no' && this.state.isFormValid==='yes') {
			console.log('dialog is hidden');
			let userData ={
			username:this.state.username,
			password:this.state.password,
			first_name:this.state.first_name,
			last_name:this.state.last_name,
			email:this.state.email
			}
			this.props.RegisterUser(userData);
			//this.props.checkUser(userData);

			this.setState({status:'yes'});
			window.location = '/login/';
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
    


    if(refName==="email"){

 		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;			
			if (!filter.test(this.state.email)) {
				error.textContent = refName+ ' Email not valid.';
				return false;
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
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.patternMismatch) {
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

return (
<div>
	<center>
	<div className="container">		
		<div className="clearfix" ></div>
		<form name="form"  onSubmit={this.handleSubmit}  >
			{this.props.checkEmail === 'yes' && <div className="alert alert-danger">
				<strong>Danger! </strong> Duplicate Email.
			</div> }			
			
			<label id="first_nameLabel" style={{paddingRight:'7%'}} > <b>First Name </b> </label> &nbsp;
			<input type="text"  placeholder="Enter First Name"  ref="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChange}  required />
			<div className="error" id="first_nameError" />
			
			<br/>
			<label id="last_nameLabel"  style={{paddingRight:'7%'}} > <b>Last Name </b> </label> &nbsp;
			<input type="text" placeholder="Enter Last Name" ref="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChange}  required />
			<div className="error" id="last_nameError" />
			<br/>
			<label  id="emailLabel"  style={{paddingRight:'11%'}} ><b>Email </b></label>&nbsp;
			<input type="text" placeholder="Enter email" ref="email" name="email" value={this.state.email} onChange={this.handleChange}   required />
			<div className="error" id="emailError" />
			<br/>
			<label id="usernameLabel"  style={{paddingRight:'8%'}}><b>Username </b></label>&nbsp;
			<input type="text"  ref="username"  placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange}  required />
			<div className="error" id="usernameError" />
			<br/>
			
			<label id="passwordLabel" style={{paddingRight:'9%'}}><b>Password </b></label>&nbsp;
			<input type="password" placeholder="Enter Password" ref="password" name="password" value={this.state.password} onChange={this.handleChange}  required />
			<div className="error" id="passwordError" />
			<br/>
			<label id="conf_passwordLabel" style={{paddingRight:'4%'}} ><b>Confirm Password </b></label>&nbsp;
			<input type="password" placeholder="Enter Conf Password" ref="conf_password" name="conf_password" value={this.state.conf_password} onChange={this.handleChange} required />
			<div className="error" id="conf_passwordError" />
			<br/>
			<button type="onSubmit"  >Register</button>
			<button type="button" className="cancelbtn" >Cancel</button>
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
checkEmail: state.authUser.duplicateEmail
}
}
export default connect(mapStateToProps, {checkUser:checkUser,RegisterUser:RegisterUser })(Register);