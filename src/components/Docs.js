import React from 'react'

export default function Docs(props) {

    document.title = `Documentation | ${process.env.REACT_APP_NAME}`

    let myStyle = {
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.mode === 'dark' ? '#071f42' : '#ffffff',
    }

    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item" style={myStyle}>
                <h2 className="accordion-header" id="flush-headingOne">
                    <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Quick Start
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">At <strong>{`${process.env.REACT_APP_NAME}`}</strong>, you can get letast updates coming from all over the world, can manipulate text as you wish and along with these services for free, you can also get a cloud drive for all your important notes and store your data on internet for free.</div>
                </div>
            </div>
            <div className="accordion-item" style={myStyle}>
                <h2 className="accordion-header" id="flush-headingTwo">
                    <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Text Editor
                    </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Our text editor is a tool which can save your time in text decorations and makes it easy to you to use it. With this tool, you can count words and reading time of your text, remove extra spaces from your text, convert your text to uppercase and to lowercase. You can also copy a quite long text to your clipboard and then paste it where you want to.</div>
                </div>
            </div>
            <div className="accordion-item" style={myStyle}>
                <h2 className="accordion-header" id="flush-headingThree">
                    <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Latest News
                    </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">Here, you can also get the latest news and updates on several topics like local news, sports, science, entertainment, technology and many more at one place.</div>
                </div>
            </div>
            <div className="accordion-item" style={myStyle}>
                <h2 className="accordion-header" id="flush-headingFour">
                    <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Your Secured Drive
                    </button>
                </h2>
                <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">At <strong>{`${process.env.REACT_APP_NAME}`}</strong>, we try to provide you the most secured drive, where you can store your daily notes and get access to it from any device which is connected to the internet, by just logging in with few steps.</div>
                </div>
            </div>
        </div>
    )
}