import React from 'react';
import ChatsListItem from './ChatsListItem';
import {MoreVert, Search} from '@material-ui/icons';

const Chats = () => {
    return (
    <>
        <section className="chats-section col-lg-3 px-0">
            <div className="chats-header">
                <div className="title">
                    <h3>Chats</h3>
                    <div className="menu">
                        <MoreVert />
                    </div>
                </div>
                <div className="chats-search">
                    <form>
                        <input type="search" name="search" id="search" placeholder='Search users'/>
                        <button type="submit"><Search/></button>
                    </form>
                </div>
            </div>
            <ul className="chats-list">
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
            </ul>
        </section>
    </>
    )
}

export default Chats
