const initialState = []

const reducer = (state = initialState, action) => {
     if (action.payload?.error !== undefined) {
          return state
     } else {
          switch (action.type) {
               case "loadByID":
                    return state = action.payload

               case "loadByUser":
                    return state = action.payload

               case "loadByUserAuth":
                    return state = action.payload

               case "createNew":
                    return state = action.payload

               case "search":
                    return state = action.payload

               default:
                    return state;
          }
     }
}

export default reducer