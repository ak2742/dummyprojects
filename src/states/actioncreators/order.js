import { store } from '../store'
const apis = require('../apis/order')

const check_err = (res) => {
  if (res.error === undefined) {
    return res
  } else {
    alert(res.error.message || res.error)
    return res
  }
}

const loaded = (type, payload) => { return { type, payload } }

export const listInCart = (id) => {
  return async (dispatch) => {
    let a = await apis.listInCartAPI(id)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    a = await check_err(b)
    dispatch(loaded("listInCart", a))
  }
}

export const readCart = () => {
  return async (dispatch) => {
    let a = await apis.readCartAPI()
    a = await check_err(a)
    dispatch(loaded("readCart", a))
  }
}

export const orderItem = (id, n) => {
  return async (dispatch) => {
    let items = store.getState().prod
    let item = items.find(x => x._id === id)
    let a = await apis.orderItemAPI(id, n)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    a = await check_err(b)
    dispatch(loaded("orderItem", {cart: a, price: item?.price*n}))
  }
}

export const uncartItem = (id) => {
  return async (dispatch) => {
    let a = await apis.uncartItemAPI(id)
    let b = a
    if (a.error === undefined) {
      b = await apis.readCartAPI()
    }
    a = await check_err(b)
    dispatch(loaded("uncartItem", a))
  }
}
