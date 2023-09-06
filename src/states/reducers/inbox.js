const initialState = []

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "listOnMsg":
            return state = action.payload.inbox
            
        case "listSentMsg":
            return state = action.payload.inbox
            
        case "msgStatusMod":
            return state = action.payload.inbox
            
        default:
            return state
    }
}

export default reducer