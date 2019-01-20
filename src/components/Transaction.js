import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan,orderTransaction} from './../redux/actions/actions'
import {setSession,getSession} from './../redux/actions/functionList' 

class Transaction extends Component {

constructor(props){
	super(props)	
	this.state ={Res:''}
	this.handleChange = this.handleChange.bind(this);	
	this.copyClick = this.copyClick.bind(this);	

}

componentDidMount() {
	
	this.props.getPlan(this.props.match.params.id)	
	let coinType =getSession("coinType");
	let amountPay =getSession("amountPay");
	let orderId =getSession("orderId");

	if(getSession('transactionAddress')==null){
		
		var order_transaction = {coinType:coinType,amountPay:amountPay,orderId:orderId};	
		this.props.orderTransaction(order_transaction)
	}else{
		let transactionId='';
		 transactionId = getSession('transactionAddress')
	}
	//console.log(this.props.transaction);

}


	handleChange(e) {
	 const { name, value } = e.target;
	 this.setState({ [name]: value });
	}

	copyClick(e){
		e.preventDefault();		
		var copyText = document.getElementById("address_copy");
		//alert(copyText)
		/* Select the text field */
		copyText.select();
		/* Copy the text inside the text field */
		document.execCommand("copy");
		// alert("Copied the text: " + copyText.value);
	 
	}

render() {

	setSession("step",'Transaction-5');
	var {  range_start, range_end } = this.props.Transaction

	    let planId =getSession("setPlanId");
		
		let tran_amount ='';
		let coin_total='';
		let transactionAddress='';
		let transactionId=getSession('transactionAddress')
		let coinType = getSession("coinType");
		let amountPay = getSession("amountPay");
		let coin_get = getSession("coin_get");

	console.log(getSession('transactionAddress'))
	// loading  paging
	let loading;

	if(transactionId==null){	

		if(this.props.transactionData){
			console.log('call:')	
			loading = 'none'		
			tran_amount = this.props.transactionData.amount;
			transactionAddress = this.props.transactionData.address;
			transactionId = this.props.transactionData.txn_id;
			setSession('coinPayTranCreateReq',this.props.transactionData);
			setSession("transactionId",transactionId);
			setSession("transactionAddress",transactionAddress);
			coin_get = setSession("coin_get",tran_amount);	
			window.location.reload();	
			
		}else{
			loading='block'
		}
	}

return (
<div>
	<div className="col-md-12 mainContent">
		<div id="cover-spin" style={{display:loading}}></div>
		<div className="col-md-12">
			<p className="orange_clr">Your ﻿<span>LITECOIN TRANSACTION</span> will be expire in</p>
			<p className="final_step text-center"><strong>﻿STEP 6:</strong> ﻿﻿SEND {coin_get} {coinType} TO THE ADDRESS BELOW <strong className="text-uppercase final_line">(Final Step) </strong></p>
		</div>
		<div className="clearfix"> </div>
		<div className="VideoContentOuter">
			<div className="VideoContentOuter">
				<div className="frame_box_two">
					<p className="converted_detail text-center">﻿WE HAVE CONVERTED <span>${amountPay}</span> to {coin_get} {coinType} .<br/>
					Please send <span>{coin_get} {coinType} </span> to the address below</p>
					<div className="col-md-8 text-center col-md-offset-2" >
						<form>
							<div className="input-group" >
								<input type="text" style={{width:'100%'}} id="address_copy" value={transactionId} className="my_search" onChange={this.handleChange} placeholder={transactionId} />
								<div className="input-group-btn" >
									<button className="btn-default my_new_btn" onClick={this.copyClick} type="button" >
									 <img src="assets/images/coyp_button.png" />  </button>
								</div>
							</div>
						</form>
						
					</div>
					<div className="col-md-12">
						<p className="rember_article text-center mt15">﻿Remember to include the transaction fee in addition to this amount above</p>
					</div>
					<div className="col-md-10 col-md-offset-1 mt20">
						<div className="col-md-5 uder_lne text-right">
							﻿ONLY CLICK AFTER YOU  <br/>
							HAVE SENT THE LITECOIN
						</div>
						<div className="col-md-2 red_lne">
						﻿<img src="assets/images/red_line_arrow.png" className="img-responsive" /></div>
						<div className="col-md-5 confrm_btn">
							﻿<a href={'transaction_status/'+planId} ><img src="assets/images/confirm_tr.png" width="100%" className="img-responsive" /></a></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
);
}
}


const mapStateToProps = state => {

	return {Transaction: state.plans.plan,transactionData:state.order.transaction}
}
export default connect(mapStateToProps, { getPlan:getPlan ,orderTransaction : orderTransaction})(Transaction);


