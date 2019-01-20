import { combineReducers } from 'redux';
import articles from './reducers/articles';
import plans from './reducers/plans';
import authUser from './reducers/authUser';
import common from './reducers/common';
import order from './reducers/order';
import { routerReducer } from 'react-router-redux';



export default combineReducers({
  order,
  articles,
  plans,
  authUser,
  common,
  router: routerReducer
});
