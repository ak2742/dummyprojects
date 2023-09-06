const initialState = localStorage.getItem("auth")

const reducer = (state = initialState, action) => {
    if (action.payload?.error !== undefined) {
        return state
    } else {
        switch (action.type) {
            case "signup":
                localStorage.setItem("deauth", action.payload.token)
                return state = null

            case "login":
                if (!action.payload.success) {
                    localStorage.setItem("deauth", action.payload.token)
                    return state = null
                } else {
                    localStorage.removeItem("deauth")
                    return state = action.payload.token
                }

            case "lostPass":
                localStorage.setItem("deauth", action.payload.token)
                return state = null

            case "verifyMail":
                localStorage.removeItem("deauth")
                return state = action.payload.token

            case "resendMail":
                localStorage.setItem("deauth", action.payload.token)
                return state = null

            case "logout":
                return state = null

            case "delAcc":
                return state = null

            default:
                return state;
        }
    }
}

export default reducer