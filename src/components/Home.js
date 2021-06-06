import React  from 'react';
import {useHistory, Route} from 'react-router-dom';
import cookies from 'js-cookie';
import Navigationbar from './Navigationbar';
import Chats from './Chats';
import Conversation from './Conversation';

const Home = () => {
    
    const history = useHistory();
    if(!cookies.get('jwtoken')){
        history.push('/login');
    }
    
    // Todo: check width of screen and render individual components accordingly


    return (
    <>
    
    <Route path='/chat/:chatId'>
        <main>
            <Navigationbar dClass='d-none-sm'></Navigationbar>
            <div className="row mx-0 w-100">
                <Chats dClass='d-none-sm'></Chats>
                <Conversation></Conversation>
            </div>
        </main>
    </Route>
    
    <Route exact path='/'>
        <main>
            <Navigationbar></Navigationbar>
            <div className="row mx-0 w-100">
                <Chats></Chats>
                <Conversation dClass='d-none-sm'></Conversation>
            </div>
        </main>
    </Route>
        
    </>
    )
}

export default Home
