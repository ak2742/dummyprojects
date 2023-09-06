import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC, uAC, cAC } from '../states/index'

export default function Idetails(props) {
    const { me } = props;

    let mounted = useRef(false)

    const { userID, productID } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()

    const { loadByID, deleteOne, editOne } = bindActionCreators(pAC, dispatch)
    const { listInCart, orderItem, readCart } = bindActionCreators(cAC, dispatch)
    const { findAcc } = bindActionCreators(uAC, dispatch)

    const [units, setUnits] = useState(1)

    const onChange = (e) => {
        setUnits(e.target.value)
    }

    const items = useSelector(state => state.prod)
    const usrs = useSelector(state => state.usr)
    const cart = useSelector(state  => state.cart)
    const item = items[0] || {}
    const usr = usrs[0] || {}

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("auth") !== null) {
            readCart()
        }
        loadByID(productID, new Date())
        findAcc(userID)
        return () => { mounted.current = false }
        // eslint-disable-next-line
    }, [])

    let my = false
    let in_cart = false
    if (userID === me?._id) {
        my = true
    } else {
        cart.forEach(element => {
            if (element?._id === productID) {
                in_cart = true
            }
        });
    }
    if (in_cart === true) {
        document.getElementById('addC')?.classList.add("d-none")
    }

    const isTrue = (q) => {
        if (q === "isBuyer") {
            if (me.isBuyer) {
                return ""
            } else {
                return "d-none"
            }
        }
    }

    const editMe = async () => {
        const eImage = await prompt("Image URL", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        await editOne(productID, eImage, eTitle, eDesc, eCtgry, ePrice)
        await loadByID(productID, new Date())
        alert("updated successfully")
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            await deleteOne(productID)
            history.push('/')
        }
    }
    const add2Cart = async () => {
        await listInCart(productID)
        document.getElementById('addC').classList.add('d-none')
    }
    const order2Get = async (e) => {
        e.preventDefault()
        await orderItem(productID, units)
    }
    const goToUser = () => {
        history.push(`/${usr?._id}`)
    }

    if (item.title !== undefined && usr.name !== undefined) {
        document.title = `${item.title} - ${usr.name}`
    } else {
        document.title = process.env.REACT_APP_NAME
    }

    return (
        <div className="d-flex justify-content-center">
            {usr.name === undefined || item.title === undefined ? <h2 className='text-center'>!!! Incorrect URL !!!</h2> :
                <div className="card bg-info border-primary my-5 mx-2">
                    <img src={item?.image} className="card-img-top" style={{ "maxHeight": "500px" }} alt={item?.title} />
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title"><strong>{item?.title}</strong> by <strong role="button" onClick={goToUser}>{usr?.name}</strong></h5>
                            {!my ?
                                <>
                                    <span role="button" id="addC"
                                        className={`badge bg-success mx-2 ${isTrue("isBuyer")}`}
                                        onClick={add2Cart}> ADD to cart <i className="fas fa-cart-plus"></i></span>
                                </> : <>
                                    <i role="button" className="fas fa-edit mx-2" onClick={editMe} ></i>
                                    <i role="button" className="fas fa-trash mx-2" onClick={deleteMe} ></i>
                                </>}
                        </div>
                        <h6 className="card-subtitle mb-2 d-inline">{item?.category}</h6>
                        <h6 className="card-subtitle mb-2 d-inline"> | Cost - INR {item.price ? item.price : 0} per {item.unit==="n"?"unit":`${item.unit}`} | </h6>
                        <h6 className="card-subtitle mb-2 d-inline">Sold - {item.sold ? item.sold : 0} {item.unit}{item.sold > 1 ? "s" : ""}</h6>
                        {my ? "" :
                            <form className={`mt-2 row ${isTrue("isBuyer")}`} onSubmit={order2Get}>
                                <div className="col-md-1 text-end lh-lg">
                                    <label htmlFor="price" className="form-label">units</label>
                                </div>
                                <div className="col-md-2">
                                    <input type="number" min="1" title="Please enter a valid value" value={units} onChange={onChange} className="form-control form-control-sm" id="units" name="units" />
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-primary btn-sm">Buy</button>
                                </div>
                            </form>
                        }
                        <p className="card-text">{item?.description}</p>

                    </div>
                </div>}
        </div>
    )
}


Idetails.defaultProps = {
    me: {}
}

Idetails.propTypes = {
    me: PropTypes.object
}
