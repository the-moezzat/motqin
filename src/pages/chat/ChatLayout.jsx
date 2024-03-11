import React from 'react';
import Navbar from "../../Util/Navbar";
import {Row, Col, Stack} from 'react-bootstrap';
import {Outlet} from "react-router-dom";


function ChatLayout() {
    return (
        <div>
            <Navbar/>
            <Row>
                <Col>
                    <Outlet/>
                </Col>
                <Col md={'auto'}>
                    {/*<ChatSideBar/>*/}
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;