import * as actionTypes from "./actions"

const initialState = {
    token: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.token,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
            }
        default:
            return state
    }
}

export default reducer
