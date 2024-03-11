import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {PiArrowClockwise, PiArrowRight, PiCopy, PiDownloadSimple} from "react-icons/pi";
import Button from "react-bootstrap/Button";

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 1000px;
    background-size: cover;
    background-position: center;
    border: 2px solid #6f42c1;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: flex-start;
    width: 85%;
`

const MessageText = styled.p`
    font-size: 16px;
    margin-bottom: 4px;
    color: ${props => props.writing ? "rgba(0,27,121,0.5)" : '#001B79'};
`

const IconRow = styled.div`
    display: flex;
    flex-direction: row;
gap: 4px;
`

const MessageActionBtn = styled(Button)`
    color: #5225CE;
    cursor: pointer;
    font-size: 20px;
    border: none;
    &:active{
        border: none;
    }
`
function Message({from, message, isResponding}) {
    return (
            <Row>
                <Avatar src={`/src/assets/${from === 'user' ? 'images/Avatar.jpg' : 'logo.svg'}`} alt={'user image'} className={'align-items-end'}/>
                <div>
                    <MessageText writing={isResponding}>
                        {message}
                    </MessageText>
                    {from === 'ai' && !isResponding &&
                        <IconRow>
                            <MessageActionBtn  variant={''}>
                                <PiArrowRight/>
                            </MessageActionBtn>
                            <MessageActionBtn variant={''}>
                                <PiCopy/>
                            </MessageActionBtn>
                            <MessageActionBtn variant={''}>
                                <PiArrowClockwise/>
                            </MessageActionBtn>
                            <MessageActionBtn  variant={''}>
                                <PiDownloadSimple/>
                            </MessageActionBtn>
                        </IconRow>
                    }

                </div>
            </Row>
    );
}


Message.propTypes = {
    from: PropTypes.oneOf(['user', 'ai']).isRequired,
    message: PropTypes.string.isRequired,
};


export default Message;