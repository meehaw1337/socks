import React, {useState} from "react";
import './Main.css'
import ConnectionTab from "../connectiontab/ConnectionTab";
import {Button, Icon, Menu, Tab} from "semantic-ui-react";

export default function Main() {
    const updateTabName = (id, name) => {
        setPanes(panes => panes.map(pane => {
            if (pane.key === id) {
                pane.menuItem =
                    <Menu.Item key={id}>
                        {name}
                        <div className="closeTabIcon">
                            <Icon name="close"/>
                        </div>
                    </Menu.Item>
            }

            return pane;
        }));
    };

    const addNewTab = () => {
        const id = `${panes.length + 1}`;
        setPanes(panes => [...panes,
            {
                key: id,
                menuItem:
                    <Menu.Item key={id}>
                        New tab
                        <div className="closeTabIcon">
                            <Icon name="close"/>
                        </div>
                    </Menu.Item>,
                pane: {key: id, content: <ConnectionTab id={id} key={id} updateTabName={updateTabName}/>}
            }
        ])
    }

    const [panes, setPanes] = useState([
        {
            key: '1',
            menuItem: (<Menu.Item key="1">New tab</Menu.Item>),
            pane: {key: '1', content: <ConnectionTab id='1' key='1' updateTabName={updateTabName}/>}
        }
    ]);

    return (
        <div className="main">
            <Tab panes={[...panes, {menuItem: <Button icon="add circle" onClick={addNewTab}/>}]}
                 renderActiveOnly={false}/>
            <div className="footer">Icons made by <a href="https://www.flaticon.com/authors/freepik"
                                                     title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
}