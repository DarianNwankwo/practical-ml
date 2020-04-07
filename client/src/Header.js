import React from "react";


function Header(props) {
    const { id } = props;

    return (
        <div id={id}>
            <h1>Let's Guess That Number</h1>
        </div>
    )
}


export default Header;