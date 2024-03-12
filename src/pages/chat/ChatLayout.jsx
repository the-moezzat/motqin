import React from 'react';
import Navbar from "../../Util/Navbar";
import {Row, Col, Stack} from 'react-bootstrap';
import {Outlet} from "react-router-dom";
import ChatSideBar from "../../Util/ChatSideBar";


function ChatLayout() {
    return (
        <div>
            <Navbar/>
            <Row>
                <Col>
                    <Outlet/>
                </Col>
                <Col md={"3"}>
                    <ChatSideBar/>
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;