import React, {useState} from "react";
import './OutgoingMessages.css'
import {Button, Form, Grid, GridColumn, Header, Input} from "semantic-ui-react";
import TextareaAutosize from 'react-textarea-autosize';

export default function OutgoingMessages(props) {
    const [eventName, setEventName] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const resetForm = () => {
        setEventName('');
        setMessageContent('');
    }

    const eventInputHandler = (event) => setEventName(event.target.value);
    const contentInputHandler = (event) => setMessageContent(event.target.value);
    const sendButtonHandler = () => props.socket.emit(eventName, messageContent);
    const resetButtonHandler = () => resetForm();

    return (
        <div className="outgoingMessages">
            <Header as="h4"> Outgoing messages </Header>
            <Input fluid placeholder="Event name" className="margin" onChange={eventInputHandler} value={eventName}/>
            <Form className="margin">
                <TextareaAutosize placeholder="Message" onChange={contentInputHandler} value={messageContent}/>
            </Form>
            <Grid columns={2}>
                <GridColumn>
                    <div className="buttonLeft margin">
                        <Button size="large" onClick={resetButtonHandler}>Reset</Button>
                    </div>
                </GridColumn>
                <GridColumn>
                    <div className="buttonRight margin">
                        <Button size="large" color="teal" onClick={sendButtonHandler}>Send</Button>
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
}