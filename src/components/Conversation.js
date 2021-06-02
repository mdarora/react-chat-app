import React from 'react';
// import {Link} from 'react-router-dom';
import ConvMessages from './ConvMessages';
import {MoreVert, Search, AccountCircle, Send} from '@material-ui/icons';

const Conversation = () => {
    return (
    <>
        <section className="conv-section col-lg-9">
            <div className="conv-header">
                <div className="conv-header-title">
                    <div className="conv-avtaar">
                        <AccountCircle />
                    </div>
                    <div className="conv-content">
                        <h5 className='conv-with'>Abhimanyu kathpal</h5>
                        <p className="conv-status">Offline</p>
                    </div>
                </div>
                <div className="conv-header-btns">
                    <ul>
                        <li className="conv-header-btn">
                            <Search/>
                        </li>
                        <li className="conv-header-btn">
                            <MoreVert/>
                        </li>
                    </ul>
                </div>
            </div>

            <ConvMessages/>

            <div className="conv-footer">
                <form method="post">
                    <input className='message-input' type="text" name="message" id="message" placeholder='Write your message...' />
                    <button type="submit"><Send/></button>
                </form>
            </div>
        </section> 
    </>
    )
}

export default Conversation
