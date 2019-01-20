import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {

constructor(props){

	super(props)
	this.state = {
			username:''			
		}

}

 
render() {
	
		var LoginLink='';		
		 var users = JSON.parse(localStorage.getItem('Auth'));	
			
		 if(users){
			 var username = users[0].email;
				LoginLink = <div style={{float:'right',fontSize:'15px',fontWeight:'800'}}> Welcome : <a href="profile">{username.toUpperCase()}</a> <a href="logout"> <img src="assets/img/logout.png" width="100" height="82" /></a></div>
		 }
 
	return (
		<div>
		<div className="col-md-12 raleway video_tag" >

		{LoginLink}
            <p>Worried you've missed out on the rising crypto market?</p>
			{/* <Link to = "/profile">
				<i class='fas fa-user'></i>
        	</Link> */}
            <h1 className="robotoslab">The Crypto revolution has arrived…</h1>
            <h3 className="robotoslab">and it is just beginning</h3>
        </div>
        <div className="col-md-12 vidow_frame mt20 mb50">
           
		    <iframe width="100%" height="530" src="https://www.youtube.com/embed/kubGCSj5y3k"  allow="autoplay; encrypted-media" ></iframe> 
           
        </div>
        </div>

	)
}

}
export default Header;