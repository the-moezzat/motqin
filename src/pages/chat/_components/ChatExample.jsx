import React from 'react';
import styled from "styled-components";

const Example = styled.div`
    padding: 16px;
    border: 1px solid rgba(0, 27, 121, 0.2);
    border-radius: 8px;
    cursor: pointer;
`

const Title = styled.h3`
    font-size: 14px;
    color: #001B79;
`

const Description = styled.p`
    font-size: 10px;
    color: rgba(0, 27, 121, 0.5);
    margin-bottom: 0;
`
function ChatExample({title, description, onClick}) {
    return (
        <Example dir={'rtl'} onClick={onClick}>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Example>
    );
}

export default ChatExample;