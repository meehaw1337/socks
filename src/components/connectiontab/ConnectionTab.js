import {Grid, Input} from "semantic-ui-react";
import React, {useState} from "react";
import './ConnectionTab.css'
import socketIOClient from "socket.io-client";
import MessageSender from "../messagesender/MessageSender";
import MessageLog from "../messagelog/MessageLog";
import socketio_wildcard from "socketio-wildcard";

const patch = socketio_wildcard(socketIOClient.Manager);

export default function ConnectionTab(props) {
    const [connectionUrl, setConnectionUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [messages, setMessages] = useState([]);
    const [readyToSend, setReadyToSend] = useState(false);

    const connectionInputHandler = (event) => setConnectionUrl(event.target.value);
    const messageSentHandler = (message) => setMessages(messages => [...messages, message]);
    const connectionButtonHandler = () => {
        const socket = socketIOClient(connectionUrl);
        setLoading(true);

        socket.on('connect_error', () => {
            setLoading(false);
            setConnectionFailed(true);
            socket.disconnect();
        });
        socket.on('connect', () => {
            setLoading(false);
            setConnectionFailed(false);
            setReadyToSend(true);
            props.updateTabName(props.id, connectionUrl);
            patch(socket);
            socket.on('*', packet => {
                setMessages(messages =>
                    [...messages, {
                        eventName: packet.data[0],
                        messageContent: packet.data[1],
                        type: 'incoming',
                        timestamp: new Date()
                    }]
                );
            });
            setSocket(socket);
        });
    };

    return (
        <div className="connectionTab">
            <Input fluid error={connectionFailed} placeholder='Connection URL' onChange={connectionInputHandler}
                   defaultValue={connectionUrl} size="large" action={{
                content: 'Connect',
                disabled: loading || connectionUrl === '',
                loading: loading,
                onClick: connectionButtonHandler
            }}/>
            <Grid columns={2}>
                <Grid.Column>
                    <MessageSender socket={socket} messageSentHandler={messageSentHandler} readyToSend={readyToSend}/>
                </Grid.Column>
                <Grid.Column>
                    <MessageLog messages={messages}/>
                </Grid.Column>
            </Grid>
        </div>
    );
}