import './App.css';
import React from "react";
import Main from "./components/main/Main";
import {Header} from "semantic-ui-react";

export default function App() {
    return (
        <div className="App">
            <Header as='h1' >Socks</Header>
            <Main/>
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
}