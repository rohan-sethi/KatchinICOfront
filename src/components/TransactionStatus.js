import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan,transactionStatus} from './../redux/actions/actions'
import {setSession,getSession} from './../redux/actions/functionList' 


class TransactionStatus extends Component {

	constructor(props){
		super(props)
		setSession("step",'TransactionStatus-6');
		this.state ={checkFaild:'none',checkSuccess:'none',msgBox:''}
	}
	


componentDidMount() {
	document.body.className = 'users show'
	this.props.getPlan(this.props.match.params.id)	

	//let transactionId =window.sessionStorage.getItem("transactionAddress");
	let transId =getSession("transactionId");
	this.props.transactionStatus(transId);
	var status_text = getSession("status_text");
	
	if(status_text=='Waiting for buyer funds...' || status_text=='Pending'  || status_text=='Complete' ){
		this.setState({checkSuccess:'block'})
		this.setState({msgBox:'Your transaction send successfully We will get back to You. '})
		setSession('setPlanId','');
	
		setSession('dollar_by_coin','');
		setSession('step','setPlan-2');
		setTimeout(() => {		
			setSession('range_start','');
			setSession('range_end','');
			window.location='/profile';
		}, 5000);
		
	}else{
		this.setState({checkFaild:'block'})
		this.setState({msgBox:'Waiting for your transaction response. '})
		setTimeout(() => {
			window.location.reload();	
		}, 5000);
		//window.location.reload();	
	}

}


	render() {

		var  range_start  = getSession('range_start')
		var  range_end  = getSession('range_end')
	
		let status_text ='';
		let coinType='';
		let amountPay='';
		// loading  paging
		let loading;
		coinType = getSession("coinType");
		amountPay = getSession("amountPay");
		status_text = getSession("status_text");
		let transactionId =getSession("transactionAddress");
		let setIPAdd =getSession("setIPAdd");	
		
		if(status_text==null){
			if(this.props.transactionData){
				console.log('tranin:')				
				loading = 'none'
				status_text =this.props.transactionData.status_text;				
				setSession("status_text",status_text);				
				setSession('coinPayPaymentReceiveReq',this.props.transactionData);	
				//window.location.reload();	
			}else{
				loading='block'
			}	

		}
		
		
		

return (
<div>
	<div className="col-md-12 mainContent">
		<div id="cover-spin" style={{display:loading}}></div>
<div className="col-md-12 capital nop">
	<div className="col-md-3 price_bg_capital text-center">
		<h4 className="text-uppercase">﻿﻿Early Adopter</h4>
		<h4 className="text-uppercase dollar_price">﻿﻿${range_start} - ${range_end}</h4>
	</div>
	<div className="col-md-9">
		<p className="fs_capital_amt">﻿YOUR CAPITAL COMMITMENT: <span>${amountPay}</span></p>
	</div>
</div>
<div className="col-md-12 mt30">
	<h1 className="text-center fs61 robotoslab">BITCOIN PAYMENT</h1>
	<p className="error_message mt20"  style={{display:this.state.checkFaild}} >	<span className="red_dark">ERROR</span>: ﻿﻿{this.state.msgBox} </p>
	<p className="error_message mt20" style={{color:'green',display:this.state.checkSuccess}}>	<span style={{fontWeight:'500',color:'green'}}>Success</span>: ﻿﻿{this.state.msgBox} </p>
		<p className="error_message_down">
			IF YOU ALREADY SENT YOUR PAYMENT -  DO NOT SEND AGAIN!
		</p>
		<div className="col-md-10 col-md-offset-1">
			<p className="fs20 fw200">
				INSTEAD SEND AN EMAIL TO <strong>PAYMENTS@DIGICRYPT.COM. </strong> BE SURE TO INCLUDE YOUR <strong>TRANSACTION ID "{transactionId}" </strong>AND THE SENDING ADDRESS. ONCE PAYMENT IS CONFIRMED WE WILL CREDIT YOUR ACCOUNT.
			</p>
		</div>
	</div>
	<div className="clearfix"> </div>
	<div className="VideoContentOuter">
		<div className="VideoContentOuter">
			<div className="frame_box_one">
				<div className="col-md-12">
					<p className="trans_detail">
						﻿Transaction Type: <span>{coinType}</span> <br/>
						﻿IP ADDRESS: <span>{setIPAdd}</span> <br/>
						TXN AMOUNT: <span>${amountPay}</span> <br/>
						TXN ID: <span>{transactionId}</span>
					</p>
				<img src="assets/images/bitcoin_icon.png" className="bit_coin" alt="" /></div>
				<div className="col-md-12">
					<p className="text-center fs20 fw300 mt10">
						﻿TO CONTINUE YOUR TRANSACTION IN BITCOIN, CLICK THE BUTTON BELOW TO CONVERT USD TO BITCOIN - YOU WILL HAVE 10 MINUTES FROM THE TIME YOU CLICK THE BUTTON TO COMPLETE YOUR TRANSACTION
					</p>
				</div>
				<div className="col-md-8 col-md-offset-3 mt15">
					<img src="assets/images/arro_one_left.png" style={{marginright:'10px'}} alt="" />
					<span className="lock_btn"><a href="/"> LOCK IN PRICE</a> </span>
					<img src="assets/images/arro_one_right.png" style={{marginLeft:'10px'}} />
				</div>
				<div className="clearfix"></div>
			</div>
		</div>
		<div className="col-md-12 nop">
			<p className="fs16 bit_detial">
				<strong className="text-uppercase">Note:</strong> BECAUSE WE ARE TAKING BITCOIN AS PAYMENT AGAINST AN OLD FIAT CURRENCY SUCH AS THE US DOLLAR, WE NEED TO BE ABLE TO LOCK IN THE CONVERSION RATE.  <br/> <br/>
				WE CAN ONLY DO THIS FOR 10 MINUTES. THIS WILL CONVERT THE AMOUNT OF BITCOIN THAT WILL BE NEEDED TO CONVERT YOUR INVESTMENT OF <strong>${amountPay} </strong>INTO BITCOIN. PLEASE ONLY CLICK THE BUTTON TO LOCK IN THE PRICE ONCE YOU ARE READY TO SEND SO WE DON'T HAVE TO START ALL OVER. <br/>
				<strong>GOOD LUCK, WE ARE ALMOST AT THE LAST STEP! </strong>
			</p>
		</div>
	</div>
	<div className="buttonContiner">
		<div className="btnLeft pull-left"><a href="javascript: window.history.go(-1)" ><img src="assets/images/prev.jpg" width="270" height="92" /></a></div>

	</div>
</div>
	</div>

	
);
}
}


const mapStateToProps = state => {

	return {Transaction: state.plans.plan,transactionData:state.order.transactionStatus}
}
export default connect(mapStateToProps, { getPlan:getPlan ,transactionStatus : transactionStatus})(TransactionStatus);


