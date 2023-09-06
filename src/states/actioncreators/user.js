import { store } from '../store'
const apis = require('../apis/user')

const check_err = async (res) => {
  if (res.error === undefined) {
    return res
  } else {
    alert(res.error.message || res.error)
    return res
  }
}

const loaded = (type, payload) => { return { type, payload } }

export const signup = (image, name, email, password, isBuyer, isSeller, description) => {
  return async (dispatch) => {
    let a = await apis.signupAPI({ image, name, email, password, isBuyer, isSeller, description })
    a = await check_err(a)
    dispatch(loaded("signup", a))
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    let a = await apis.loginAPI({ email, password })
    a = await check_err(a)
    dispatch(loaded("login", a))
  }
}

export const myAcc = () => {
  return async (dispatch) => {
    let a = await apis.myAccAPI()
    a = await check_err(a)
    dispatch(loaded("myAcc", a))
  }
}

export const findAcc = (id) => {
  return async (dispatch) => {
    let a = await apis.findAccAPI(id)
    a = await check_err(a)
    dispatch(loaded("findAcc", a))
  }
}

export const lastSeen = (obj) => {
  return async (dispatch) => {
    let lastState = store.getState().usr
    let users = [...lastState]
    users.forEach(usr => {
      if (usr._id === obj.id) {
        usr.lastActive = obj.status
      }
    });
    dispatch(loaded("lastSeen", users))
  }
}

export const editAcc = (image, name, description) => {
  return async (dispatch) => {
    let a = await apis.editAccAPI({ image, name, description })
    a = await check_err(a)
    dispatch(loaded("editAcc", a))
  }
}

export const lostPass = (email) => {
  return async (dispatch) => {
    let a = await apis.lostPassAPI(email)
    a = await check_err(a)
    dispatch(loaded("lostPass", a))
  }
}

export const newPass = (pwd) => {
  return async (dispatch) => {
    let a = await apis.newPassAPI(pwd)
    a = await check_err(a)
    dispatch(loaded("newPass", a))
  }
}

export const verifyMail = (otp) => {
  return async (dispatch) => {
    let a = await apis.verifyMailAPI(otp)
    a = await check_err(a)
    dispatch(loaded("verifyMail", a))
  }
}

export const resendMail = () => {
  return async (dispatch) => {
    let a = await apis.resendMailAPI()
    a = await check_err(a)
    dispatch(loaded("resendMail", a))
  }
}

export const logoutCall = () => {
  return (dispatch) => {
    dispatch(loaded("logout", ""))
  }
}

export const delAcc = (pwd) => {
  return async (dispatch) => {
    let a = await apis.delAccAPI(pwd)
    a = await check_err(a)
    dispatch(loaded("delAcc", a))
  }
}
