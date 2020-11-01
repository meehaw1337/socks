import React from "react";
import './OutgoingMessages.css'
import {Header} from "semantic-ui-react";

export default function OutgoingMessages(props) {
    return (
        <div className="outgoingMessages">
            <Header as="h4"> Outgoing messages </Header>
        </div>
    );
}