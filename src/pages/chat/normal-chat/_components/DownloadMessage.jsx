import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal, Stack} from "react-bootstrap";
import styled from "styled-components";
import {BsFiletypeHtml, BsFiletypeTxt} from "react-icons/bs";
import {PiFileDoc, PiFilePdf} from "react-icons/pi";
import { PiFileHtml } from "react-icons/pi";

const downloadOptions = [
    {
        title: 'TXT',
        icon: <BsFiletypeTxt/>,
    },
    {
        title: 'HTML',
        icon: <PiFileHtml/>,
    },
    {
        title: 'DOC',
        icon: <PiFileDoc/>
    },
    {
        title: 'PDF',
        icon: <PiFilePdf/>
    }
]

const ModalContainer = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    //background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`
const ModalView = styled.div`
    z-index: 1000;
    position: relative;
    padding: 20px;
    border: none;

    @media (max-width: 768px) {
        padding: 10px;
    }
    
    & > h4 {
        color: #5225CE;
        font-weight: 700;
    }

    & > p {
        color: rgba(0, 27, 121, 0.6);
        font-weight: 400;
    }

    & > button {
        background-color: #6f42c1;
    }
`

const FileBtn = styled.button`
    color: rgba(0, 27, 121, 0.8);
    border: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    gap: 8px;
    align-items: center;

    &:active,
    &:focus {
        border: none;
    }

    & > span {
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        font-size: 16px;
        color: #001B79;
    }
`
const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 18px 0;
`
export default function DownloadMessage({trigger}) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div onClick={() => setShow(true)}>
                {trigger}
            </div>

            <ModalContainer
                dir={'rtl'}
                show={show}
                aria-labelledby="modal-1-label"
                onHide={() => setShow(false)}
                // backdrop={false}
                centered={true}
                contentClassName={'border-none z-high'}
                backdropClassName={'bg-black  z-low'}
            >
                <ModalView>
                    <h4 id="modal-1-label">تصدير</h4>
                    <Options>
                        {downloadOptions.map(({title, icon}, index) => (
                            <FileBtn key={index}>
                                {icon}
                                <span>{title}</span>
                            </FileBtn>
                        ))}
                    </Options>
                    <Stack gap={3} direction={'horizontal'}>
                        <Button
                            onClick={() => setShow(false)}
                            variant={'outline-secondary'}
                        >
                            إلغاء
                        </Button>
                    </Stack>
                </ModalView>
            </ModalContainer>
        </div>
    );
}