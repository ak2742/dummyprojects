import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uAC } from '../states/index'

export default function Account(props) {
    const { me } = props;

    document.title = "My Account"
    const dispatch = useDispatch()
    const history = useHistory()
    const { delAcc, editAcc, logoutCall } = bindActionCreators(uAC, dispatch)

    useEffect(() => {
        if (localStorage.getItem("auth") === null) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [me])

    const public_acc = () => {
        history.push(`/${!me._id ? "" : me._id}`)
    }
    const editMe = async () => {
        const image = await prompt("Image URL", "")
        const name = await prompt("Name", "")
        const desc = await prompt("Description", "")
        await editAcc(image, name, desc)
    }

    const logout = async () => {
        await logoutCall()
        history.push('/?src=logout')
    }
    const deleteAcc = async () => {
        const pwd = prompt("Enter your password")
        await delAcc(pwd)
        history.push('/?src=removeAcc')
    }
    return (
        <>
            {me._id ? <div className="text-center">
                <div className="d-flex">
                    <div className="my-3">
                        <img src={me?.image} height="150px" width="150px" className="img-thumbnail" alt={me?.name}></img>
                    </div>
                    <table className="table mx-3">
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td><span role="button" onClick={public_acc}>{me?._id}</span></td>
                            </tr>
                            <tr>
                                <th scope="row">Name</th>
                                <td>{me?.name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{me?.email}</td>
                            </tr>
                            <tr>
                                <th scope="row">Role</th>
                                <td>{me.isBuyer ? " {Buyer} " : ""}{me.isSeller ? " {Seller} " : ""}</td>
                            </tr>
                            <tr>
                                <th scope="row">Balance</th>
                                <td><p className="badge bg-primary">{!me.balance ? "0" : me.balance}</p></td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{me?.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-primary mx-5 my-1" onClick={public_acc}>Public View</button>
                <button className="btn btn-success mx-5 my-1" onClick={editMe}>Edit Account</button>
                <button className="btn btn-outline-success mx-5 my-1" onClick={logout}>LogOut</button>
                <button className="btn btn-danger mx-5 my-1" onClick={deleteAcc}>Delete Account</button>
            </div>
                : <h2 className="text-center">Could not fetch details. Please try again.</h2>}
        </>
    )
}


Account.defaultProps = {
    me: {}
}

Account.propTypes = {
    me: PropTypes.object
}

