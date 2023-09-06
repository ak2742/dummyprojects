import { combineReducers } from 'redux'
import userReducer from './user'
import prodReducer from './product'
import orderReducer from './order'
import accReducer from './account'
import tokenReducer from './token'
import inboxReducer from './inbox'

const reducers = combineReducers({
  token: tokenReducer,
  usr: userReducer,
  prod: prodReducer,
  cart: orderReducer,
  inbox: inboxReducer,
  me: accReducer,
})
export default reducers