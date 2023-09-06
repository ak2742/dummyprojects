import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { cAC } from '../states/index'

export default function Cart(props) {
    const { me } = props;

    document.title = "My Cart"
    const history = useHistory()
    const dispatch = useDispatch()
    const { readCart, uncartItem } = bindActionCreators(cAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        readCart()
    }

    const myCart = useSelector(state => state.cart)

    const openMe = async (item) => {
        history.push(`/${item.user}/${item._id}`)
    }
    const uncartMe = async (ID) => {
        await uncartItem(ID)
    }

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("auth") !== null) {
            if (me.isBuyer !== "false") {
                loadAll()
            } else {
                history.push('/')
            }
        } else {
            history.push('/')
        }
        return () => { mounted.current = false }
        // eslint-disable-next-line   
    }, [])

    return (
        <>
            <h2 className='text-center'>{myCart.length === 0 && "!!! Nothing in Cart !!!"}</h2>
            <ul className="list-group">
                {myCart.map((item) => {
                    let key = item?._id + item?.title + item?.description

                    return <li className="list-group-item my-1 rounded bg-info border-primary justify-content-between align-items-start d-flex" key={key}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold d-inline" role="button" onClick={() => { openMe(item) }}>{item?.title}</div>
                            <div className="my-2">{item?.description}</div>
                            <button className="btn btn-sm btn-primary" onClick={() => { openMe(item) }}>open</button>
                        </div>
                        <span role="button" className="badge bg-danger mx-2" onClick={() => { uncartMe(item?._id) }}> REMOVE from cart <i className="fas fa-cart-arrow-down"></i></span>
                    </li>
                })}
            </ul>
        </>
    )
}


Cart.defaultProps = {
    me: {}
}

Cart.propTypes = {
    me: PropTypes.object
}

