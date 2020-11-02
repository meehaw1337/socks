import React from "react";
import './IncomingMessages.css'
import {Header} from "semantic-ui-react";

export default function IncomingMessages(props) {
    return (
        <div className="incomingMessages">
            <Header as="h4"> Incoming messages </Header>
            {props.messages.join('\n')}
        </div>
    );
}