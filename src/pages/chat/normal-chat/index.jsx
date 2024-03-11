import React from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import MessageInput from "../_components/MessageInput";
import ChooseModel from "../../../components/ui/ChooseModel";
import {Stack} from "react-bootstrap";
import Message from "./_components/Message";
import {useQuery, useQueryClient, useMutation} from "react-query";
import axios from "axios";


const Main = styled.div`
    padding: 14px;
    display: grid;
    gap: 14px;
    grid-template-rows: 1fr auto;
    height: calc(100vh - 73px);
`

const MessageColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow: scroll;
    height: 100%;
`

function NormalChat() {
    const {chatId} = useParams()
    const queryClient = useQueryClient();

    const {isLoading, isError, data} = useQuery({
        queryKey: ['chat'],
        queryFn: async() => {
        const response = await axios.get(`https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${chatId}/messages/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    },
        staleTime: Infinity
})

    const messages = !isLoading || data ? data?.results?.toReversed() : [];

    const {mutate, isLoading: isWriting} = useMutation({
        mutationKey: ['chat'],
        mutationFn: async (message) => {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            };

            const data = {
                content: message,
                conversation: chatId
            };

            const chat = await axios.post('https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/82502563769/messages/create/', data, {headers})

            return chat.data
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('chat')
            console.log(data);
        }
    })

    return (
        <Main>
            <MessageColumn gap={5} direction={"vertical"} dir={"rtl"}>
                {messages.map((message) => {
                    return <Message from={message.is_from_user ? 'user' : 'ai'} message={message.content} key={message.id}/>
                })}

                {isWriting && <Message from={'ai'} message={"يكتب..."} isResponding={isWriting}/>}
            </MessageColumn>

            <Stack gap={3} direction={'horizontal'}>
                <ChooseModel/>
                <MessageInput onSubmit={mutate} isDisabled={isWriting}/>
            </Stack>
        </Main>
    );
}

export default NormalChat;