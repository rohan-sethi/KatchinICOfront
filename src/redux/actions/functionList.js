
	
	export function setSession (key,val){
		
		var getDataSession = window.sessionStorage.getItem("user_data_array");
		var getDataSessionJson = JSON.parse(getDataSession);
		getDataSessionJson[key] = val;		
		window.sessionStorage.setItem("user_data_array", JSON.stringify(getDataSessionJson));	
	}


	 export function getSession (key){	
		var getDataSession = window.sessionStorage.getItem("user_data_array");
		var getDataSessionJson = JSON.parse(getDataSession);
		return 	getDataSessionJson[key];
		
	}	
	



