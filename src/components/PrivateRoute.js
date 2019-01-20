import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}


















import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
var users = JSON.parse(localStorage.getItem('Auth'));
const  userToken =(users)?users[0].token:'';
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5001/api/"
let authSet='';

 axios.get(`${url}user/valid`, {headers: { 'Authorization': 'Bearer ' +userToken }}).then((res) => {
	 let plans = res.data
	 console.log('---------------auth check-----------')	
		authSet=plans.success;
		console.log(authSet)
	}).catch((err) => {
		authSet=false;	
		console.log(err)
	})


const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    authSet == true ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute; 