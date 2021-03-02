import React from 'react';


function User (props){

    return(
        <React.Fragment>
            <li onClick={props.getFriends}>{props.user.firstName} {props.user.lastName}</li>
        </React.Fragment>
    )
}

export default User;