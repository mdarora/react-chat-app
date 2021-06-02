import React from 'react';
import {useHistory} from 'react-router-dom';
import cookies from 'js-cookie';
import Navigationbar from './Navigationbar';
import Chats from './Chats';
import Conversation from './Conversation';

const Home = () => {

    const history = useHistory();
    if(!cookies.get('jwtoken')){
        history.push('/login');
    }

    return (
    <>
        <main>
            <Navigationbar></Navigationbar>
            <div className="wrapper">
                <div className="row mx-0">
                    <Chats></Chats>
                    <Conversation></Conversation>
                </div>
            </div>
        </main>
    </>
    )
}

export default Home
