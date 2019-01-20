import React, { Component } from 'react';
import { connect } from 'react-redux'
import {doLogin} from '../../redux/actions/actions'

class Login extends Component {

constructor(props){

	super(props)
	this.state = {
			username:'',
			password:'',
		    submitted: false
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
    	 	// this.setState({ submitted: true });
	        const { username, password } = this.state;      
	        if (username && password) {
	            //dispatch(userActions.login(username, password));
				this.props.doLogin(username,password)
				window.sessionStorage.getItem("Auth");			
	        }
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

    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
  
    if(refValue==""){
    	error.textContent = refName.replace('_',' ')+ ' is a required field';
    	//this.refs[refName].validity='invalid';
    	return false;
    } 

 	 error.textContent = '';
    return true;
  }

render() {
 
return (
<div>	
 <center>
	<form name="form"  onSubmit={this.handleSubmit}  >
	  
	  <div className="container">

	  	{this.props.userLogin === 'FAILED' && <div className="alert alert-danger">
				<strong>Error!  </strong> Not valid login details.
		</div> }

	    <label id="usernameLabel" ><b>Email </b></label>&nbsp;
	    <input type="text" ref="username" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} required  />
	   	<div className="error" id="usernameError" />
	    <br/>
	    <label id="passwordLabel" ><b>Password </b></label>&nbsp;
	    <input type="password" ref="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} required />
	    <div className="error" id="passwordError" />
	     <br/>   
	    <button type="onSubmit"  >Login</button>
	    <a href="/register" className="cancelbtn" style={{textdecoration:'none',color:'#000'}} >Sign Up</a>
	    <br/>
	    

	  </div>	 
	</form>	
	</center>
</div>
)}
}

const mapStateToProps = state => {
	return {
		userLogin: state.authUser.isAuth
	}
}

export default connect(mapStateToProps, { doLogin })(Login);