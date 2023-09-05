import React from 'react'

function NewsItem(props) {
    let { source, title, body, author, date, newsUrl, imgUrl } = props

    const defaultImg = `https://${process.env.REACT_APP_DEFAULT_IMG}`

    let myStyle = {
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.mode === 'dark' ? '#071f42' : '#ffffff',
    }

    return (
        <div className="card mb-3" style={myStyle}>
            <div className="d-flex justify-content-end position-absolute start-0">
                <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
            <img src={!imgUrl ? defaultImg : imgUrl} className="card-img-top" alt="could not load this content" />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
                <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer nofollow" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    )
}

export default NewsItem
