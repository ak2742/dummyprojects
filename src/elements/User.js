import React, { useEffect, useRef } from 'react'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { uAC, pAC } from '../states/index'

export default function User(props) {
    const {me} = props

    const { userID } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { loadByUser } = bindActionCreators(pAC, dispatch)
    const { findAcc } = bindActionCreators(uAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        loadByUser(userID, new Date())
    }

    const usrs = useSelector(state => state.usr)
    const usr = usrs[0] || {}
    const products = useSelector(state => state.prod)

    useEffect(() => {
        mounted.current = true
        findAcc(userID)
        loadAll()

        return () => { mounted.current = false }
        // eslint-disable-next-line
    }, [])

    const chatbox = () => {
        history.push(`/messages?m=${userID}`)
    }

    if (usr?.name !== undefined) {
        document.title = `${usr.name}`
    } else {
        document.title = process.env.REACT_APP_NAME
    }

    return (
        <>
            {usr.name === undefined ? <h2 className='text-center'>invalid user ID</h2> :
                <div className="container my-3">
                    <div className="d-flex text-center">
                        <div className="my-3">
                            <img src={usr?.image} height="150px" width="150px" className="img-thumbnail" alt={usr?.name}></img>
                            <button className={`btn btn-success mx-5 my-1 ${me._id === userID && "d-none"}`} onClick={chatbox}>Chat with {usr.name}</button>
                        </div>
                        <table className="table mx-3">
                            <tbody>
                                <tr>
                                    <th scope="row">ID</th>
                                    <td>{usr?._id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{usr?.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Role</th>
                                    <td>{!usr.isBuyer ? "" : " {Buyer} "}{!usr.isSeller ? "" : " {Seller} "}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{usr?.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className='text-center'>{products.length === 0 && "!!! No products to show !!!"}</h2>
                    <div className="row">
                        {products.map((product) => {
                            let key = product?._id + product?.title + product?.description + product?.price + product?.image + product?.unit

                            return <Item key={key} usr={product?.user} id={product?._id} title={product?.title} desc={product?.description} price={product?.price} unit={product?.unit} img={product?.image} me={{ _id: "" }} load_fn={loadAll} />
                        })}
                    </div>
                </div>}
        </>
    )
}

