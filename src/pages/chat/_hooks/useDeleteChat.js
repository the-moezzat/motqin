import {useMutation} from "react-query";
import axios from "axios";

export default function useDeleteChat() {
    const {mutate, isLoading} = useMutation({
        mutationFn: async (chatId) => {
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            };

            const chat = await axios.delete(`https://srv475086.hstgr.cloud/api/v1/chatbot/conversations/${chatId}/delete/`, {headers})
        }
    })

    return {mutate, isLoading}
}