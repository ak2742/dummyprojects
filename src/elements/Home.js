import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Home(props) {
    const { me, token } = props;

    document.title = process.env.REACT_APP_NAME
    const dispatch = useDispatch()
    const history = useHistory()
    const { loadByID } = bindActionCreators(pAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        loadByID("all", new Date())
    }

    const products = useSelector(state => state.prod)

    useEffect(() => {
        mounted.current = true
        if (localStorage.getItem("deauth") !== null) {
            history.push('/verify')
        }
        loadAll()
        return () => { mounted.current = false }
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <h2 className='text-center'>{products.length === 0 && "!!! No Products Available !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = token + product?._id + product?.title + product?.description + product?.price + product?.image + product?.unit

                    return <Item key={key} id={product?._id} usr={product?.user} title={product?.title} desc={product?.description} price={product?.price} unit={product?.unit} img={product?.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </>
    )
}


Home.defaultProps = {
    me: {},
    token: null
}

Home.propTypes = {
    me: PropTypes.object,
    token: PropTypes.string
}
