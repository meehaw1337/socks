import {Divider, Input} from "semantic-ui-react";
import React, {useState} from "react";
import './ConnectionTab.css'
import socketIOClient from "socket.io-client";
import MessageSender from "../messagesender/MessageSender";
import MessageLog from "../messagelog/MessageLog";
import socketio_wildcard from "socketio-wildcard";
import MessageFilter from "../messagefilter/MessageFilter";

const patch = socketio_wildcard(socketIOClient.Manager);

export default function ConnectionTab(props) {
    const [connectionUrl, setConnectionUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [messages, setMessages] = useState([]);
    const [readyToSend, setReadyToSend] = useState(false);
    const [messageFilter, setMessageFilter] = useState([]);

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
                setMessageFilter(messageFilter => {
                    console.log(messageFilter)
                    if (messageFilter.length === 0 || messageFilter.includes(packet.data[0])) {
                        setMessages(messages =>
                            [...messages, {
                                eventName: packet.data[0],
                                messageContent: JSON.stringify(packet.data[1]),
                                type: 'incoming',
                                timestamp: new Date()
                            }]
                        );
                    }

                    return messageFilter;
                });
            });
            setSocket(socket);
        });
    };
    const clearMessageLog = () => setMessages([]);

    return (
        <div className="connectionTab">
            <Input fluid error={connectionFailed} placeholder='Connection URL' onChange={connectionInputHandler}
                   defaultValue={connectionUrl} size="large" action={{
                content: 'Connect',
                disabled: loading || connectionUrl === '',
                loading: loading,
                onClick: connectionButtonHandler
            }}/>
            <div className="contentDivider">
                <Divider section className="contentDivider"/>
            </div>
            <div className="tabContent">
                <div className="tabContentLeft">
                    <MessageSender socket={socket} messageSentHandler={messageSentHandler} readyToSend={readyToSend}/>
                    <MessageFilter setMessageFilter={setMessageFilter}/>
                </div>
                <MessageLog messages={messages} clearMessageLog={clearMessageLog}/>
            </div>
        </div>
    );
}