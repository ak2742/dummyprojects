import { store } from '../store'
const apis = require('../apis/user')
let openUser, users, inbox, me;

const loaded = (type, payload) => { return { type, payload } }

const getData = () => {
  me = store.getState().me
  let lastInbox = store.getState().inbox
  let lastUsers = store.getState().usr
  users = [...lastUsers]
  inbox = [...lastInbox]
}

const sortData = () => {
  inbox = inbox.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
  users = users.sort((a, b) => {
    let irev = [...inbox].reverse()
    return irev.findIndex(e => e.from === a._id || e.to === a._id) > irev.findIndex(e => e.from === b._id || e.to === b._id) ? 1 : -1
  })
}

export const listSentMsg = (msg) => {
  return async (dispatch) => {
    getData()
    inbox.push(msg)
    let i = users.findIndex(e => e._id === msg.to)
    if (i !== -1) { users[i].new = 0 }
    sortData()
    dispatch(loaded("listSentMsg", { inbox: inbox, users: users }))
  }
}

export const listOnMsg = (msgs, from) => {
  return async (dispatch) => {
    getData()
    if (from !== "") {
      let i = users.findIndex(e => e._id === from || e._id === from)
      if (i === -1) {
        let a = await apis.findAccAPI(from)
        if (!a.error) { users.push(a) }
      }
    }
    for (let msgi = 0; msgi < msgs.length; msgi++) {
      const msg = msgs[msgi];
      let i = inbox.findIndex(e => e._id === msg._id)
      if (i === -1) {
        inbox.push(msg)
        let n = users.findIndex(e => e._id === msg.from || e._id === msg.to)
        let _msgUsr = users[n]
        if (n === -1) {
          if (msg.to === me._id) {
            let a = await apis.findAccAPI(msg.from)
            if (!a.error) {
              users.push(a)
              _msgUsr = a
            }
          }
          if (msg.from === me._id) {
            let a = await apis.findAccAPI(msg.to)
            if (!a.error) {
              users.push(a)
              _msgUsr = a
            }
          }
        }
        if (openUser !== _msgUsr?._id && msg.from !== me._id && (msg.status === undefined || msg.status === "sent")) {
          _msgUsr.new = (_msgUsr.new || 0) + 1
        }
        else {
          _msgUsr.new = _msgUsr.new || 0
        }
      }
    }
    let inboxSet = new Set()
    inbox.forEach(msg => inboxSet.add(JSON.stringify(msg)))
    inbox = []
    inboxSet.forEach(msg => inbox.push(JSON.parse(msg)));
    sortData()
    dispatch(loaded("listOnMsg", { inbox: inbox, users: users }))
  }
}

export const msgStatusMod = (obj) => {
  return async (dispatch) => {
    getData()
    inbox.forEach(msg => {
      if (obj.user === msg.from || obj.user === "") {
        msg.status = obj.status
        if (obj.status === "read") {
          openUser = obj.user
          let useri = users.findIndex(e => e._id === msg.from || e._id === msg.to)
          if (useri !== -1) {
            users[useri].new = 0
          }
        } else {
          openUser = ""
        }
      }
    });
    dispatch(loaded("msgStatusMod", { inbox: inbox, users: users }))
  }
}
