import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getPlan} from './../redux/actions/actions'
import Modal from 'react-modal'
import axios from 'axios'
import $ from 'jquery'
import {setSession,getSession} from './../redux/actions/functionList' 

Modal.setAppElement('#root')
const customStyles = {
  content : {
    //top                   : '100%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    //marginRight           : '-50%',
    transform             : 'translate(-50%, 0%)'
  }
};

class CoinToSwap extends Component {


constructor(props) {
    super(props);    
    this.state = {    
      modalIsOpen: false, data:'',haveData: false,modalIsOpenSeleted:false,
      fromImg:'https://shapeshift.io/images/coins/blackcoin.png',fromCoinType:'Blackcoin',toImg:'https://shapeshift.io/images/coins/ether.png',toCoinType:'ETH',amountPay:getSession('amountPay')
    };
 
    this.openModal = this.openModal.bind(this);
    this.openModalSelected = this.openModalSelected.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalSeleted = this.closeModalSeleted.bind(this);

    this.afterOpenModalToCoin=this.afterOpenModalToCoin.bind(this);
    this.swapCoinClick = this.swapCoinClick.bind(this);
    window.sessionStorage.setItem("counterAdd",0);
    setSession('user_have_coin','swap_coin')	
  }


swapCoinClick(e){

	e.preventDefault();
	 $('.validate_withdrawal_address').html('');
	 $('.validate_amount').html('');
	// validate all fields 
	this.refs.return_address.value.trim();
	this.refs.withdrawal_address.value.trim();
	this.refs.total_amount.value.trim();

	if(this.refs.withdrawal_address.value.trim()===''){		
		 $('.validate_withdrawal_address').html('<span style="color:red;">Enter the withdraw address.</span>');
		 this.refs.withdrawal_address.focus();
		 return false;
	}

	if(this.refs.total_amount.value.trim()===''){		
		 $('.validate_amount').html('<span style="color:red;">Enter the Amount.</span>');
		 this.refs.total_amount.focus();
		  return false;
	}

	// start api

	var coin_symbol = $('#setFromImg').attr('symbol');
	var coin_symbol1 = $('#setToImg').attr('symbol');
	var inputReturn = this.refs.return_address.value.trim(); 
	var inputWithdrawal = this.refs.withdrawal_address.value.trim(); //console.log(inputWithdrawal);
	var pair = coin_symbol+"_"+coin_symbol1; 
	$.cookie('swipcoin', coin_symbol);
	$.cookie('swipcoin_to', coin_symbol1);
	var dataJSON = { withdrawal: inputWithdrawal, pair: pair, returnAddress: inputReturn, destTag: "", rsAddress: "" };
	console.log(dataJSON);

		const url = `https://shapeshift.io/shift`

		 axios.post(`${url}`,dataJSON).then((res) => {
		 	//console.log('swapCoinClick')
		 	//console.log(res);
			var array = $.map(res.data, function(value, index) {
			     if(index === 'error'){
			     return value;
				}
			 });

		
		 var data =res.data;
         if(array === 'There was an error creating your order, please try again in a few minutes.'){
				alert(array); 
         }else{
         $.cookie('swapresult', JSON.stringify(data));
		 setSession('swapShiftRequest',data);	
         $('.converting').css('display', 'block');
         //console.log(data);    
		 
         $('.deposit').val(data.deposit);
         $('.depositType').val(data.depositType);
         $('.orderId').val(data.orderId);
         $('.returnAddress').val(data.returnAddress);
         $('.returnAddressType').val(data.returnAddressType);
         $('.withdrawal').val(data.withdrawal);$('.withdrawalType').val(data.withdrawalType);
		 
         var htmldata = "<div><b>Deposit : </b><span className='deposit'>"+data.deposit+"</span></div>"+
                    "<div><b>DepositType : </b><span className='depositType'>"+data.depositType+"</span></div>"+
                    "<div><b>OrderId : </b><span className='orderId'>"+data.orderId+"</span></div>"+
                    "<div><b>ReturnAddress : </b><span className='returnAddress'>"+data.returnAddress+"</span></div>"+
                    "<div><b>ReturnAddressType : </b><span className='returnAddressType'>"+data.returnAddressType+"</span></div>"+
                    "<div><b>Withdrawal : </b><span className='withdrawal'>"+data.withdrawal+"</span></div>"+
                    "<div><b>WithdrawalType : </b><span className='withdrawalType'>"+data.withdrawalType+"</span></div>";
		$('.convert').css('display', 'none');
		$('.converting').css('display', 'none');
		$('#my_search').val(data.deposit);
		$('.swapresult').html(htmldata);
		this.setState({'userID':'oooo'})
		 window.sessionStorage.setItem("resData",data.deposit );
         //this.checkPaymentRequest();

			 setInterval(this.checkPaymentRequest, 10000);


         this.getTransactionDetails(pair);	
		  	}	

    }).catch((err) => {
        console.log(err)
    })

	}

	checkPaymentRequest(){
		
	var data = window.sessionStorage.getItem("resData");
	//var counterAdd = window.sessionStorage.getItem("counterAdd");
	//var dir_uri = "https://financialnews.com/wp-content/themes/financialnews";
	//var pack_details = "Advocate";	
       $.get( "https://shapeshift.io/txStat/"+data, function( res ) {
		   setSession('swapTxStatReq',res);
       		//console.log('txStat')
       		//console.log(res)
           if(res.status === 'received'){//received
               $('.converted').css('display', 'block');               
                var swipcoin = $.cookie('swipcoin_to');
                window.sessionStorage.setItem("coinType", swipcoin);
                window.location = '/lock_conversion/'+window.sessionStorage.getItem("setPlanId");                 
               
           }else if(res.status === 'no_deposits'){//no_deposits
               console.log('no_deposits');      
              window.sessionStorage.setItem("counterAdd", parseInt(window.sessionStorage.getItem("counterAdd")) +1);
              $('#counter_count').text(window.sessionStorage.getItem("counterAdd"));
              $('#counter_status').text(res.status);              

           }
           //console.log(data);
       }, 'json');
                   
         


}

 getTransactionDetails(pair){

	const url = "https://shapeshift.io/marketinfo/"+pair

		 axios.get(`${url}`).then((data) => {
		 		//console.log('getTransactionDetails')
		 		//console.log(data);
		 		data =data.data;
	 	  		//swapresultRate = data;
                 //	var swapresult = $.cookie('swapresult');
                // $('.pair').val(data.pair);$('.rate').val(data.rate);$('.minerFee').val(data.minerFee);$('.limit').val(data.limit);$('.minimum').val(data.minimum);
               //  $('.maxLimit').val(data.maxLimit);
                 var htmldata = "<div><b>Pair : </b><span class='pair'>"+data.pair+"</span></div>"+
                            "<div><b>Rate : </b><span class='rate'>"+data.rate+"</span></div>"+
                            "<div><b>MinerFee : </b><span class='minerFee'>"+data.minerFee+"</span></div>"+
                            "<div><b>Limit : </b><span class='limit'>"+data.limit+"</span></div>"+
                            "<div><b>Minimum : </b><span class='minimum'>"+data.minimum+"</span></div>"+
                            "<div><b>MaxLimit : </b><span class='maxLimit'>"+data.maxLimit+"</span></div>";
                            //"<div><b>WithdrawalType : </b>"+data.withdrawalType+"</div>";
                    $('.swapresultRate').html(htmldata);
                    $('.swapresultRate').css('display', 'block');
                    $.cookie('active', 'true');                    
                    $.cookie('swapresultRate', data);                       
                    $('.depositTimer').css('display', 'block');



		 }).catch((err) => {
            console.log(err)
        })
	         
}


componentWillMount() {
	this.props.getPlan(this.props.match.params.id)    
	   setInterval( 
			console.log('hi')
			//this.setState({counterRequest:})
			 , 1000);
}


	openModal() {
	
    this.setState({modalIsOpen: true});

	const url = `https://shapeshift.io/getcoins`

		axios.get(`${url}`).then((res) => {
            let data = res.data
             this.setState({
                haveData: true,
                fetching: false,
                data
            })

			var peopleHTML='';   	
			for(var key in data){
	  		  if (data.hasOwnProperty(key)){
	      		  if(data[key]["name"] === 'Bitcoin'|| data[key]["name"] === 'Litecoin'|| data[key]["name"] === 'Ether'){
	         		   peopleHTML += '';
	        		}else{    
	          		  peopleHTML += "<div class='coinSelectorleft' symbol='"+ data[key]["symbol"] +"' alt='"+ data[key]["name"] +"'  imgPath='"+ data[key]["image"] +"'  style='width: 100px;cursor:pointer;'>";
	          		  peopleHTML += "<div id='coinSelectorleft'    onClick={this.clickSelectFromCoin}  coin-imageSmall='"+ data[key]["imageSmall"] +"' coin-name='"+ data[key]["name"] +"' coin-symbol='"+ data[key]["symbol"] +"' coin-status='"+ data[key]["status"] +"' coin-image='"+ data[key]["image"] +"'><img src='" + data[key]["image"] + "' ></div>";           
	           		 peopleHTML += "<div   >"+ data[key]["name"] +"</div>";
	          		  peopleHTML += "</div>";
	            		//dataArr += data[key]["name"];
	       		 }
	 		   }
    
			}	
  		
			$('#modal-body').html(peopleHTML);
   		

        }).catch((err) => {
            console.log(err)
        })
     

  }
 
  openModalSelected(){
 	this.setState({modalIsOpenSeleted: true});
 	const url = `https://shapeshift.io/getcoins`
	 axios.get(`${url}`)
        .then((res) => {
            let data = res.data        

          var seletedHTML='';   	
         for(var key in data){
	  		  if (data.hasOwnProperty(key)){
	      		  if(data[key]["name"] === 'Bitcoin'|| data[key]["name"] === 'Litecoin'|| data[key]["name"] === 'Ether'){
	         		   
	          		  seletedHTML += "<div className='coinSelectorleft' symbol='"+ data[key]["symbol"] +"' alt='"+ data[key]["name"] +"'  imgPath='"+ data[key]["image"] +"'  style='width: 100px;cursor:pointer;'>";
	          		  seletedHTML += "<div  onClick={this.clickSelectToCoin}    coin-imageSmall='"+ data[key]["imageSmall"] +"' coin-name='"+ data[key]["name"] +"' coin-symbol='"+ data[key]["symbol"] +"' coin-status='"+ data[key]["status"] +"' coin-image='"+ data[key]["image"] +"'><img  symbol='"+ data[key]["symbol"] +"'  alt='"+ data[key]["name"] +"'  src='" + data[key]["image"] + "' ></div>";           
	           		  seletedHTML += "<div className='coinToCoin' >"+ data[key]["name"] +"</div>";
	          		  seletedHTML += "</div>";
	            		//dataArr += data[key]["name"];
	       		 }
	 		   }
    
  		}	

    $('#modal-body_selected').html(seletedHTML);

        }).catch((err) => {
            console.log(err)
        })

  }


  afterOpenModal() { 

	 $( "#modal-body" ).on( "click", ".coinSelectorleft", function(e) {
	 	  $('#setFromImg').attr('src', $( this ).attr('imgPath'));
	 	   $('#setFromImg').attr('symbol', $( this ).attr('symbol'));
		  $('#setFromCoinName').text($(this).attr('alt'))			
		  $( "#fromClose" ).trigger( "click" );

	});

  }

 afterOpenModalToCoin() {

	 $(".ReactModalPortal").on( "click", "img", function(e) {	 	 	
	 	  console.log( $(this).attr('src') );	
	 	  $('#setToImg').attr('src', $(this).attr('src'));
	 	  $('#setToImg').attr('symbol', $( this ).attr('symbol'));
		  $('#setToCoinName').text($(this).attr('alt'))	
		  $( "#toClose" ).trigger( "click" );

	});

  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

 closeModalSeleted() {
    this.setState({modalIsOpenSeleted: false});
  }

render() {

	//var {  range_start, range_end } = this.props.CoinToSwap
		var  range_start  = getSession('range_start')
		var  range_end  = getSession('range_end')
		var amountPay = getSession('amountPay')

	    let planId =window.sessionStorage.getItem("setPlanId");
		console.log(planId);
	  // let counter_start =window.sessionStorage.getItem("counterAdd");


return (
<div>
	<div className="col-md-12 mainContent" >
		<div className="col-md-12 capital nop" >
			<div className="col-md-3 price_bg_capital text-center">
				<h4 className="text-uppercase">﻿﻿Early Adopter</h4>
				<h4 className="text-uppercase dollar_price">﻿﻿${range_start}.00 - ${range_end}.00</h4>
			</div>
			<div className="col-md-9">
				<p className="green_two">﻿﻿<span>$</span>{amountPay}.00 <span className="new_green">﻿(<span className="main_green">203%</span> Increase in 1 year)</span> </p>
			</div>
		</div>
		Total send request :<span id='counter_count'></span>
		<br/>
		Current Status :<span id='counter_status'></span>

		

		<div className="VideoContentOuter_container capital_btn list-inline center-block mt30"></div>

		<div className="col-md-12 mt30">
			<div className="video-steps mt20"><h1 className="robotoslab text-center text-uppercase text-thin main-title">﻿﻿﻿SELECT coin to <strong>swap</strong></h1></div>
		</div>
		<div className="clearfix"> </div>
		<div className="col-md-6 col-md-offset-3 mt20">
			<div className="col-md-5" onClick={this.openModal} >
				<img  symbol="BTC" id="setFromImg" src={this.state.fromImg} alt={this.state.fromCoinType} className="img-responsive center-block" />
				<p id="setFromCoinName" className="fs16 text-center mt10">BITCOIN</p>
			</div>
			<div className="col-md-2 mt40">
			<img src="assets/images/swap_button.jpg" alt="" className="img-responsive center-block" /> </div>
			<div className="col-md-5" onClick={this.openModalSelected} >
				<img symbol="ETH" id="setToImg" src={this.state.toImg} alt={this.state.toCoinType} className="img-responsive center-block" />
				<p id="setToCoinName" className="fs16 text-center mt10">Etherium</p>
			</div>
		</div>


		<div className="col-md-6 col-md-offset-3 mt20">
			<div className="col-md-5">
			<label className="modal-title" id="exampleModalLabel">Return Address</label>
			<input type="text" className="inputReturn" id="" ref="return_address" style={{width: '100%',height: '35px'}} />
			</div>

			<div className="col-md-5">
			<label className="modal-title" id="exampleModalLabel">Withdrawal Address</label>
			<input type="text" className="inputWithdrawal" id="" ref="withdrawal_address" style={{width: '100%',height: '35px'}} required="required" />
			<p className="validate_withdrawal_address"></p>
			</div>
		</div>


		<div className="col-md-6 col-md-offset-3 mt20" style={{margintop: '15px'}} >
			<label className="modal-title control-label" id="exampleModalLabel" >Amount </label>
			<input type="text" className="inputWithdrawal" value={this.state.amountPay} ref="total_amount" style={{width:'92%',height:'35px'}} />
			<p className="modal-title control-label swipecointotal validate_amount" id="swipecointotal"></p>
		</div>
	

		
		<div className="col-md-12 " >
		
			
		<div className="btnLeft pull-left"><a href="javascript: window.history.go(-1)" ><img src="assets/images/prev.jpg" width="270" height="92" /></a></div>
		
			<div className="btnLeft pull-right" style={{marginRight:'36%',paddingTop: '2%'}}>
			<img src="assets/images/arro_one_left.png" alt="arrow" style={{marginLeft:'10px'}} />
			<span className="lock_btn"><a onClick={this.swapCoinClick} > SWAP COIN </a></span>
			<img src="assets/images/arro_one_right.png" alt="right" style={{marginLeft:'10px'}} />
			</div>
		
		
		</div>
	</div>

  		<Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal}   onRequestClose={this.closeModal} style={customStyles}  contentLabel="Example Modal" >
    		<button onClick={this.closeModal}  id="fromClose">close</button>
			<div className="modal-body" id="modal-body"></div>
        </Modal>

        <Modal isOpen={this.state.modalIsOpenSeleted}  onAfterOpen={this.afterOpenModalToCoin}   onRequestClose={this.closeModalSeleted} style={customStyles}  contentLabel="Example Modal" >
    		<button onClick={this.closeModalSeleted} id="toClose"  >close</button>
			<div className="modal-body" id="modal-body_selected" ></div>
        </Modal>
        <div className="col-md-8 text-center col-md-offset-2 convert" style={{display:'none'}}>
	            <p className="converted_detail text-center">Send to this Address </p>
	        <div className="input-group" >	            
	            <input type="text" className="form-control my_search" id="my_search" />
	            <div className="input-group-btn">
	                <button className="btn btn-default my_new_btn" id="my_new_btn" type="submit" > <img src="https://financialnews.com/wp-content/themes/financialnews/images/coyp_button.png" /> </button>
	            </div>
	        </div>
	    </div>
    	         
        <div className="col-md-8 col-md-offset-4 mt40 swapresult" >  </div>
        <div className="col-md-8 col-md-offset-4 mt40 swapresultRate" >  </div>
</div> 
);

}
}

const mapStateToProps = state => {
	return {CoinToSwap: state.plans.plan}
}
export default connect(mapStateToProps, { getPlan })(CoinToSwap);


