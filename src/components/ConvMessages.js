import React from 'react';

const ConvMessages = (props) => {
    return (
        <div className='conv-messages'>
            <ul>
                <li>
                    <p className="conv-message log-user">1: Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message log-user">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message other-user">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message other-user">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message log-user">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message other-user">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message log-user">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque voluptatem omnis, vel maiores optio quae? Totam reprehenderit aliquid quam veritatis, assumenda minus nesciunt. Soluta quo laboriosam provident nam sapiente voluptate itaque, doloremque vitae nemo, molestias eveniet blanditiis pariatur harum distinctio asperiores porro perferendis error.
                    <br/> <span className='message-time'>10:23 pm</span></p>
                </li>
                <li>
                    <p className="conv-message other-user">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta voluptatum ipsa nisi. Rem quas voluptates quibusdam hic cum, maiores, optio mollitia omnis minima laborum deserunt deleniti corporis ex possimus. Hic, quibusdam repudiandae.
                    <br/> <span className='message-time'>10:23 pm</span>
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default ConvMessages
