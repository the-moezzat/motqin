import {useMutation} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useActiveModel from "./useActiveModel";

export default function useStartChat() {
    const {model: currentModel} = useActiveModel()
    const navigate = useNavigate()

    const {mutate: startChat, isLoading, isError, data} = useMutation({
        mutationFn: async ({title, message, model = currentModel}) => {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            };
            const conversationData = {
                title: title,
                model,
                archive: false,
                favourite: false
            };
            const chat = await axios.post('https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/', conversationData, {headers})

            // const messageData = {
            //     content: message,
            //     ai_model: model,
            //     conversation: chat.data.id
            // }
            // const firstMessage = await axios.post(`https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${chat.data.id}/messages/create/`, messageData, {headers})

            return chat.data;
        },
        // onSuccess(data) {
        //     navigate(`/chat/${data.id}?message=${message}`)
        // }
    })

    return {startChat, isLoading, isError, data}
}