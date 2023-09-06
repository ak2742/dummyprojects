const initialState = []

const reducer = (state = initialState, action) => {
    if (action.payload?.error !== undefined) {
        return state
    } else {
        switch (action.type) {
            case "findAcc":
                return state = [action.payload]

            case "listOnMsg":
                return state = action.payload.users

            case "listSentMsg":
                return state = action.payload.users

            case "msgStatusMod":
                return state = action.payload.users

            case "lastSeen":
                return state = action.payload

            default:
                return state;
        }
    }
}

export default reducer