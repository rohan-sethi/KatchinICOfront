import React, { Component } from 'react';
import { connect } from 'react-redux'
import {requestEnableTwoFa,setEnableTwoFa} from '../../redux/actions/actions'
import {setSession,getSession} from '../../redux/actions/functionList' 
import * as jsPDF from 'jspdf'
import $ from 'jquery'

class Security_code extends Component {
	constructor(props){
	super(props)
		this.state = {		
			email:'',
			error:null,
			status:'no',
			isFormValid:'no'
		}
		this.downloadPdf = this.downloadPdf.bind(this);
		this.saveTwoFa = this.saveTwoFa.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		e.target.classList.add('active');
		const { name, value } = e.target;
		this.setState({ [name]: value });
		this.showInputError(e.target.name);
	}

	downloadPdf(e) {
		e.preventDefault()
		var doc = new jsPDF()		
		doc.fromHTML($('#security_code').html(), 10, 10)
		doc.save('security_code.pdf');		
	}
	
	saveTwoFa(e){
		
		var dataSet={email:this.state.email}
		this.props.setEnableTwoFa(dataSet);
		
	}
	
	componentDidMount() {
		document.body.className = 'users show'
	}
	
	componentWillMount() {			

		var users = JSON.parse(localStorage.getItem('Auth'));		
		this.setState({email:users[0].email});
		var dataSet = {email:users[0].email}
		this.props.requestEnableTwoFa(dataSet);
	
	}
	
	
render() {
	// loading  paging
	let loading;
	let orderList='';
	let salt='';
	let dataArr=[];
	if(this.props.requestDataSet.data_keys){
		console.log('assss')
		console.log(this.props)
		console.log(this.props.requestDataSet.data_keys.length)
		dataArr=this.props.requestDataSet.data_keys;
		var tifOptions = Object.keys(this.props.requestDataSet.data_keys).map(function(key,value) {
			return <tr value={key}> <td>{dataArr[key].key}</td><td>------</td><td> {dataArr[key].value}</td></tr>
		});
		
		var setKeyData = Object.keys(this.props.requestDataSet.data_keys).map(function(key) {
			return 	<div>{' KEY : '+dataArr[key].key +'   '} { '------ VALUES: '+dataArr[key].value+ ' '}</div>
		});
		
	}
	
	if(this.props.setEnableTwoFaStatus){
		if(this.props.setEnableTwoFaStatus.success==true){
			window.location='/profile';
		}
	}
	
	

return (
<div>
	<center>
	<div className="container">		
		<div className="clearfix" ></div>
		<div id="cover-spin" style={{display:loading}}></div>
		
		<br/>
		<br/>
		
		<div className="col-md-12 table-responsive">
			<table id="security_code2"  className="table borderless" style={{textAlign:'center'}} >
				<thead style={{textAlign:'center'}}>
					<tr >
						<th  style={{textAlign:'center'}}>KEY</th>
						<th  style={{textAlign:'center'}}>MAP</th>
						<th  style={{textAlign:'center'}}>VALUES</th>					
					</tr>
				</thead>
				<tbody>{tifOptions}</tbody>
		</table>
		<div id="security_code" style={{display:'none'}} >{setKeyData}</div>
		<br/><br/>
		<button onClick={this.downloadPdf} >Download Code</button> &nbsp;
		<a className="save btn" style={{textdecoration:'none',color:'#000'}} onClick={this.saveTwoFa}  >Done</a>
		<br/><br/>	
		<br/><br/>
		
	</div>
	</div>
	
	</center>
</div>
)}

}
const mapStateToProps = state => {
	return {
		requestDataSet: state.authUser.userRequestEnableTwoFa,setEnableTwoFaStatus:state.authUser.setEnableTwoFa
	}
}
export default connect(mapStateToProps, {requestEnableTwoFa,setEnableTwoFa})(Security_code);