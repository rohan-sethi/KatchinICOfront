import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserProfile,getUserOrders,getOrderDetails } from '../../redux/actions/actions'
import 'react-redux-spinner/dist/react-redux-spinner.css';
import $ from 'jquery'
import Pagination from "react-js-pagination";
import Popup from "../common/Popup";
import {setSession,getSession} from '../../redux/actions/functionList' 

class Profile extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			password:'',			
			error:null,
			status:'no',
			isFormValid:'no',
			activePage: 1,
			itemsCountPerPage: 5,
			totalItemsCount: 0,
			pageRangeDisplayed: 3,
			showPopup: false,
			loading: 'none'
		}
		this.handlePageChange = this.handlePageChange.bind(this);
		this.selectPlanDetails = this.selectPlanDetails.bind(this);
		//setSession('twoFactorShow','no')
	} 
	
	togglePopup(e) {
		//var planId= e.currentTarget.dataset.id;   
		console.log(e.currentTarget.dataset.id)  
		this.setState({
		  showPopup: !this.state.showPopup
		});
		setSession('twoFactorShow','yes')
	}
	
	componentWillMount() {	
	
		var users = JSON.parse(localStorage.getItem('Auth'));
		if(users){			
			this.props.getUserProfile(users[0]._id)
			this.props.getUserOrders(this.state.activePage,users[0]._id)
			this.setState({totalItemsCount: this.props.orders.totalCount});
			 setSession('twoFactorStatus',users[0].twoFactor)
			if(users[0].twoFactor==false && getSession('twoFactorShow')!='yes'){
				this.setState({
					showPopup: true
				});	
				//setSession('twoFactorShow','yes')
			}
			
		}
		
		
		
	}
	
	selectPlanDetails(e){
		e.preventDefault();
		this.setState({loading:'block'})	
		var planId= e.currentTarget.dataset.id;
		console.log(planId)
		this.props.getOrderDetails(planId)
			console.log(this.props)
		this.setState({loading:'none'})	
	}
	
	handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
	var users = JSON.parse(localStorage.getItem('Auth'));
	this.props.getUserOrders(pageNumber,users[0]._id);
    this.setState({activePage: pageNumber});
	}

	render() {
		
	console.log(this.props)
		let orderList=''
		let planDetails='none'
		let userPlan={}
		let userProfile={}
		let userAddress={}
		let totalCoin=0;
		

		if(this.props.orders.message){
		
			userPlan = this.props.orders.message[0];
			planDetails= (userPlan)?'block':'none';	
			userProfile = this.props.profileDetails.users;	
			totalCoin = this.props.profileDetails.total_coins;	
			userAddress = (this.props.profileDetails.users)?this.props.profileDetails.users.address:{};	

			var  profileDetails  = this.props.profileDetails;		 		 
			var  ordersList  = this.props.totalCount;		 		 
			orderList = this.props && this.props.orders.message.length > 0 ?this.props.orders.message.map(order=>
				<tr key={Math.random()} >
				<td><a data-id={order._id} onClick={this.selectPlanDetails} >{order.plan_name}</a></td>
				<td>{(order.created_date)?order.created_date.replace('T',' ').replace('Z','').replace('.000',''):''}</td>
				<td>{order.tx_coin_type}</td>
				<td className="orange_clr_profile">${order.amount}</td>
				<td>{(order.status_text)?order.status_text:order.status}</td>
			  </tr>):<tr></tr>; 
		}	
		
		if(this.props.orderDetails.message){
		
			userPlan = this.props.orderDetails.message;
			planDetails= (userPlan)?'block':'none';	
			console.log(userPlan)
		}	

		return (
			<div>
				<div className="clearfix"></div>
					<div className="col-md-12 mainContent">
					<div id="cover-spin" style={{display:this.state.loading}}></div>
						<div className="VideoContentOuter" ><div className="VideoContentOuter">
							<div className="frame_box_profile" style={{minHeight:'1000px'}} >
								<div className="col-md-12 btm_border">
						<h3 className="profile_heading">PROFILE INFORMATION <span className="lock_btn_profile"> <a href="#">Edit Profile</a> </span> </h3>
					</div>
					<div className="clearfix"></div>
					<div className="col-md-12"> <hr/> </div>
					{/*<div className="col-md-5">
						<p className="profile_block text-uppercase"><strong>NAME :</strong> {userProfile?userProfile.first_name:''} {userProfile?userProfile.last_name:''}  </p>
					</div>
					<div className="col-md-5">
						<p className="profile_block text-uppercase"><strong>USER NAME :</strong> {userProfile?userProfile.username:''}</p>
					</div>
					<div className="clearfix"></div>
					*/}

					<div className="col-md-5 mt10">
						<p className="profile_block"><strong className=" text-uppercase">EMAIL: </strong>{userProfile?userProfile.email:''}</p>
					</div>
					<div className="col-md-5 mt10">
						<p className="profile_block text-uppercase"><strong>Password  : </strong> **********</p>
					</div>

					<div className="col-md-10 mt10">
						<p className="profile_block"><strong className=" text-uppercase">CURRENT: </strong>{userAddress? userAddress.current:''}</p>
					</div>
					

					<div className="col-md-10 mt10">
						<p className="profile_block text-uppercase"><strong>DEFAULT  : </strong>{userAddress?userAddress.default:''}</p>
					</div>

					<div className="col-md-10 mt10">
						<p className="profile_block text-uppercase"><strong>Total DIGBIT : </strong>{totalCoin}</p>
					</div>


					<div className="coin_purchasesd" style={{display:planDetails}}>
						<div className="col-md-12 btm_border mt20">
							<h3 className="profile_heading">Coin Purchased </h3>
						</div>
						<div className="col-md-12"><hr className="mt0" /></div>
						
						{/*<div className="col-md-2 "><img src="assets/images/digbit.png" className="img-responsive mt15" /></div>*/}
						
						
											
						<div className="col-md-12 col-sm-12 main_profile ">
							
							{/*<div className="col-md-3 nop"><img src="assets/images/gren_bg.png" className="img-responsive" /></div> */}
							
							<div className={ 'rect ' + ( userPlan? userPlan.plan_name:'')  + ' col-md-3 nop'} style={{height:'132px'}}  ><p style={{fontSize:'14px'}} className="text-uppercase text-center fs22 pt8">&#65279;Digicrypt<br/> AMBASSADOR</p><p style={{fontSize:'14px'}} className="fs20 text-center"></p></div>
							
							<div className="col-md-3 col-sm-3 mt20">
								<p className="coin_block">Dollar Amount</p>
								<strong className=" text-uppercase fs16">${ userPlan? userPlan.amount:'' }</strong>
							</div>
							<div className="col-md-3 col-sm-3 nop mt20">
								<p className="coin_block">Currency nvested</p>
								<strong className=" text-uppercase fs16">{  userPlan? userPlan.tx_coin_type:''}</strong>
							</div>
							<div className="col-md-3 col-sm-3 mt20">
								<p className="coin_block">Package Cost</p>
								<strong className=" text-uppercase fs16">${userPlan? userPlan.amount:''}</strong>
							</div>
							<div className="col-md-3 col-sm-3 mt20">
								<p className="coin_block">Exchange Rate</p>
								<strong className=" text-uppercase fs16">n/a<br/>
								BTC/USD</strong>
							</div>
							<div className="col-md-3 col-sm-3 nop mt20">
								<p className="coin_block">Coins Purchased</p>
								<strong className=" text-uppercase fs16">{userPlan? userPlan.coins:''} DIG</strong>
							</div>
							<div className="col-md-3 col-sm-3 mt20">
								<p className="coin_block">Status</p>
								<strong className=" text-uppercase fs16">{userPlan? userPlan.status_text:''} <br/>
								premine</strong>
							</div>
						</div>
					</div>
					<div className="col-md-12 btm_border SectionHeading">
						<h3 className="profile_heading">Biling Information / transaction histry</h3>
					</div>
					<div className="col-md-12"><hr className="mt0" /></div>
					<div className="col-md-12 table-responsive">
						<table className="table borderless" >
							<thead>
								<tr>
									<th>PLAN NAME</th>
									<th>DATE</th>
									<th>TYPE</th>
									<th>AMOUNT</th>
									<th>STATUS</th>
								</tr>
							</thead>
							<tbody>{orderList}</tbody>
						</table>
					<Pagination
						activePage={this.state.activePage}
						itemsCountPerPage={5}
						totalItemsCount={this.props.orders.totalCount}
						pageRangeDisplayed={3}
						onChange={this.handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
	{this.state.showPopup ? 
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
	
</div>
		);
		
	}
	
}
const mapStateToProps = state => {
	return {profileDetails: state.authUser.profile,orders: state.authUser.orders,orderDetails: state.order.transactionDetails}
}
export default connect(mapStateToProps, { getUserProfile,getUserOrders,getOrderDetails })(Profile);
