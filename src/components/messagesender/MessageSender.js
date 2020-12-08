import React, {useState} from "react";
import './MessageSender.css'
import {Button, Dropdown, Form, Grid, GridColumn, Header, Input, Menu, Popup, TextArea} from "semantic-ui-react";

export default function MessageSender(props) {
    const [eventName, setEventName] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [eventNameHistory, setEventNameHistory] = useState([]);
    const [parseFailedMessage, setParseFailedMessage] = useState('');

    const formats = [
        {key: 1, text: 'Text', value: 'text'},
        {key: 2, text: 'JSON', value: 'json'}
    ]

    const [selectedFormat, setSelectedFormat] = useState(formats[0].value);

    const resetForm = () => {
        setEventName('');
        setMessageContent('');
        setParseFailedMessage('');
    }

    const eventInputHandler = (event) => setEventName(event.target.value);
    const contentInputHandler = (event) => setMessageContent(event.target.value);
    const resetButtonHandler = () => resetForm();
    const sendButtonHandler = () => {
        try {
            const message = selectedFormat === 'text' ? messageContent : JSON.parse(messageContent);
            props.socket.emit(eventName, message);
            props.messageSentHandler({
                eventName,
                messageContent: JSON.stringify(messageContent),
                type: 'outgoing',
                timestamp: new Date()
            });

            if (!eventNameHistory.includes(eventName)) {
                setEventNameHistory(eventNameHistory => [...eventNameHistory, eventName]);
            }
            setParseFailedMessage('');
        } catch (error) {
            setParseFailedMessage(`${error.name}: ${error.message}`);
        }
    };

    return (
        <div className="messageSender">
            <Header as="h4"> Send a message </Header>
            <Input fluid placeholder="Event name" className="margin" onChange={eventInputHandler} value={eventName}
                   list='events'/>
            <datalist id='events'>
                {eventNameHistory.map(event => <option value={event}>{event}</option>)}
            </datalist>
            <Form className="margin">
                <Form.Field
                    control={TextArea}
                    onChange={contentInputHandler}
                    placeholder="Message"
                    error={parseFailedMessage === '' ? undefined : parseFailedMessage}
                    value={messageContent}
                />
            </Form>
            <Grid columns={2}>
                <GridColumn>
                    <div className="buttonLeft margin">
                        <Button size="large" onClick={resetButtonHandler}>Reset</Button>
                    </div>
                </GridColumn>
                <GridColumn>
                    <div className="buttonRight margin">
                        <div className="formatDropdown">
                            <Menu compact>
                                <Dropdown defaultValue={selectedFormat} options={formats}
                                          onChange={(event, data) => setSelectedFormat(data.value)} fluid item
                                          selection/>
                            </Menu>
                        </div>
                        {props.readyToSend ?
                            <div>
                                <Button size="large" color="teal" onClick={sendButtonHandler}>Send</Button>
                            </div>
                            :
                            <Popup basic content="You need to establish a connection first" trigger={
                                <div>
                                    <Button size="large" color="teal" disabled>Send</Button>
                                </div>
                            }/>
                        }
                    </div>
                </GridColumn>
            </Grid>
        </div>
    );
}