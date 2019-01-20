import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan,orderAdd} from './../redux/actions/actions'
import {setSession,getSession} from './../redux/actions/functionList' 


class Tutorials extends Component {

	constructor(props){
		super(props)	
		this.state ={transaction_type:'',amount:''}		
	 	
	}

componentDidMount() {
	var transaction_type = getSession("coinType");
	transaction_type =(transaction_type==='BTC'?'BITCOIN':transaction_type);
	transaction_type =(transaction_type==='LTC'?'LITECOIN':transaction_type);
	transaction_type =(transaction_type==='ETH'?'ETHER':transaction_type);	
	this.setState({transaction_type:transaction_type})
	var amountPay = getSession("amountPay");
	this.setState({amount:amountPay})
	setSession('user_have_coin','no_coin')
	

}
componentWillUnmount() {
document.body.className = ''

}
componentWillMount() {
	this.props.getPlan(this.props.match.params.id)
	
	this.props.orderAdd()
    
}


render() {

	var {  range_start, range_end } = this.props.LockConversion

	    let planId =getSession("setPlanId");
	   setSession("setIPAdd",this.props.orderDetails.loginId);
		//console.log(this.props.orderDetails);
	

return (
<div>
	<div className="col-md-12 mainContent">
		<div className="col-md-12 capital nop">
		<div className="col-md-3 price_bg_capital_one text-center">
		<h4 className="text-uppercase">﻿﻿﻿YEAR 1 EARNINGS</h4>
		</div>
		<div className="col-md-9">
		<p className="green_three">﻿﻿<span>$</span>{this.state.amount}.00 <span className="new_green">﻿(<span className="main_green">203%</span> Increase in 1 year)</span> </p>
		</div>
		</div>

		<div className="col-md-12 mt30">
		<p className="final_step text-center"><strong>﻿STEP 5:</strong> SETUP <span>COINBASE.COM</span> ACCOUNT <span className="text-uppercase final_line_big">(Just a few more steps left) </span></p>

		</div>

		<div className="clearfix"> </div>

		<div className="VideoContentOuter">
		<div className="VideoContentOuter">
		<div className="frame_box" style={{minheight:'230px'}}>
		<div className="col-md-12">
		<p className="step_fi text-uppercase">
		If you don't have a wallet at this very moment, don't sweat! <br/>
		<span>It's easy to setup, and the best part... YOU and You  Alone <br/> are in control of your money</span>
		</p>
		</div>
		<div className="col-md-12 nop mt10">
		<img src="assets/images/arro_one_left.png" style={{marginright:'10px'}} /> 
		<span className="lock_btn_big"> <a href={'payment/'+planId}  >YES! I have completed my account setup process at Coinbase.com</a></span>   
		<img src="assets/images/arro_one_right.png" style={{marginleft:'10px'}} />
		</div>
		</div>
		</div>
		</div>

		<div className="col-md-8 col-md-offset-2">
		<p className="fs22 text-center fb-200">﻿Check out our tutorials below if you need help with ensuring 
		you setup secure your wallet successfully </p>
		</div>

		<div className="col-md-6 col-md-offset-3 mt20">
		<div className="pull-left">
		<div className="orange_border"><a href="#"><img src="assets/images/vidoe.jpg" width="100%" className="img-responsive center-block" /></a></div>
		<p className="video_tut mt10">
		<span>Video Tutorial</span><br/>
		﻿﻿Send Bitcoin from your  <br/>
		Coinbase.com account
		</p>  
		</div>

		<div className="pull-right">
		<div className="orange_border"><a href="#"><img src="assets/images/pdf.jpg"  className="img-responsive center-block" /></a></div>
		<p className="video_tut mt10" >
		<span>Step-by-step-guide-cb.pdf</span></p>  
		</div>
		</div>

	</div>
</div>
);
}
}


const mapStateToProps = state => {
	return {LockConversion: state.plans.plan ,orderDetails: state.order.orders }
}
export default connect(mapStateToProps, { orderAdd: orderAdd ,getPlan: getPlan})(Tutorials);


