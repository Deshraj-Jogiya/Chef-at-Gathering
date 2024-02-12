import React from 'react';
import { useMessages } from '../MessageOutput/index';

function MessageList(props) {
    const messagesEndRef = React.useRef(null);
    const messages = useMessages(props.roomId);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useLayoutEffect(() => {
        scrollToBottom()
    });

    return (
        <div>
            <ul className="message-list p-0 px-1">
                {messages.map((x) => (
                    <Message
                        key={x.id}
                        message_obj={x}
                        isOwnMessage={x.owner === localStorage.getItem("owner")}
                        customer={props.customer}
                    />
                ))}
            </ul>
                <div ref={messagesEndRef} />
        </div>
    );
}

function Message({ message_obj, isOwnMessage }) {
    const { message } = message_obj;
    return (
        <div className={isOwnMessage ? "d-flex justify-content-end" : "d-flex justify-content-start"}>
            <div style={{
                margin: "5px",
                padding: "10px",
                textAlign: isOwnMessage ? "right" : "left",
                color: isOwnMessage ? "#fff" : "#000",
                background: isOwnMessage ? "#FF5E41" : "#EDEDED",
                borderRadius: "10px",
                width: "auto"
            }
            }>
                {message.includes(".jpg")? <a href={message} target="_blank"><img src={message}/></a>: message}
            </div >
        </div>
    );
}

export { MessageList };