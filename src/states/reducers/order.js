const initialState = []

const reducer = (state = initialState, action) => {
     let payload = action.payload
     if (payload?.error !== undefined) {
          return state
     } else {
          switch (action.type) {
               case "listInCart":
                    return state = payload

               case "uncartItem":
                    return state = payload

               case "readCart":
                    return state = payload

               case "orderItem":
                    if (payload.cart.error === undefined) {
                         return state = payload.cart
                    } else {
                         return state
                    }

               case "logout":
                    return state = initialState

               case "delAcc":
                    return state = initialState

               default:
                    return state;
          }
     }
}

export default reducer