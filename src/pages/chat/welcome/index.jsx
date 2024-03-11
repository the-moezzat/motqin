import React from 'react';
import ChooseModel from "../../../components/ui/ChooseModel";
import {Stack} from "react-bootstrap";
import ChatExample from "../_components/ChatExample";
import MessageInput from "../_components/MessageInput";
import styled from "styled-components";
import {useMutation} from "react-query";
import axios from "axios";

const Main = styled.div`
    padding: 14px;
    display: grid;
    grid-template-rows: auto 1fr;
    height: calc(100vh - 73px);
`
const ChatLogo = styled.img`
    width: 200px;
`
const Headline = styled.h1`
    font-size: 24px;
    color: #5225CE;
    font-weight: 600;
    text-align: center;
`
const Description = styled.p`
    font-size: 24px;
    color: #5225CE;
    font-weight: 300;
    text-align: center;
`

const ChatHeader = styled.header`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-items: center;
`

const ExamplesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin-top: auto;
`

function Welcome() {

    const {mutate} = useMutation(async (message) => {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNTM2MTUxLCJpYXQiOjE3MDkyNDAxNTEsImp0aSI6IjVhZjBlMGEyMWQzOTQ5Y2E4OTMyNTU3NjBmN2RjMzdlIiwidXNlcl9pZCI6MjN9.ky97KcdrHdTAl0R2JRRVxg5WdcFUDaRyc1D3i4XylIs"
            };

            const data = {
                title: "My Title",
                favourite: false,
                archive: false
            };
           const chat = await axios.post('https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/', data, {headers})

        return chat.data
        },
   {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    }
)

    const handleSubmit = (message) => {
        console.log(message)
        mutate(message)
    }

    return (
        <Main>
            <div className={'ms-auto'}>
                <ChooseModel/>
            </div>
            <Stack direction={'vertical'} gap={2}>
                <ChatHeader>
                    <ChatLogo src={'/src/assets/logo.svg'}  alt={'Motqin logo'}/>
                    <div>
                        <Headline>
                            مرحبا بك في مُتقِن شات
                        </Headline>
                        <Description>
                            كيف أستطيع مساعدتك اليوم؟
                        </Description>
                    </div>
                </ChatHeader>

                <Stack direction={'vertical'} gap={3}>
                    <ExamplesGrid>
                        <ChatExample title={"إنشاء استراتيجية تسويق"} description={"ما هي العوامل الأساسية التي يجب مراعاتها عند إنشاء استراتيجية تسويق رقمي شاملة؟"}/>

                        <ChatExample title={"التخطيط لحملة على وسائل التواصل الاجتماعي"} description={"قم بصياغة حملة على وسائل التواصل الاجتماعي لبراند ملابس."}/>

                        <ChatExample title={"زيادة معدلات النقر إلى الظهور"} description={"اقترح طرق مبتكرة لزيادة معدلات النقر على رسائل البريد الإلكتروني."}/>

                        <ChatExample title={"تحسين تجربة خدمة العملاء لدينا"} description={"اقترح علينا كيف يمكننا تحسين تجربة خدمة العملاء لدينا؟"}/>
                    </ExamplesGrid>
                    <MessageInput onSubmit={handleSubmit}/>
                </Stack>
            </Stack>
        </Main>
    );
}

export default Welcome;