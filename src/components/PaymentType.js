import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan} from './../redux/actions/actions'
import $ from 'jquery'
import {setSession,getSession} from './../redux/actions/functionList' 

class PaymentType extends Component {

constructor(props){
	super(props)
	this.validatePaymentType =this.validatePaymentType.bind(this);
	setSession("step",'PaymentType-4');

}
componentDidMount() {
	$('.selectPaymethoed').on('click', function() {		

		var coinType = $(this).attr('alt');	

		//window.sessionStorage.setItem("coinType", coinType);
		setSession('coinType',coinType);
		$('.tick').hide();
		$(this).next('.tick').show(); 		
    });
}

validatePaymentType(e){
	e.preventDefault();
	
	if($('.tick').is(':visible')){
   		//alert('go head')
   		//var coin_type =window.sessionStorage.getItem('coinType');
   		var coin_type = getSession('coinType');
   		if(coin_type=='OTHER_COIN'){
   			window.location = '/coin_to_swap/'+this.props.match.params.id;	
   		}else if(coin_type==='BTC' || coin_type==='LTC' || coin_type==='ETC' ){
			window.location = '/lock_conversion/'+this.props.match.params.id;
   		}else if(coin_type==='NO_COIN' ){
   			window.location = '/tutorials/'+this.props.match.params.id;	
   		}
   		
   		
   }else{
   		alert('Please select PaymentType.')
   }
}


componentWillMount() {
	this.props.getPlan(this.props.match.params.id)
    
}

render() {


		var  range_start  = getSession('range_start')
		var  range_end  = getSession('range_end')

	    let planId =getSession("setPlanId");		
		let amountPay = getSession("amountPay");
		//console.log("total_amount :"+getCoin);

	return (
<div>
	<div className="col-md-12 mainContent">
		<div className="col-md-12 capital nop">	
			<div className="col-md-3 price_bg_capital text-center">
				<h4 className="text-uppercase">﻿﻿Early Adopter</h4>
				<h4 className="text-uppercase dollar_price">﻿﻿${range_start}.00 - ${range_end}.00</h4>
			</div>
			<div className="col-md-9">
				<p className="fs_capital_amt">﻿YOUR CAPITAL COMMITMENT: <span>${amountPay}</span></p>
			</div>
		</div>
		<div className="col-md-12 mt30">
			<div className="video-steps mt20"><h1 className="robotoslab text-center text-uppercase text-thin main-title"><span className="text-bold">﻿﻿step 4:</span> PICK YOUR PAYMENT METHOD </h1></div>
			<p className="pre_ico">﻿<strong>Pre-ICO Package Level:</strong> DigiCrypt Early Adopter <img alt="" src="assets/images/greentick.png" /></p>
		</div>
		<div className="clearfix"> </div>
		<div className="VideoContentOuter">
			<div className="VideoContentOuter">
				<div className="frame_box">
					<p className="FrameTitle_one"> <img src="assets/images/arrow_btn.png"  alt="" className="mr8" /> ﻿﻿SELECT PAYMENT METHOD AND CLICK CONTINUE <img src="assets/images/arrow_btn.png" alt="" className="ml8" /></p>
					<ul className="capital_btn list-inline center-block mt30">
						<li>
							<img src="assets/images/paybitcoin.png" alt="BTC" className="img-responsive selectPaymethoed btn-bit-pay" />
							<img src="assets/images/greentick.png" alt="" className=" tick" style={{'display':'none'}} />
						</li>
						<li>
							<img src="assets/images/paylitcoin.png" alt="LTC" className="img-responsive selectPaymethoed btn-lite-pay" />
							<img src="assets/images/greentick.png" alt="" className="tick" style={{'display':'none'}} />
						</li>
						<li>
							<img src="assets/images/payeither.png" alt="ETC" className="img-responsive selectPaymethoed btn-ether-pay" />
							<img src="assets/images/greentick.png" alt="" className="tick" style={{'display':'none'}} />
						</li>
					</ul>
					<div alt="OTHER_COIN" className="col-md-7 col-md-offset-3 payby_ant selectPaymethoed btn-other-pay">PAY BY ANOTHER CRYPTO CURRENCY</div>
					<img src="assets/images/greentick.png" alt="OTHER_COIN" className="tick selectPaymethoed" style={{'display':'none'}} />
					<div className="clearfix"></div>
					<div alt="NO_COIN" className="col-md-10 col-md-offset-1 payby_ant_one selectPaymethoed btn-guide-pay">
						<span>Don't own any cryptocurrency but want to invest? </span><br/>
					Follow our guide to setup and fund you wallet NOW</div>
					<img src="assets/images/greentick.png" alt="NO_COIN" className="tick" style={{'display':'none'}} />
				</div>
			</div>
		</div>
		<div className="buttonContiner">
			<div className="btnLeft pull-left">
			<a href={'plan/'+planId} ><img src="assets/images/prev.jpg" width="270" height="92" /></a>
			</div>
			<div className="btnRight pull-right">
			<a id="linkId" onClick={this.validatePaymentType} href={'lock_conversion/'+planId} ><img src="assets/images/continue.jpg" width="270" height="92" /></a>
			</div>
		</div>
	</div>
</div>
);
}
}

const mapStateToProps = state => {
	return {PaymentType: state.plans.plan}
}
export default connect(mapStateToProps, { getPlan })(PaymentType);


