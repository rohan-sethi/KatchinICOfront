import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getUserProfile} from '../../redux/actions/actions'
import {setSession,getSession} from '../../redux/actions/functionList' 
var QRCode = require('qrcode.react');

class Qrcode extends Component {
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
		
	}
	
	componentDidMount() {
		document.body.className = 'users show'
	}
	
	componentWillMount() {
		
		 var users = JSON.parse(localStorage.getItem('Auth'));	
		
		this.props.getUserProfile( users[0]._id);

	}
	
	
render() {
	// loading  paging
	let loading;
	let qrcodeUrl='';
	let salt='';
	let showButton='none';
	console.log(this.props)
	if(this.props.profileDetails.users){
		qrcodeUrl= this.props.profileDetails.users.oauthUrl;
		salt= this.props.profileDetails.users.salt;
		if(this.props.profileDetails.users.twoFactor==true){
			showButton='none';
		}else{
			showButton='block';
		}
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
		<b>Scan From Google Authenticator </b>
		<br/>
		<br/>
		<QRCode value={qrcodeUrl} />
		<br/>
		<br/>
		Code: 	{salt}
		<br/><br/>
		
		<a className="save btn" style={{textdecoration:'none',color:'#000',display:showButton}} href='/security_code'  >Next </a>
		<br/><br/>
		
	</div>
	
	</center>
</div>
)}

}
const mapStateToProps = state => {
return {
	profileDetails: state.authUser.profile
}
}
export default connect(mapStateToProps, {getUserProfile:getUserProfile })(Qrcode);