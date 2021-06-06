import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ChatsListItem from './ChatsListItem';
import {Modal, ModalBody} from 'react-bootstrap';
import spinner from "../images/Spinner-1s-200px-blue.svg";
import {MoreVert, Search, PersonAdd} from '@material-ui/icons';

const Chats = (props) => {
    const chatClasses = `chats-section col-xl-3 col-lg-4 col-sm-12 col-12 px-0 ${props.dClass}`;
    const history = useHistory();

    const [chatList, setChatList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const [show, setShow] = useState(false);
    const [chatAdded, setChatAdded] = useState(false);

    // const handleModal = () =>{
    //     setShow(!show);
    // }

    const searchUsers = async (e) =>{
        e.preventDefault();
        const queryName = e.target[0].value;
        const newSearchRes = document.getElementById('new-search-res');
        const userListSpinner = document.getElementById('userListSpinner');

        try {
            userListSpinner.hidden = false;
            newSearchRes.hidden = true;
            setUserList([]);
            const res = await fetch('/searchUsers', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({queryName})
            });
            const result = await res.json();

            if(result.error){
                userListSpinner.hidden = true;
                newSearchRes.hidden = false;
                newSearchRes.textContent = result.error;
                newSearchRes.classList.add('text-danger');
            } else {
                const allusers = result.map((element, index)=>{
                    const {name, _id, email} = element;
                   return <ChatsListItem ki={index} itemLink={'#'} chatName={name} lastMessage={email} clickAdd={()=>{
                       addChat(_id, name);
                   }} />
                });
                userListSpinner.hidden = true;
                newSearchRes.hidden = true;
                setUserList(allusers);
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const addChat = async (otherUserId, otherUserName) =>{
        const isAdd = window.confirm(`Add ${otherUserName} to chats ?`);
        const newSearchRes = document.getElementById('new-search-res');
        const noChats = document.getElementById('no-chats');
        if(isAdd){
            try {
                newSearchRes.hidden = true;
                const res = await fetch('/addChat', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({otherUserId})
                });
                const result = await res.json();
                if(result.error){
                    newSearchRes.hidden = false;
                    newSearchRes.classList.add('text-danger');
                    newSearchRes.textContent = result.error;
                } else if (result.message){
                    newSearchRes.classList.remove('text-danger');
                    newSearchRes.classList.add('text-success');
                    newSearchRes.hidden = false;
                    newSearchRes.textContent = result.message;
                    noChats.hidden = true;

                    setChatAdded(true);
                    

                    setTimeout(() => {
                        history.push('/');
                        setShow(false);
                        setUserList([]);
                    }, 1000);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    useEffect(() => {
        const ac = new AbortController();
        const getChats = async () =>{
            const chatListSpinner = document.getElementById('chatListSpinner');
            const noChats = document.getElementById('no-chats');

            try {
                chatListSpinner.hidden = false;
                const res = await fetch('/getChats', {signal: ac.signal});
                const result = await res.json();

                if(result.loginError){
                    noChats.hidden = true;
                    chatListSpinner.hidden = true;
                    history.push('/login');
                }
                else if(result.error){
                    chatListSpinner.hidden = true;
                    setErrMessage(result.error);
                }
                else if (result.message) {

                    const allChats = result.message.map((element, index) =>{

                        const {member1, member2, lastMessage, _id} = element;
                        let lastmessageTime = new Date(lastMessage.messageTime).toLocaleTimeString();
                        lastmessageTime = lastmessageTime.substr(0,5) + lastmessageTime.substr(8, 3);

                        let lastMsg;
                        if(!lastMessage.message){
                            lastMsg = 'No messages yet.';
                        } else {
                            lastMsg = lastMessage;
                        }

                        if(result.loggedUserId === member1.id){
                            return <ChatsListItem ki={index} itemLink={'/chat/' + _id} chatName={member2.name} lastMessage={lastMsg} lastMessageTime={lastmessageTime} />
                        } else {
                            return <ChatsListItem  ki={index} itemLink={'/chat/' + _id} chatName={member1.name} lastMessage={lastMsg} lastMessageTime={lastmessageTime} />
                        }
                    });

                    chatListSpinner.hidden = true;
                    noChats.hidden = true;
                    setChatList(allChats);
                    
                }

            } catch (error) {
                console.log(error);
            }
        }
        getChats();

        return () =>{
            ac.abort();
        }
    }, [history, chatAdded]);
    

    return (
    <>
        <section id='chats' className={chatClasses}>
            <div className="chats-header">
                <div className="title">
                    <h2>Chats</h2>
                    <div className="menu">
                        <span title='Start new Chat' onClick={()=>setShow(true)}><PersonAdd/></span>
                        <span><MoreVert /></span>
                    </div>
                </div>
                <div className="chats-search">
                    <form>
                        <input type="search" name="search" id="search" placeholder='Search in chats' required/>
                        <button type="submit"><Search/></button>
                    </form>
                </div>
            </div>
            <ul className="chats-list">
                <figure id='chatListSpinner' hidden>
                    <img src={spinner} alt="Loading Spinner" width='30' />
                </figure>
                <div id='no-chats' className="no-chats">
                    <h4>{errMessage}</h4>
                    <p>Add new chat by clicking on "<PersonAdd/>" icon above.</p>
                </div>
                {chatList}
            </ul>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Start new chat</Modal.Title>
                </Modal.Header>
                <ModalBody scrollable='true'>
                    <div className="new-chat-search">
                        <form onSubmit={searchUsers}>
                            <input type="search" name="user" id="search" placeholder='Search user' required/>
                            <button type="submit"><Search/></button>
                        </form>
                    </div>
                    <ul className='new-users-list'>
                    <figure id='userListSpinner' hidden>
                        <img src={spinner} alt="Loading Spinner" width='30' />
                    </figure>
                        <h5 id='new-search-res'>Start Searching.</h5>
                        {userList}
                    </ul>
                </ModalBody>
            </Modal>
        </section>
    </>
    )
}

export default Chats
