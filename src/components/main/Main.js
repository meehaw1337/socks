import React from "react";
import './Main.css'
import ConnectionTab from "../connectiontab/ConnectionTab";
import {Tab} from "semantic-ui-react";

export default function Main() {
    const panes = [
        {menuItem: '1', pane: {key: '1', content: <ConnectionTab id='1' key='1'/>}},
        {menuItem: '2', pane: {key: '2', content: <ConnectionTab id='2' key='2'/>}},
        {menuItem: '3', pane: {key: '3', content: <ConnectionTab id='3' key='3'/>}}
    ]

    return (
        <div className="main">
            <Tab panes={panes} renderActiveOnly={false}/>
            <div className="footer">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
}