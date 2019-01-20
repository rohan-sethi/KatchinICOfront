import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { userAuthenticated } from './../redux/actions/actions'


export default function(ComposedComponent) {
  class Authentication extends Component {
  
	constructor(props){
		super(props)	
		this.state ={authSet:'load'}
	}
  
    componentWillMount() {
		this.props.userAuthenticated()   
		
    }


    componentWillUpdate(nextProps, nextState) {	
			if (nextProps.authenticated && this.state.authSet == 'load') {	
				if(nextProps.authenticated!=undefined){
					this.setState({authSet:'welcome'})
				}else{
					this.setState({authSet:'login'})
					window.localStorage.clear('Auth');
					window.location = '/login';
				}			
			}
			
			if(nextProps.authenticated==undefined && this.state.authSet == 'load') {				
				this.setState({authSet:'login'})
				window.localStorage.clear('Auth');
				window.location = '/login';				
			}
			
		
    }

    render() {		
		
			if(this.state.authSet=='load'){				
				return <ComposedComponent {...this.props} />
			}
			if(this.state.authSet=='welcome'){				
				return <ComposedComponent {...this.props} />
			}
			
			if(this.state.authSet=='login'){				
				return <Redirect to='/login' />
			}
	  
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authUser.authenticated };
  }

  return connect(mapStateToProps,{ userAuthenticated })(Authentication);
}

