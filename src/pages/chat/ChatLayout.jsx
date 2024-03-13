import React from 'react';
import Navbar from "../../Util/Navbar";
import {Row, Col, Stack} from 'react-bootstrap';
import {Outlet} from "react-router-dom";
import ChatSideBar from "./_components/ChatSideBar";
import Model from "../../components/ui/model";


function ChatLayout() {
    return (
        <div>
            <Navbar/>
            <Row>
                <Col>
                    <Outlet/>
                </Col>
                <Col md={"3"} className={'d-none d-lg-block'}>
                    <ChatSideBar/>
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;