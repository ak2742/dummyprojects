const apis = require('../apis/prod')

const check_err = (res) => {
  if (res.error === undefined) {
    return res
  } else {
    alert(res.error.message || res.error)
    return res
  }
}

const loaded = (type, payload) => { return { type, payload } }

export const loadByID = (id, date) => {
  return async (dispatch) => {
    let a = await apis.loadByIDAPI(id, date)
    a = await check_err(a)
    dispatch(loaded("loadByID", a))
  }
}

export const loadByUser = (id, date) => {
  return async (dispatch) => {
    let a = await apis.loadByUserAPI(id, date)
    a = await check_err(a)
    dispatch(loaded("loadByUser", a))
  }
}

export const loadByUserAuth = (id, date) => {
  return async (dispatch) => {
    let a = await apis.loadByUserAuthAPI(id, date)
    a = await check_err(a)
    dispatch(loaded("loadByUserAuth", a))
  }
}

export const searchMe = (term, date) => {
  return async (dispatch) => {
    let a = await apis.searchMeAPI(term, date)
    a = await check_err(a)
    dispatch(loaded("search", a))
  }
}

export const createNew = (image, title, description, category, price, unit) => {
  return async (dispatch) => {
    let a = await apis.createNewAPI({ image, title, description, category, price, unit })
    let b = a
    if (a.error === undefined) {
      b = await apis.loadByUserAuthAPI("me")
    }
    a = await check_err(b)
    dispatch(loaded("createNew", a))
  }
}

export const deleteOne = (id) => {
  return async (dispatch) => {
    let a = await apis.deleteOneAPI(id)
    a = await check_err(a)
    dispatch(loaded("deleteOne", a))
  }
}

export const editOne = (id, image, title, description, category, price, unit) => {
  return async (dispatch) => {
    let a = await apis.editOneAPI({ id, image, title, description, category, price, unit })
    a = await check_err(a)
    dispatch(loaded("editOne", a))
  }
}
