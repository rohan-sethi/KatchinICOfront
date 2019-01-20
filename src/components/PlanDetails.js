import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getPlan } from './../redux/actions/actions'
import 'react-redux-spinner/dist/react-redux-spinner.css';
import $ from 'jquery'
import slider from 'bootstrap-slider'
import {setSession,getSession} from './../redux/actions/functionList' 


class PlanDetails extends Component {

	constructor(props){
		super(props)	
		this.state ={coinCount:'',Amount:''}
		 setSession("step",'PlanDetails-3');
		 var users = JSON.parse(localStorage.getItem('Auth'));	
			if(users){
				 setSession('userid',users[0]._id);
				this.handleKeyUp = this.handleKeyUp.bind(this, 'amount_ref');
			}
		  
	}

 	updateCoinCount = (event) => {
 		 var coinCount =+ document.getElementById('coinCount').value;    
 		 var amountPay =+ document.getElementById('amountPay').value;  		 
        this.setState({ coinCount: coinCount})     
        this.setState({ Amount: amountPay})
        setSession('coinCount',coinCount);	
        //window.sessionStorage.setItem("coinCount", coinCount);

    }


    
componentDidMount() {	
	
	$('#ex1').slider({
	tooltip: 'always' ,
	min: parseInt(getSession("range_start")),
	max: (getSession("range_end") === undefined ) ? 100000 :parseInt(getSession("range_end"))   ,    
	formatter: function(value) {
		var coinvalue = value/(getSession("dollar_by_coin"));
		var options2 = { style: 'decimal', currency: 'USD',maximumFractionDigits:2,minimumFractionDigits:2 };
		var new_coinvalue = new Intl.NumberFormat('en-US', options2).format(coinvalue);
		// coinvalue = coinvalue.toFixed(2);
		document.getElementById("amountPay").value =value;	
		$("#amountPay_1,#amountPay_2").text(new_coinvalue);
		document.getElementById("coinCount").value = new_coinvalue;	
		//window.sessionStorage.setItem("coinCount", new_coinvalue);
		//window.sessionStorage.setItem("amountPay", value);
		
		setSession('coinCount',new_coinvalue);
		setSession('amountPay',value);
		
		//var a=new_coinvalue.replace(/\,/g,'');
		//var mi_token = parseInt(a)/parseInt(100);               
		//$('#mi_token_html').html(mi_token);
		return '$ ' + value + " = " + new_coinvalue + ' Coins ' ;
		//var buying = new_coinvalue;     

    }
    
  
});

}

componentWillMount() {
	this.props.getPlan(this.props.match.params.id)   
    this.setState({ Amount: getSession("range_start")})   
}



handleKeyUp(refName, e) {

	var val = document.getElementById('amountPay').value;
	if(isNaN(val)){
		console.log('number')
		document.getElementById('amountPay').value=0;
		this.setState({ Amount: getSession("range_start")})  
		$("#ex1").slider("setValue", getSession("range_start"));
	}
	// prints either LoginInput or PwdInput
	if(val>=100){
		$("#ex1").slider("setValue", val);
	}
	
}

render() {
	
var { range_start, range_end,orderIdOld} = this.props.PlanDetails;
  range_start  = getSession('range_start')
  range_end  = (getSession('range_end')==undefined)?'':getSession('range_end');
let planId =getSession("setPlanId");

if(this.props.PlanDetails){
	console.log('order:'+orderIdOld)
	setSession("orderId",orderIdOld);
}

return (
	<div>
	
	<form className=""  >

		<div className="col-md-12 mainContent">
			<div className="VideoContentOuter">
				<div className="video-steps"><h1 className="robotoslab text-center text-uppercase text-thin main-title"><span className="text-bold">﻿﻿step 3:</span> Select how many <span className="text-bold"> DigiCrypt</span> Coins you
			would like to purchase in the Pre-ICO </h1></div>
			<div className="frame_box">
				<p className="FrameTitle">﻿USE SLIDER TO SELECT AMOUNT YOU <span id="amountPay_1"> 0</span> DIGICRYPT YOU WANT TO BUY</p>
				<div className="SliderContainer">
					<div className="slider-outer">
						<input onChange={this.handleChange} id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"     />
					</div>
					<div className="clearfix"></div>
					<div className="MinAmount pull-left" id="range_start"  data_range_start={range_start} > ${range_start}.00</div>
					<div className="MaxAmount pull-right" id="range_end"  data_range_end={range_end} >  {(range_end)? ' $'+ range_end:''} </div>
				</div>

				<div className="customTextTitle">﻿OR MANUALLY ENTER AMOUNT BELOW:</div>
				<div className="customValue"><div className="pull-left symbol">$ </div><div className="pull-left">
				<input id="amountPay" value={this.state.Amount}    onChange={this.updateCoinCount.bind(this)}  placeholder="Enter Custom Amount" onKeyUp={this.handleKeyUp} className="form-control" /> </div></div>
				<div className="clearfix"></div>

				<input type="hidden" id="coinCount" value={this.state.coinCount}    onChange={this.updateCoinCount.bind(this)}  placeholder="Enter Amount"    className="form-control" /> 

				<div className="smartMove">﻿SMART MOVE - YOU ARE BUYING <span id="amountPay_2"> 0</span> DIGICRYPT COINS BEFORE THE ICO!</div>
				<div className="clearfix"></div><br/><br/>
				<div className="bonousSection">
				{/*	<p className=" text-center"><img alt="" src="assets/images/free-bonous.png" className="" /><span className="text-uppercase bonous_line bonousTokens">MI -TOKENS: <span id="mi_token_html">10,000.00 </span> </span></p>*/}
					<p className="bonousCopy">﻿All participants in the Pre-ICO are getting tokens in the mining infrastructure, these are called MI-Tokens. They are issued to all participants at the Pre-ICO and ICO level. They are going to provide the initial mining infrastructure to our early adopters. However the best part is, you own a share of this, and that means as long as you own these tokens, and new DigiBit coins mined on our network, you will get your proportionate disbursement of coins for life. This is a unique opportunity to participate not only in the purchase of the most ground breaking digital currency ever, but also own a piece of the back bone that runs it. </p>
				</div>
			</div>
		</div>
		<div className="buttonContiner">
			<div className="btnLeft pull-left"><a href="/"><img alt="" src="assets/images/prev.jpg" width="270" height="92" /></a></div>
			<div className="btnRight pull-right"><a href={'payment/'+planId}  ><img alt="" src="assets/images/continue.jpg" width="270" height="92" /></a></div>
		</div>
	</div>
	</form>
	</div>
	);
	}
}


const mapStateToProps = state => {
	return {PlanDetails: state.plans.plan}
}
export default connect(mapStateToProps, { getPlan })(PlanDetails);
