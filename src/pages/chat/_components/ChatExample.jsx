import React from 'react';
import styled from "styled-components";

const Example = styled.div`
    padding: 16px;
    border: 1px solid rgba(0, 27, 121, 0.2);
    border-radius: 8px;
`

const Title = styled.h3`
    font-size: 16px;
    color: #001B79;
`

const Description = styled.p`
    font-size: 12px;
    color: rgba(0, 27, 121, 0.5);
    margin-bottom: 0px;
`
function ChatExample({title, description}) {
    return (
        <Example dir={'rtl'}>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Example>
    );
}

export default ChatExample;