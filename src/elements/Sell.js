import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'
import { useHistory } from 'react-router'

export default function Sell(props) {
    const { me } = props;

    let mounted = useRef(false)

    document.title = "Sell Products"
    const history = useHistory()
    const dispatch = useDispatch()

    const { loadByUserAuth, createNew } = bindActionCreators(pAC, dispatch)

    const loadAll = () => {
        loadByUserAuth("me", new Date())
    }

    const products = useSelector(state => state.prod)

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("auth") !== null) {
            if (me.isSeller !== "false") {
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


    const initState = { image: "", title: "", description: "", category: "", price: "", unit:"" }
    const [credentials, setCredentials] = useState(initState)
    const [myImageTitle, setMyImageTitle] = useState("")

    const onChange = (e) => {
        if (e.target.name === "image") {
            setMyImageTitle(e.target.value)
            let reader = new FileReader();
            let file = e.target.files[0];
            if ((file.size/1000)>3000) {
                window.alert("file too large.")
            }
            reader.onloadend = () => {
                const data = JSON.stringify(reader.result)
                setCredentials({ ...credentials, [e.target.name]: data })
            }
            reader.readAsDataURL(file)
        }
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (credentials.unit === "") {
            credentials.unit = "n"
        }
        await createNew(credentials.image, credentials.title, credentials.description, credentials.category, credentials.price, credentials.unit)
        setCredentials(initState)
        setMyImageTitle("")
    }

    return (
        <>
            <form className="row" onSubmit={onSubmit} >
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength="3" maxLength="100" title="Please enter a valid value" value={credentials.title} onChange={onChange} className="form-control" id="title" name="title" required />
                </div>
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea minLength="5" maxLength="350" title="Please enter a valid value" value={credentials.description} onChange={onChange} className="form-control" id="description" name="description" rows="3" required></textarea>
                </div>
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" maxLength="15" title="Please enter a valid value" value={credentials.category} onChange={onChange} className="form-control" id="category" name="category" />
                </div>
                <div className="mb-3 col-md-3 offset-md-3">
                    <label htmlFor="price" className="form-label">Price (INR)</label>
                    <input type="text" pattern="[0-9]{1,6}" title="Please enter a valid value" value={credentials.price} onChange={onChange} className="form-control" id="price" name="price" />
                </div>
                <div className="mb-3 col-md-3">
                    <label htmlFor="unit" className="form-label">per (unit)</label>
                    <input type="text" title="Please enter a valid value" value={credentials.unit} onChange={onChange} placeholder="optional" className="form-control" id="unit" name="unit" />
                </div>
                <div className="mb-3 col-md-6 offset-md-3">
                    <label htmlFor="image" className="form-label">Image (.png/.jpeg)</label>
                    <input type="file" accept="image/jpeg, image/png" value={myImageTitle} onChange={(e) => { onChange(e) }} className="form-control" id="image" name="image" />
                </div>
                <button type="submit" className="btn btn-success col-md-2 offset-md-5">Publish</button>
            </form>
            <div className="row my-3">
                <h2 className='text-center'>{products.length === 0 && "!!! Add products to see here !!!"}</h2>
                {products.map((product) => {
                    let key = product?._id + product?.title + product?.description + product?.price + product?.image + product?.unit

                    return <Item key={key} usr={product?.user} id={product?._id} title={product?.title} desc={product?.description} price={product?.price} unit={product?.unit} img={product?.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </>
    )
}


Sell.defaultProps = {
    me: {}
}

Sell.propTypes = {
    me: PropTypes.object
}
