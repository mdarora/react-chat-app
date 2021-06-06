import React, { useEffect } from 'react';
import {useHistory} from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    useEffect(()=>{

        fetch("/logout",{
            method: "GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            history.push("/login");
        }).catch(err => console.log(err));

    });


    return (
        <>
        </>
    )
}

export default Logout
