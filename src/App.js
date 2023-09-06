import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC, iAC } from './states/index'
import Navbar from "./elements/Navbar";
import Err from "./elements/Err";
import Home from "./elements/Home";
import Idetails from './elements/Idetails';
import User from './elements/User';
import Sell from './elements/Sell';
import Buy from './elements/Buy';
import Login from './elements/Login';
import Signup from './elements/Signup';
import Cart from './elements/Cart';
import Search from './elements/Search';
import Account from './elements/Account';
import Inbox from './elements/Inbox';
import Verify from './elements/Verify';

function App() {
  const mounted = useRef(false)
  const dispatch = useDispatch()
  const { myAcc, lastSeen } = bindActionCreators(uAC, dispatch)
  const { listOnMsg } = bindActionCreators(iAC, dispatch)

  const me = useSelector(state => state.me)
  const users = useSelector(state => state.usr)
  const token = useSelector(state => state.token)
  const chats = useSelector(state => state.inbox)

  const socket = io(`http://${process.env.REACT_APP_HOST}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 15,
    auth: { token: token || "" }
  });

  const emitSocket = (x, y) => socket.emit(x, y)

  useEffect(() => {
    mounted.current = true
    if (token !== null) {
      localStorage.setItem("auth", token)
      socket.connect()
      if (me._id === undefined) {
        myAcc()
      }
    } else {
      socket.disconnect()
      localStorage.removeItem("auth")
    }
    socket.on('connect', () => {
      console.log("connected to chat");
      setTimeout(() => {
        socket.emit('request-inbox-users')
      }, 900);
    })
    socket.on('disconnect', () => { console.log("disconnected from chat"); })
    socket.on('user-joined', (usrid) => {
      users.forEach(user => {
        if (user._id === usrid) {
          lastSeen({ id: usrid, status: "active" })
        }
      })
    });
    socket.on('user-left', (usrid) => {
      users.forEach(user => {
        if (user._id === usrid) {
          lastSeen({ id: usrid, status: `${new Date()}` })
        }
      })
    });
    socket.on('recieved-data', (data) => {
      listOnMsg(data.history, data.from || "")
      socket.emit('recieved', data.from || "")
    })
    socket.on('recieved-msg', (data) => {
      data._id = new Date().toString()
      data.to = me._id
      listOnMsg([data], data.from)
      socket.emit('recieved', data.from)
    })

    return () => {
      socket.disconnect();
      mounted.current = false
    };
    // eslint-disable-next-line 
  }, [token, me])

  return (
    <Router>
      <Navbar me={me} token={token} chats={chats} />
      <div className="container my-3">
        <Switch>
          <Route exact path="/">
            <Home me={me} token={token} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
            <Signup />
          </Route>
          <Route exact path="/buy">
            <Buy me={me} />
          </Route>
          <Route exact path="/sell">
            <Sell me={me} />
          </Route>
          <Route exact path="/search">
            <Search me={me} />
          </Route>
          <Route exact path="/my/cart">
            <Cart me={me} />
          </Route>
          <Route exact path="/my/account">
            <Account me={me} />
          </Route>
          <Route exact path="/verify">
            <Verify />
          </Route>
          <Route exact path="/messages">
            <Inbox me={me} emitSocket={emitSocket} chats={chats} users={users} />
          </Route>
          <Route exact path="/:userID">
            <User me={me} />
          </Route>
          <Route exact path="/:userID/:productID">
            <Idetails me={me} />
          </Route>
          <Route>
            <Err />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
