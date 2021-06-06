import React from "react";
import {Link} from 'react-router-dom';
import {AccountCircle} from '@material-ui/icons';

const ChatsListItem = ({ki, itemLink, chatName, lastMessage, lastMessageTime, clickAdd}) => {

  return (
    <li className="chats-list-item" key={ki + 1} onClick={clickAdd}>
      <Link to={itemLink} key={ki + 2}>
        <div className="Chat-avtaar" key={ki + 3}>
          <AccountCircle key={ki + 4} />
        </div>
        <div className="chat-content  text-truncate" key={ki + 5}>
            <h5 className='chat-name text-truncate' key={ki + 6}>
              {chatName} 
              <span key={ki + 7} className='last-message-time'>{lastMessageTime}</span>
            </h5>
            <p className="chat-last-msg text-truncate" key={ki + 8}>
              {lastMessage}
            </p>
        </div>
      </Link>
    </li>
  );
};

export default ChatsListItem;
