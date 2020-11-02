import React from "react";
import './MessageLog.css'
import {Header} from "semantic-ui-react";
import Message from "../message/Message";

export default function MessageLog(props) {
    return (
        <div className="messageLog">
            <Header as="h4"> Message log </Header>
            {props.messages.map(message => <Message type="incoming" message={message} />)}
        </div>
    );
}