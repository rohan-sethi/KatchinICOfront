const initialState = {
    plans: [],
    plan: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_PLANS' :
        return {
            ...state,
            plans: action.plans
        }
        case 'VIEW_PLAN':
        return {
            ...state,
            plan: action.plan
        }
       
        default:
            return state
    }
}