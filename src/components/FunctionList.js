
	
	export setSession function(key,val){
		
		var getDataSession = window.sessionStorage.getItem("user_data_array");
		var getDataSessionJson = JSON.parse(getDataSession);
		var arrTypeData=['coinPayTranCreateReq','coinPayPaymentReceiveReq','swapShiftRequest','swapTxStatReq']
		var requestSetArr=[];
		if(arrTypeData.indexOf(key) >= 0){
			requestSetArr =getDataSessionJson.key;
			requestSetArr.push(val);
			getDataSessionJson.key = requestSetArr;
		}else{
			getDataSessionJson.key = val;	
		}
			
		
		window.sessionStorage.setItem("user_data_array", JSON.stringify(getDataSessionJson));	
	}


	 export getSession function(key){	
		var getDataSession = window.sessionStorage.getItem("user_data_array");
		var getDataSessionJson = JSON.parse(getDataSession);
		return 	getDataSessionJson.key;
		
	}	
	



