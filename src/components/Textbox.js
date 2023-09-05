import React, { useState } from 'react';

export default function Textbox(props) {

    document.title = `Text Editor | ${process.env.REACT_APP_NAME}`
    const [Text, setText] = useState('');

    const textState = (event) => {
        setText(event.target.value)
    }

    const upCase = () => {
        let upText = Text.toUpperCase()
        setText(upText)
        props.showAlert("success", "Converted to upper case")
    }

    const loCase = () => {
        let loText = Text.toLowerCase()
        setText(loText)
        props.showAlert("success", "Converted to lower case")
    }

    const removeSpace = () => {
        let spaceRemove = Text.split(/[ ]+/)
        setText(spaceRemove.join(" "))
        props.showAlert("success", "Extra spaces removed")
    }

    const urlEncode = () => {
        let encoded = encodeURI(Text)
        setText(encoded)
        props.showAlert("success", "Encoded to URL string")
    }

    const urlDecode = () => {
        let decoded = decodeURI(Text)
        setText(decoded)
        props.showAlert("success", "URL Decoded")
    }

    const copyText = () => {
        navigator.clipboard.writeText(Text)
        props.showAlert("success", "Copied to clipboard")
    }

    const clearText = () => {
        setText("")
        props.showAlert("success", "Cleared all text")
    }

    return (
        <>
            <h1>Enter text here to manipulate it as you want.</h1>
            <div className="mb-3 my-4">
                <textarea className="form-control" value={Text} onChange={textState} rows="8"></textarea>
            </div>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={upCase}>Convert to Upper Case</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={loCase}>Convert to Lower Case</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={removeSpace}>Remove extra spaces</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={urlEncode}>Encode to URL</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={urlDecode}>Decode URL</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={copyText}>Copy text to clipboard</button>
            <button disabled={Text.length === 0} type="button" className="btn btn-primary mx-1 my-1" onClick={clearText}>Clear all text</button>
            <div className="container my-3">
                <h2>Summary of your text</h2>
                <p>{Text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {Text.length} characters.</p>
                <p>{.008 * Text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} minutes to read.</p>
                <h2>Preview of your text</h2>
                <p>{Text.length > 0 ? Text : "Nothing to preview."}</p>
            </div>
        </>
    )
}