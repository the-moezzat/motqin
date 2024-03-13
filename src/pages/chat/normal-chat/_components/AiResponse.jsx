import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import {useState} from "react";
import Button from "react-bootstrap/Button";

const Item = styled.p`
    width: 100%;
    color: #fff;
    height: 200px;
    padding: 20px;
    background-color: #1a1d20;
`

const ScrollIndicatior = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: center;
`

function AiResponse({messages}) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div>
        <Carousel slide={false} controls={false} indicators={false} activeIndex={activeIndex}>
            {messages.map((message, index) => (
                <Carousel.Item>
                    <Item>
                        First
                    </Item>
                </Carousel.Item>
            ))}
        </Carousel>

            {(messages.length > 1) && <ScrollIndicatior>
                <Button onClick={() => setActiveIndex((state) => {
                    if (state === 0) return state;
                    return state - 1
                })}> {'<'} </Button>
                <p>{activeIndex + 1} </p>
                <p>/</p>
                <p>3</p>
                <Button onClick={() => setActiveIndex((state) => {
                    if (state === 2) return state;
                    return state + 1
                })}> {'>'} </Button>
            </ScrollIndicatior>}
        </div>
    );
}

export default AiResponse;