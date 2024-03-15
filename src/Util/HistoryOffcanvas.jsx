import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChatSideBar from "../pages/chat/_components/ChatSideBar";

function HistoryOffcanvas() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-secondary" className="d-lg-none" onClick={handleShow}>
                <RxHamburgerMenu />
            </Button>

            {/*<Alert variant="info" className="d-none d-lg-block">*/}
            {/*    Resize your browser to show the responsive offcanvas toggle.*/}
            {/*</Alert>*/}

            <Offcanvas show={show} onHide={handleClose} responsive="lg" placement={'end'}>
                {/*<Offcanvas.Header closeButton>*/}
                {/*    <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>*/}
                {/*</Offcanvas.Header>*/}
                <Offcanvas.Body>
                    <ChatSideBar offCanvasSelect={handleClose}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HistoryOffcanvas;