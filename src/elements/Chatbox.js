import React, { useState, useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { iAC } from '../states/index'
import './Chatbox.css';

export default function Inbox(props) {
  const { userid, user, chats, me, emitSocket } = props;

  const dispatch = useDispatch()
  const { listSentMsg } = bindActionCreators(iAC, dispatch)

  const ref = useRef(null);
  const [userChat, setUserChat] = useState([])
  const [msg, setMsg] = useState("")

  const updateUserChat = () => {
    let uc = chats.filter(e => e.from === userid || e.to === userid)
    setUserChat(uc)
  }

  const loadMore = () => {
    if (ref.current.scrollTop === 0) {
      let dt = new Date(userChat[0]?.createdAt)
      dt.setTime(dt.getTime() - 1)
      ref.current.scrollTo({ top: 50, behaviour: "smooth" })
      emitSocket("request-user-chat", { userID: userid, date: dt })
    }
  }
  const jumpBottom = () => {
    if (ref.current !== null) {
      let height = ref.current.scrollHeight
      ref.current.scrollTo({ top: height, behaviour: "smooth" })
    }
  }

  const onChange = (e) => setMsg(e.target.value)
  const sendBtn = (e) => {
    e.preventDefault()
    if (msg.trim() !== "") {
      let data = { to: userid, message: msg }
      emitSocket('send-msg', data)
      let id = new Date().toString()
      data.createdAt = id
      data._id = id
      data.from = me._id
      listSentMsg(data)
      setMsg("")
    }
  }

  useEffect(() => {
    if (chats.length !== 0) {
      updateUserChat()
    }
    // eslint-disable-next-line
  }, [chats])

  useEffect(() => {
    jumpBottom()
    if (ref.current !== null && userChat[0] !== undefined) {
      ref.current.addEventListener('scroll', loadMore)
    }
    // eslint-disable-next-line
  }, [userChat])

  return (
    <div className="mx-2" style={{ "width": "75em" }}>
      <div className="d-block bg-gradient bg-primary px-1">{user.name} ({user.lastActive})</div>
      <div ref={ref} className="bg-secondary bg-gradient" id="messages">
        {userChat.length === 0 ? <h4 className="text-center my-2">Start a chat with {user.name}</h4> : userChat.map((msg) => {
          return <p key={msg._id || `${msg.from}${msg.createdAt}`} style={{ "float": msg.from === userid ? "left" : "right", "clear": "both" }} className={`bg-gradient m-2 ${msg.from === userid ? "bg-primary text-light" : "bg-light"} rounded-pill p-1 px-2`}>{msg.message}</p>
        })}
      </div>
      <form className="d-flex justify-content-center bg-secondary" onSubmit={sendBtn}>
        <input className="rounded-pill m-1" style={{ "width": "56em" }} value={msg} onChange={onChange}></input>
        <button className="rounded-pill bg-dark text-light m-1" style={{ "lineHeight": "120%" }}>send</button>
      </form>
    </div>
  )
}
