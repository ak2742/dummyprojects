import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'
import { useHistory, useLocation } from 'react-router-dom'

export default function Verify() {
    document.title = "Enter OTP to proceed"
    let mounted = useRef(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const { verifyMail, resendMail, newPass } = bindActionCreators(uAC, dispatch)
    let src = new URLSearchParams(useLocation().search).get('src')

    const [otp, setOtp] = useState("")
    const [time, setTime] = useState(120)

    const timer = () => {
        setTime((time) => { return time - 1 })
    }

    useEffect(() => {
        mounted.current = true
        let countdown = null
        if (localStorage.getItem("deauth") === null) {
            history.push('/')
        }
        if (time > 0) {
            countdown = setInterval(timer, 1000)
        }
        return () => {
            clearInterval(countdown)
            mounted.current = false
        }
        // eslint-disable-next-line
    }, [time])

    const onChange = (e) => {
        setOtp(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await verifyMail(otp)
        if (src === "resetpassword") {
            let pwd = window.prompt("Enter new password")
            await newPass(pwd)
        }
        history.push('/')
    }

    const resendOtp = async () => {
        await resendMail()
        setTime(120)
    }

    return (
        <div className="d-flex flex-column align-items-center text-center">
            <form onSubmit={onSubmit} style={{ "maxWidth": "700px" }}>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP here</label>
                    <input type="text" minLength="6" maxLength="6" title="Please enter a valid otp" value={otp} onChange={onChange} className="form-control" id="otp" name="otp" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="d-block">
                {time !== 0 ? <div className="text-primary my-3">request new otp in {time} seconds</div> :
                    <span className="btn btn-info btn-sm my-3" role="button" onClick={resendOtp}>Send new otp</span>}
            </div>
        </div>
    )
}

