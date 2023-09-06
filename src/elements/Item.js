import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pAC } from '../states/index'

export default function Item(props) {
    const dispatch = useDispatch()
    const { deleteOne, editOne } = bindActionCreators(pAC, dispatch)

    let [my, setMy] = useState(false)

    useEffect(() => {
        if (props.usr === props.me._id) {
            setMy(true)
        } else {
            setMy(false)
        }
        // eslint-disable-next-line
    }, [props])

    const editMe = async () => {
        const eImage = await prompt("Image URL", "")
        const eTitle = await prompt("Title", "")
        const eDesc = await prompt("Description", "")
        const eCtgry = await prompt("Category", "")
        const ePrice = await prompt("Price", "")
        const eUnit = await prompt("Unit", "")
        await editOne(props.id, eImage, eTitle, eDesc, eCtgry, ePrice, eUnit)
        await props.load_fn()
        alert("updated successfully")
    }
    const deleteMe = async () => {
        const confirmed = await window.confirm("Do you really want to delete this item")
        if (confirmed) {
            await deleteOne(props.id)
            await props.load_fn()
        }
    }
    return (
        <div className="col-md-3" key={props}>
            <div className="card bg-info border-primary my-2 mx-2" style={{ "width": "18rem" }}>
                <img src={props.img} className="card-img-top" style={{ "height": "160px" }} alt={props.title} />
                <div className="card-body">
                    {my ? <div className="d-flex align-items-center">
                        <h5 className="card-title">{props.title}</h5>
                        <i role="button"
                            className="fas fa-edit mx-2"
                            onClick={editMe}
                        ></i>
                        <i role="button"
                            className="fas fa-trash mx-2"
                            onClick={deleteMe}
                        ></i>
                    </div> : <h5 className="card-title">{props.title}</h5>
                    }
                    <h6 className="card-subtitle mb-2">INR {props.price} {props.unit==="n"?"":`/ ${props.unit}`}</h6>
                    <p className="card-text">{props.desc}</p>

                    <Link to={`/${props.usr}/${props.id}`} className="btn btn-primary">Open</Link>
                </div>
            </div>
        </div>
    )
}

Item.defaultProps = {
    id: "",
    title: "",
    desc: "",
    price: 0,
    unit: "",
    img: "",
    me: {},
    usr: "",
    load_fn: () => { }
}

Item.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.number,
    unit: PropTypes.string,
    img: PropTypes.string,
    me: PropTypes.object,
    usr: PropTypes.string,
    load_fn: PropTypes.func
}
