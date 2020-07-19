import React from 'react'
let icon = require('../img/storefront-colour-1200px.png')
export default function DefaultIcon(props) {
    const letter = props.letters;
    return (
        <>
            <img className="icon" src={icon} />
        </>
    )
}
