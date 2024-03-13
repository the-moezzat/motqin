import React, {useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {PiArrowClockwise, PiArrowRight, PiCopy, PiDownloadSimple} from "react-icons/pi";
import Button from "react-bootstrap/Button";
import useStartChat from "../../_hooks/useStartChat";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import DownloadMessage from "./DownloadMessage";
import ReactMarkdown from 'react-markdown'
import Carousel from 'react-bootstrap/Carousel';
import {useSelector} from "react-redux";
import useReloadMessage from "../../_hooks/useReloadMessage";

const ScrollIndicatior = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`
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

    &:active {
        border: none;
    }
`

function Message({response, isResponding, from}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const {startChat} = useStartChat();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const chatId = useSelector(state => state.chat.currentConversation);
    const {reloadMessage, isReloadingNewMessage, newMessage} = useReloadMessage();

    const extraMessages = response.reloaded_message ? response.reloaded_message : [];
    const messages = [response.content, ...extraMessages]

    return (
        <Row>
            <Avatar src={`/src/assets/${from === 'user' ? 'images/Avatar.jpg' : 'logo.svg'}`} alt={'user image'}
                    className={'align-items-end'}/>
            <div>
                <Carousel slide={false} controls={false} indicators={false} activeIndex={activeIndex}>
                    {messages.map(message => (
                        <Carousel.Item key={message}>
                            <MessageText writing={isResponding} >
                                <ReactMarkdown>{message}</ReactMarkdown>
                            </MessageText>
                        </Carousel.Item>))
                    }
                </Carousel>
                {!response.is_from_user && !isResponding &&
                    <IconRow>
                        <MessageActionBtn variant={''} onClick={() => {
                            startChat({title: message.split(' ').slice(0, 10).join(' ').replaceAll('*', ''), message}, {
                                onSuccess: async (data) => {
                                    navigate('/chat/' + data.id + '?message=' + message);
                                    await queryClient.invalidateQueries('chats')
                                }
                            });
                        }}>
                            <PiArrowRight/>
                        </MessageActionBtn>
                        <MessageActionBtn variant={''} onClick={async () => {
                            await navigator.clipboard.writeText(message);
                        }}>
                            <PiCopy/>
                        </MessageActionBtn>

                        <MessageActionBtn variant={''} onClick={() => {
                            reloadMessage({messageId: response.id, chatId})
                        }}>
                            <PiArrowClockwise/>
                        </MessageActionBtn>

                        <DownloadMessage trigger={<MessageActionBtn variant={''}>
                            <PiDownloadSimple/>
                        </MessageActionBtn>}
                        />

                        {(messages.length > 1) &&
                            <ScrollIndicatior>
                                <MessageActionBtn
                                    variant={''}
                                    onClick={() => setActiveIndex((state) => {
                                        if (state === messages.length - 1) return state;
                                        return state + 1
                                    })}> {'<'} </MessageActionBtn>
                                <span> {messages.length} / {activeIndex + 1}</span>
                                <MessageActionBtn
                                    onClick={() => setActiveIndex((state) => {
                                        if (state === 0) return state;
                                        return state - 1
                                    })}
                                    variant={''}
                                > {'>'} </MessageActionBtn>
                            </ScrollIndicatior>}
                    </IconRow>
                }

            </div>
        </Row>
    );
}


export default Message;