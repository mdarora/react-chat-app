import React from "react";
import {Link} from 'react-router-dom';
import {AccountCircle} from '@material-ui/icons';

const ChatsListItem = () => {
  return (
    <li className="chats-list-item">
      <Link to='/'>
        <div className="Chat-avtaar">
          <AccountCircle />
        </div>
        <div className="chat-content">
          <div className="chat-name">
            <h5>Abhimanyu kathpal</h5>
          </div>
          <div className="chat-last-msg">
            <p className="last-msg text-truncate">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ChatsListItem;
