import React, {useEffect} from "react";
import './MessageLog.css'
import {Button, Header} from "semantic-ui-react";
import Message from "../message/Message";
import {v4 as uuid} from "uuid";

export default function MessageLog(props) {
    let messagesEnd;

    useEffect(() => {
        if (messagesEnd) {
            messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <div className="messageLog">
            <Header as="h4"> Message log </Header>
            <div className="scroll">
                {props.messages.map(message => <Message message={message} key={uuid()}/>)}
                <div className="scrollDummy" ref={(el) => { messagesEnd = el; }} />
            </div>
            <div className="buttonLeft margin">
            <Button size={"large"} onClick={props.clearMessageLog}>Clear log</Button>
            </div>
        </div>
    );
}