import React from 'react'

export default function DefaultIcon(props) {
    const letter = props.letters;
    return (
        <>
            <svg height="80" width="80">
                <circle cx="40" cy="40" r="40" stroke="#f0f0f0" stroke-width="1" fill="#b8f2e6">
                </circle>
                <text style={{fontSize:"38px"}} className="icon-txt" x="28" y="54" fill="white">{letter}</text>
            </svg>
        </>
    )
}
