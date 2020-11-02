import {Grid, Header, Input} from "semantic-ui-react";
import React, {useState} from "react";
import './ConnectionTab.css'
import socketIOClient from "socket.io-client";
import OutgoingMessages from "../outgoing/OutgoingMessages";
import IncomingMessages from "../incoming/IncomingMessages";
const patch = require('socketio-wildcard')(socketIOClient.Manager);

export default function ConnectionTab(props) {
    const [connectionUrl, setConnectionUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [incomingMessages, setIncomingMessages] = useState([]);

    const connectionInputHandler = (event) => setConnectionUrl(event.target.value);
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
                setIncomingMessages(incomingMessages => [...incomingMessages, packet.data])
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
                    <OutgoingMessages socket={socket}/>
                </Grid.Column>
                <Grid.Column>
                    <IncomingMessages messages={incomingMessages}/>
                </Grid.Column>
            </Grid>
        </div>
    );
}