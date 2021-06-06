import React from 'react';

const ConvMessage = ({userClass, message, messageTime}) => {
    const messageClasses = `conv-message ${userClass}`;
    return (
        <li>
            <p className={messageClasses}>{message} <br/> 
                <span className='message-time'>{messageTime}</span>
            </p>
        </li>
    )
}

export default ConvMessage
