import './App.css';
import React from "react";
import Main from "./components/main/Main";
import {Image} from "semantic-ui-react";

export default function App() {
    return (
        <div className="App">
            <div className="appBar">
                <Image src={process.env.PUBLIC_URL + '/favicon.ico'} size="tiny"/>
                <div className="appBarText">
                    <h1 className="appHeader">Socks!</h1>
                    <h5 className="appDescription">Progressive web application for testing SocketIO connections</h5>
                </div>
            </div>
            <Main/>
        </div>
    );
}