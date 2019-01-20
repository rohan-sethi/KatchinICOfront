import React, { Component } from 'react';
import { connect } from 'react-redux'
import {loadPlans,orderAdd} from './../redux/actions/actions'
import $ from 'jquery'
import {setSession,getSession} from './../redux/actions/functionList' 


class Home extends Component {

	
setPlanClick(e) {

	e.preventDefault();    

	var planId= e.currentTarget.dataset.id;   
	setSession('setPlanId',planId);
	setSession('range_start',e.currentTarget.dataset.range_start);
	setSession('range_end',e.currentTarget.dataset.range_end);
	setSession('dollar_by_coin',e.currentTarget.dataset.price);
	setSession('step','setPlan-2');
	var  current_date =  Date();
	setSession('created_date',current_date);
	
    var users = JSON.parse(localStorage.getItem('Auth'));
    
	 if( users === undefined || users === null ){		 	
	 	 window.location = '/register/';
	 }else{
	   window.location = '/plan/'+planId;
	 }	
   
}

componentDidMount() {
	var userDataJson = {};	
	var twoFactorShow='no';
	var twoFactorStatus='no';
	if(window.sessionStorage.getItem("user_data_array")){
		 twoFactorShow = getSession('twoFactorShow')
		 twoFactorStatus = getSession('twoFactorStatus')
	}
	
	window.sessionStorage.setItem("user_data_array", JSON.stringify(userDataJson));	
	setSession('twoFactorShow',twoFactorShow)
	setSession('twoFactorStatus',twoFactorStatus)
	
}

componentWillUnmount() {

}
componentWillMount() {
	//data = <img src='assets/images/pleasewait.gif' />
	this.props.loadPlans()
	this.props.orderAdd()

}
render() {
//console.log(this.props.orderDetails)


if(this.props.orderDetails.loginId){
	
	setSession("setIPAdd",this.props.orderDetails.loginId);
	//setSession("orderId",this.props.orderDetails.orderId);
}
// loading  paging
	let loading;
	if(this.props.articles[0]){	
		loading = 'none'
	}else{
		loading = 'block'
	}
 

return (
<div>
	<div className="col-md-12">
		<div className="red_arrow">
			<div className="arrow_in">
			<div id="cover-spin" style={{display:loading}}></div>
				
				<img alt="" src="assets/images/red_arrow.png" className="img-responsive" />
			</div>
		</div>
		<h1 className="robotoslab text-center text-uppercase">﻿﻿step 2: SELECT YOUR <span className="golden">digicrypt </span> pre-ico PACKAGE </h1>
		<p className="video_bot thin-text">﻿DigiCrypt + Gamification will change Finance forever...</p>
	</div>
	{ this.props.articles.map((article)=>
	<div className="col-md-6 col-sm-12 col-xs-12 col-lg-3 mt50"  key={Math.random()} >
		<div className="first_gr ">
			<div className={ 'rect ' + article.type} >
				<p className="text-uppercase text-center fs22 pt8">﻿Digicrypt
				<br/> {article.name}</p>
				<p className="fs20 text-center">${article.range_start.toFixed(2)}  {(article.range_end)? ' - $'+ article.range_end.toFixed(2):'+'}</p>
			</div>
			<p className="text-center gr_one">﻿PRE ICO Coin Price</p>
			<p className="dlr_price roboto">﻿${article.price}</p>
			<div><img alt="" src="assets/images/cern-bdr.jpg"  className="img-responsive center-block" /></div>				<p className="text-center mt20">﻿PAY BACK TIME AFTER LAUNCH</p>
			<p className="fs18 text-center"><strong>﻿ESTIMATED {article.days} DAYS</strong></p>
			<div><img alt="" src="assets/images/cern-bdr.jpg"  className="img-responsive center-block" /></div>
			<p className="fs12 video_detail roboto">
				﻿{article.description}
			</p>
			<div className="btn_buy_now"><a href="#" data-price={article.price} data-range_start={article.range_start} data-range_end={article.range_end} data-id={article._id} 	onClick={(e) => this.setPlanClick(e)}
			><img src="assets/images/btn_buynow.jpg" width="226" height="42" alt="Buy Now" /></a></div>
		</div>
	</div>
	)}
	
</div>
)}

}
const mapStateToProps = state => {
	return { articles: state.plans.plans,orderDetails: state.order.orders}
}
export default connect(mapStateToProps, { orderAdd: orderAdd ,loadPlans: loadPlans  })(Home);