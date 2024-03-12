import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import "../Util/ChatSideBar.css";
import {IoClose} from "react-icons/io5";
import {BiPlusMedical} from "react-icons/bi";
import {TfiSearch} from "react-icons/tfi";

import {Formik, Form, Field, ErrorMessage} from "formik";
import {getAllChats} from "../actions/chat";
import {useQueryClient} from "react-query";
import {useDispatch} from "react-redux";
import {setCurrentConversation} from "../redux/slices/chatSlice";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { PiTrash } from "react-icons/pi";


const initialValues = {
    search: "",
};

const validationSchema = Yup.object({
    search: Yup.string(),
});

const ChatLink = styled.p`
    text-wrap: nowrap;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 0;
    z-index: 0;
    position: relative;
    &:hover {
        background-color: #f3f3f3;    }
`

const ChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-x:hidden;
    overflow-y: auto;
    height: 100%;
`

const SidebarLayout = styled.div`
    display: grid;
    height: calc(100dvh - 73px);
    grid-template-rows: auto 1fr;
    border-left: 1px solid rgba(105,43,239,0.2);
    padding: 16px;
    gap: 16px;
`

const BtnActionGroup = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 24px 0 0;
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,0) 100%);
`

const ChatActionBtn = styled.button`
    background-color: transparent;
    color: #5225CE;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
   
    &:focus {
        outline: none;
    }
`

const ChatSideBar = ({
                         openSideBar,
                         setOpenSideBar,
                     }) => {
    const navigate = useNavigate();
    const [chats, setChats] = React.useState([]);
    const [staticData, setStaticData] = React.useState([]);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllChats();
            setChats(res);
            setStaticData(res);
        };
        fetchData();
    }, []);

    const onSubmit = (values, {setSubmitting, resetForm}) => {
        setSubmitting(false);
        resetForm();
    };
    const searchFunction = (searchTerm) => {
        const filteredChats = staticData.filter((chat) =>
            chat.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setChats(filteredChats);
    };

    return (
        <SidebarLayout dir="rtl">
            {/*<div className=" toggleIcon">*/}

            {/*    <IoClose*/}
            {/*      onClick={() => setOpenSideBar(!openSideBar)}*/}
            {/*      className=" openSideIcon"*/}
            {/*    />*/}

            {/*</div>*/}
            <div className="fixed">
                <div className="add-chat">
          <span
              style={{
                  color: "#001B79",
                  fontWeight: "300",
                  textAlign: "center",
                  flex: "1",
              }}
          >
            محادثة جديدة
          </span>
                    <span style={{fontWeight: "800"}}>
            <BiPlusMedical/>
          </span>
                </div>
                <div className="search-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({values, handleChange}) => (
                            <Form className="">
                                <Field
                                    className=""
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="بحث"
                                    value={values.search}
                                    onChange={(e) => {
                                        handleChange(e); // Update Formik state
                                        searchFunction(e.target.value); // Trigger search function
                                    }}
                                />
                                <ErrorMessage name="search" component="div"/>
                            </Form>
                        )}
                    </Formik>
                    <TfiSearch
                        style={{
                            color: "#001B79",
                        }}
                        className="search-icon"
                        alt="search"
                    />
                </div>
                {openSideBar && <p className="head-of-chats">اخر محادثات</p>}
            </div>

            <ChatsContainer>
                {chats?.map((chat) => (
                    <div  key={chat.id} className={'position-relative'}>
                        <ChatLink onClick={async () => {
                            navigate(`/chat/${chat.id}`);
                            dispatch(setCurrentConversation(chat.id));
                            // setShowChat(chat.id);
                        }} >
                            {chat.title}
                        </ChatLink>
                        <BtnActionGroup className={'position-absolute top-50 translate-middle-y start-0 z-4'}>
                            <ChatActionBtn variant={''}>
                                <PiTrash />
                            </ChatActionBtn>
                        </BtnActionGroup>
                    </div>

                ))}
            </ChatsContainer>
        </SidebarLayout>
    );
};

export default ChatSideBar;
