import React, {useState} from "react";
import "./MessageFilter.css"
import {Dropdown, Header, Radio} from "semantic-ui-react";

export default function MessageFilter(props) {
    const [filteringEnabled, setFilteringEnabled] = useState(false);
    const [filters, setFilters] = useState([]);
    const [options, setOptions] = useState([]);

    return (
        <div className="messageFilter">
            <Header as="h4"> Filter incoming messages </Header>
            <div className="filter-switch">
                Enable message filtering
                <Radio toggle onChange={() => {
                    if (filteringEnabled) {
                        props.setMessageFilter([]);
                    } else {
                        props.setMessageFilter(filters);
                    }
                    setFilteringEnabled(prev => !prev);
                }}/>
            </div>
            <Dropdown
                placeholder='Event names'
                fluid
                multiple
                search
                selection
                allowAdditions={true}
                onAddItem={(event, data) => {
                    setFilters(filter => [...filter, data.value]);
                    setOptions(options => [...options, data.value]);
                    if (filteringEnabled) {
                        props.setMessageFilter(filter => [...filter, data.value]);
                    }
                }}
                options={options.map(option => { return {key: option, text: option, value: option}})}
                onChange={(event, data) => {
                    setFilters(data.value);
                    if (filteringEnabled) {
                        props.setMessageFilter(data.value);
                    }
                }}
            />
        </div>
    );
}