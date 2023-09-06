import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'
import { useHistory } from 'react-router'

export default function Buy(props) {
    const { me } = props;

    document.title = "Buy Products"
    const history = useHistory()
    const dispatch = useDispatch()
    const { loadByUserAuth } = bindActionCreators(pAC, dispatch)

    let mounted = useRef(false)

    const loadAll = () => {
        loadByUserAuth("oth", new Date())
    }

    const products = useSelector(state => state.prod)

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
            <h2 className='text-center'>{products.length === 0 && "!!! Nothing to Buy !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = product?._id + product?.title + product?.description + product?.price + product?.image

                    return <Item key={key} usr={product?.user} id={product?._id} title={product?.title} desc={product?.description} price={product?.price} unit={product?.unit} img={product?.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </>
    )
}


Buy.defaultProps = {
    me: {}
}

Buy.propTypes = {
    me: PropTypes.object
}
