const initialState = {
    orders: [],
    order: {},
    transactionDetails: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'CREATE_ORDERS' :
        return {
            ...state,
            orders: action.order
        }
        case 'VIEW_ORDER':
        return {
            ...state,
            orders: action.order
        }    
        case 'ORDER_TRANSACTION':
        return {
            ...state,
            transaction: action.transaction
        } 
        case 'ORDER_TRANSACTION_STATUS':
        return {
            ...state,
            transactionStatus: action.transactionStatus
        }  
		case 'GET_ORDERS_DETAILS':
        return {
            ...state,
            transactionDetails: action.transactionDetails
        } 		
        default:
            return state
    }
}