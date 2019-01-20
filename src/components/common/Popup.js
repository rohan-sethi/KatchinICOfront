import React, { Component } from 'react';
import {setSession,getSession} from '../../redux/actions/functionList' 

class Popup extends React.Component {
  render() {
        let show='block'

    if(getSession('twoFactorShow')=='yes'){
      show='none';
    }
  //  let show=''
//alert(getSession('twoFactorShow'))
    return (    
    <div className="modal" id="myModal" style={{display:show}} role="dialog">
      <div className="modal-dialog">
      
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Message </h4>
          </div>
          <div className="modal-body">
             <h3>If you want 2FA Please click ok </h3>
          </div>
          <div className="modal-footer">
           
            <button type="button" onClick={this.props.closePopup} className="btn btn-default" data-dismiss="modal">Close</button>
          <a className="save btn" style={{textdecoration:'none',color:'#000'}} href="/qrcode"  >OK</a>
          </div>
        </div>
        
      </div>
    </div>





    );
  }
}

export default Popup;