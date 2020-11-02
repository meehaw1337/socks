import {Grid, Header, Input} from "semantic-ui-react";
import React, {useState} from "react";
import './ConnectionTab.css'
import socketIOClient from "socket.io-client";
import MessageSender from "../messagesender/MessageSender";
import MessageLog from "../messagelog/MessageLog";
const patch = require('socketio-wildcard')(socketIOClient.Manager);

export default function ConnectionTab(props) {
    const [connectionUrl, setConnectionUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [messages, setMessages] = useState([]);

    const connectionInputHandler = (event) => setConnectionUrl(event.target.value);
    const messageSentHandler = (message) => setMessages(messages => [...messages, message]);
    const connectionButtonHandler = () => {
        const socket = socketIOClient(connectionUrl);
        setLoading(true);

        socket.on('connect_error', () => {
            setLoading(false);
            setConnectionFailed(true);
            socket.disconnect()
        });
        socket.on('connect', () => {
            setLoading(false);
            setConnectionFailed(false);
            patch(socket);
            socket.on('*', packet => {
                console.log(packet.data)
                setMessages(messages =>
                    [...messages, {eventName: packet.data[0], messageContent: packet.data[1], type: 'incoming'}]
                );
            })
            setSocket(socket);
        });
    };

    return (
        <div className="connectionTab">
            {props.initial ?
                <Header as='h3'>You don't have any active connections, try creating a new one!</Header>
                :
                <Header as="h5">Connection tab {props.id}</Header>
            }
            <Input fluid error={connectionFailed} placeholder='Connection URL' onChange={connectionInputHandler}
                   defaultValue={connectionUrl} size="large" action={{
                content: 'Connect',
                disabled: loading || connectionUrl === '',
                loading: loading,
                onClick: connectionButtonHandler
            }}/>
            <Grid columns={2}>
                <Grid.Column>
                    <MessageSender socket={socket} messageSentHandler={messageSentHandler}/>
                </Grid.Column>
                <Grid.Column>
                    <MessageLog messages={messages}/>
                </Grid.Column>
            </Grid>
        </div>
    );
}