import React from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import "./ChatSideBar.css";
import {TfiSearch} from "react-icons/tfi";

import {ErrorMessage, Field, Form, Formik} from "formik";
import {getAllChats} from "../../../actions/chat";
import {useQuery, useQueryClient} from "react-query";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentConversation} from "../../../redux/slices/chatSlice";
import styled from "styled-components";
import {PiTrash} from "react-icons/pi";
import Model from "../../../components/ui/model";
import useDeleteChat from "../_hooks/useDeleteChat";
import Skeleton from "react-loading-skeleton";
import useStartChat from "../_hooks/useStartChat";
import {BiPlusMedical} from "react-icons/bi";


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
        background-color: #f3f3f3;
    }
    &.active {
        background-color: #f3f3f3;    }
`

const ChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
`

const SidebarLayout = styled.div`
    display: grid;
    height: calc(100dvh - 73px);
    grid-template-rows: auto 1fr;
    border-left: 1px solid rgba(105, 43, 239, 0.2);
    padding: 16px;
    gap: 16px;
`

const BtnActionGroup = styled.div`
    display: flex;
    gap: 8px;
    padding: 0 24px 0 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.5) 90%, rgba(255, 255, 255, 0) 100%);
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

const StartChatBtn = styled.button`
    border: 1px solid rgba(105, 43, 239, 0.2);
    background-color: transparent;
    color: #001B79;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.3s;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.07);

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: #f3f3f3;
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
    const {mutate, isLoading} = useDeleteChat()
    const {startChat} = useStartChat()
    const currentChatId = useSelector(state => state.chat.currentConversation);

    const {isLoading: chatsLoading} = useQuery({
        queryKey: ['chats'],
        queryFn: async () => await getAllChats(),
        onSuccess: (data) => {
            setChats(data)
            setStaticData(data)
        }
    })

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
                <StartChatBtn
                    variant={'outline-primary'}
                    onClick={() => {
                        startChat({title: 'محادثة جديدة'}, {
                            onSuccess: (data) => {
                                console.log(data)
                                queryClient.invalidateQueries('chats')
                                navigate(`/chat/${data.id}`);
                                dispatch(setCurrentConversation(data.id));
                            }
                        })
                    }}
                >
                    <span> محادثة جديدة </span>
                    <BiPlusMedical/>
                </StartChatBtn>
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
                {chatsLoading ?
                    <>
                        <Skeleton height={15} width={230}/>
                        <Skeleton height={15} width={170}/>
                        <Skeleton height={15} width={200}/>
                        <Skeleton height={15} width={150}/>
                        <Skeleton height={15} width={210}/>
                        <Skeleton height={15} width={200}/>
                    </>
                    :
                    chats?.toReversed().map((chat) => (
                        <div key={chat.id} className={'position-relative'}>
                            <ChatLink onClick={async () => {
                                navigate(`/chat/${chat.id}`);
                                dispatch(setCurrentConversation(chat.id));
                                // setShowChat(chat.id);
                            }} className={`${currentChatId === chat.id ? 'active' : ''}`}>
                                {chat.title}
                            </ChatLink>
                            <BtnActionGroup className={'position-absolute top-50 translate-middle-y start-0 z-4'}>
                                <Model
                                    trigger={<ChatActionBtn variant={''}>
                                        <PiTrash/>
                                    </ChatActionBtn>
                                    }
                                    onSubmit={() => {
                                        mutate(chat.id, {
                                            onSuccess: async () => {
                                                await queryClient.invalidateQueries('chats')
                                                console.log('deleted')
                                            }
                                        })
                                    }}
                                />
                            </BtnActionGroup>
                        </div>

                    ))}
            </ChatsContainer>
        </SidebarLayout>
    )
        ;
};

export default ChatSideBar;
