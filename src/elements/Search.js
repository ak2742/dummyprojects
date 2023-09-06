import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Search(props) {
    const { me } = props;

    let mounted = useRef(false)

    const history = useHistory()
    const dispatch = useDispatch()

    let query = new URLSearchParams(useLocation().search).get('q')

    const { searchMe } = bindActionCreators(pAC, dispatch)

    let term = decodeURI(query).trim()
    const spaceRemove = term.split(/[ ]+/)
    term = spaceRemove.join(" ")

    const loadAll = () => {
        searchMe(term, new Date())
    }

    useEffect(() => {
        mounted.current = true
        if (term && term !== "" && term !== " ") {
            document.title = `${term}`
            loadAll()
        } else {
            history.push('/')
        }
        return () => { mounted.current = false }
        // eslint-disable-next-line 
    }, [useLocation()])

    const products = useSelector(state => state.prod)

    return (
        <>
            <h2 className='text-center'>{products.length === 0 && "!!! No Matches Found !!!"}</h2>
            <div className="row">
                {products.map((product) => {
                    let key = product?._id + product?.title + product?.description + product?.price + product?.image + product?.unit

                    return <Item key={key} id={product?._id} usr={product?.user} title={product?.title} desc={product?.description} price={product?.price} unit={product?.unit} img={product?.image} me={me} load_fn={loadAll} />
                })}
            </div>
        </>
    )
}

Search.defaultProps = {
    me: {}
}

Search.propTypes = {
    me: PropTypes.object
}

