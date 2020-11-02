import React from "react";
import './Message.css';
import {Message as SemanticUIMessage} from "semantic-ui-react";

export default function Message(props) {
    return (
        <div className={props.message.type === 'incoming' ? "incomingMessage" : "outgoingMessage"}>
            <SemanticUIMessage floating>
                <SemanticUIMessage.Header>{props.message.eventName}</SemanticUIMessage.Header>
                <p>{props.message.messageContent}</p>
            </SemanticUIMessage>
        </div>
    );
}