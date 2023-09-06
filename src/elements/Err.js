import React from 'react'

export default function Err() {
    document.title = "Not Found"
    return (
        <div className="text-center">
            <h1>#404: PAGE NOT FOUND!</h1>
            <h3>Please check the url.</h3>
        </div>
    )
}
