import React from 'react';
import {Dropdown} from "react-bootstrap";
import styled from "styled-components";
import {PiCaretDownBold} from "react-icons/pi";
import {useSearchParams} from "react-router-dom";
import useActiveModel from "../_hooks/useActiveModel";

const models = [
    {name: 'GPT-3.5', img: '/src/assets/models/gpt3.png', value: "ChatGPT"},
    {name: 'GPT-4', img: '/src/assets/models/gpt4.png', value: "GPT4"},
    {name: 'Gemini', img: '/src/assets/models/gemini.png', value: "Google PalM 2"},
]

const Toggle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`

const ModelItem = styled(Dropdown.Item)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #001B79;
    &.active {
        background-color: #5225CE;
    }
    &:focus {
        background-color: transparent;
        color: inherit;
    }
`

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Toggle
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        <PiCaretDownBold />
    </Toggle>
));

function ChooseModel() {
    const {model, changeModel} = useActiveModel()
    const [activeModel, setActiveModel] = React.useState(() => models.find(m => m.value === model));

    return (
        <Dropdown onSelect={changeModel}>
            <Dropdown.Toggle as={CustomToggle} variant={''} id="dropdown-basic">
                <ModelItem eventKey={activeModel.value}>
                    <img src={activeModel.img} alt={activeModel.name}/>
                    <span>{activeModel.name}</span>
                </ModelItem>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    models.map(({name, img, value}) => (
                        <ModelItem eventKey={value} key={name} onClick={(e) => {
                            setActiveModel({name, img, value});
                        }} active={activeModel.name === name}>
                            <img src={img} alt={name}/>
                            <span>{name}</span>
                        </ModelItem>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ChooseModel;