import React, {useState} from "react";
import './Main.css'
import ConnectionTab from "../connectiontab/ConnectionTab";
import {Button, Icon, Menu, Tab} from "semantic-ui-react";

export default function Main() {
    const updateTabName = (id, name) => {
        setPanes(panes => panes.map(pane => {
            if (pane.key === id) {
                pane.menuItem =
                    <Menu.Item key={id} className="tabMenuItem">
                        {name}
                        {id === '1' ? '' :
                            <div className="closeTabIcon" onClick={() => removeTab(id)}>
                                <Icon name="close"/>
                            </div>}
                    </Menu.Item>
            }

            return pane;
        }));
    };

    const addNewTab = () => {
        const id = `${panes[panes.length - 1].key + 1}`;

        setPanes(panes => [...panes, {
            key: id,
            menuItem:
                <Menu.Item key={id} className="tabMenuItem">
                    New tab
                    <div className="closeTabIcon" onClick={() => removeTab(id)}>
                        <Icon name="close"/>
                    </div>
                </Menu.Item>,
            pane: {key: id, content: <ConnectionTab id={id} key={id} updateTabName={updateTabName}/>}
        }
        ]);

        setActiveIndex(panes.length);
    }

    const removeTab = (id) => {
        setPanes(panes => panes.filter(pane => pane.key !== id));
    }

    const [panes, setPanes] = useState([{
        key: '1',
        menuItem: (<Menu.Item key="1" className="tabMenuItem">New tab</Menu.Item>),
        pane: {key: '1', content: <ConnectionTab id='1' key='1' updateTabName={updateTabName}/>}
    }]);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="main">
            <Tab renderActiveOnly={false} activeIndex={activeIndex}
                 onTabChange={(event, data) => setActiveIndex(data.activeIndex)} panes={[...panes, {
                menuItem:
                    <div className="addTabIcon">
                        <Button icon="add" compact onClick={addNewTab}/>
                    </div>
            }]}/>
            <div className="footer">Icons made by
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from
                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
        </div>
    );
}