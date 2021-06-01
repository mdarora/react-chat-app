import React from 'react';
import {useHistory} from 'react-router-dom';
import cookies from 'js-cookie';

const Logout = () => {
    const history = useHistory();
    console.log(cookies.remove('jwtoken'));
    history.push('/login');
    return (
    <>   
    </>
    )
}

export default Logout
