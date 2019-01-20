import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan,orderAdd} from './../redux/actions/actions'
import {setSession,getSession} from './../redux/actions/functionList' 

class LockConversion extends Component {

	constructor(props){
		super(props)	
		this.state ={transaction_type:'',amount:''}
		setSession("step",'LockConversion-5');
	 	
	}

componentDidMount() {
	var transaction_type = getSession("coinType");
	transaction_type =(transaction_type==='BTC'?'BITCOIN':transaction_type);
	transaction_type =(transaction_type==='LTC'?'LITECOIN':transaction_type);
	transaction_type =(transaction_type==='ETH'?'ETHER':transaction_type);	
	this.setState({transaction_type:transaction_type})
	var amountPay = getSession("amountPay");
	this.setState({amount:amountPay})
	

}
componentWillUnmount() {
document.body.className = ''

}
componentWillMount() {
	this.props.getPlan(this.props.match.params.id)	
	this.props.orderAdd()
    
}


render() {
		console.log(this.props)
		var  range_start  = getSession('range_start')
		var  range_end  = getSession('range_end')

	    let planId =getSession("setPlanId");
	    let ipAddress =getSession("setIPAdd");
	    //let orderId =getSession("orderId");
	    let orderId =this.props.LockConversion.orderIdSet;

	   //setSession("setIPAdd",this.props.orderDetails.loginId);
	   getSession("setIPAdd");
		//console.log(this.props.orderDetails);
	

return (
<div>
	<div className="col-md-12 mainContent">
		<div className="col-md-12 capital nop">
		<div className="col-md-3 price_bg_capital text-center">
		<h4 className="text-uppercase">﻿﻿Early Adopter</h4>
		<h4 className="text-uppercase dollar_price">﻿﻿${range_start}.00 - ${range_end}.00</h4>
		</div>
		<div className="col-md-9">
		<p className="fs_capital_amt">﻿YOUR CAPITAL COMMITMENT: <span>${this.state.amount}</span></p>
		</div>
		</div>
		<div className="col-md-12 mt30">
		<div className="video-steps mt20"><h1 className="robotoslab text-center text-uppercase text-thin main-title"><span className="text-bold">﻿﻿step 5:</span>  ﻿LOCK IN CONVERSION RATE </h1></div>
		<h1 className="text-center fs61 robotoslab">BITCOIN PAYMENT</h1>
		</div>
		<div className="clearfix"> </div>
		<div className="VideoContentOuter">
		<div className="VideoContentOuter">
		<div className="frame_box_one">
		<div className="col-md-12">
		<p className="trans_detail">
		﻿Transaction Type: <span> {this.state.transaction_type} </span> <br/>
		﻿IP ADDRESS: <span>{ipAddress}</span> <br/>
		TXN AMOUNT: <span>${this.state.amount}</span> <br/>
		TXN ID: <span>{orderId}</span> 
		</p>
		<img src="assets/images/bitcoin_icon.png" className="bit_coin" /></div>
		<div className="col-md-12">
		<p className="text-center fs20 fw300 mt10">
		﻿TO CONTINUE YOUR TRANSACTION IN BITCOIN, CLICK THE BUTTON BELOW TO CONVERT USD TO BITCOIN - YOU WILL HAVE 10 MINUTES FROM THE TIME YOU CLICK THE BUTTON TO COMPLETE YOUR TRANSACTION
		</p>
		</div>
		<div className="col-md-8 col-md-offset-3 mt15" >
		<img src="assets/images/arro_one_left.png" style={{marginright:'10px'}} /> 
		<span className="lock_btn"> <a href={'transaction/'+planId} >LOCK IN PRICE</a> </span>   
		<img src="assets/images/arro_one_right.png" style={{marginleft:'10px'}} />
		</div>
		<div className="clearfix"></div>  
		</div>
		</div>
		<div className="col-md-12 nop">  
		<p className="fs16 bit_detial">
		<strong className="text-uppercase">Note:</strong> BECAUSE WE ARE TAKING BITCOIN AS PAYMENT AGAINST AN OLD FIAT CURRENCY SUCH AS THE US DOLLAR, WE NEED TO BE ABLE TO LOCK IN THE CONVERSION RATE.  <br/> <br/>
		WE CAN ONLY DO THIS FOR 10 MINUTES. THIS WILL CONVERT THE AMOUNT OF BITCOIN THAT WILL BE NEEDED TO CONVERT YOUR INVESTMENT OF <strong>${this.state.amount} </strong>INTO BITCOIN. PLEASE ONLY CLICK THE BUTTON TO LOCK IN THE PRICE ONCE YOU ARE READY TO SEND SO WE DON'T HAVE TO START ALL OVER. <br/>
		<strong>GOOD LUCK, WE ARE ALMOST AT THE LAST STEP!</strong>
		</p>
		</div>
		</div>

		<div className="buttonContiner">
		<div className="btnLeft pull-left"><a href="javascript: window.history.go(-1)"><img src="assets/images/prev.jpg" width="270" height="92" /></a></div>
		
		</div>

	</div>
</div>
);
}
}


const mapStateToProps = state => {
	return {LockConversion: state.plans.plan ,orderDetails: state.order.orders }
}
export default connect(mapStateToProps, { orderAdd: orderAdd ,getPlan: getPlan})(LockConversion);


