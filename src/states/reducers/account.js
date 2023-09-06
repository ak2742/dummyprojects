const initialState = {}

const reducer = (state = initialState, action) => {
    let payload = action.payload
    if (payload?.error !== undefined) {
        return state
    } else {
        switch (action.type) {
            case "myAcc":
                return state = payload

            case "editAcc":
                return state = payload

            case "orderItem":
                if (payload.cart.error === undefined) {
                    let me = { ...state }
                    me.balance = me.balance - payload.price
                    return state = me
                } else {
                    return state
                }

            case "logout":
                return state = initialState

            case "delAcc":
                return state = initialState

            default:
                return state
        }
    }
}

export default reducer