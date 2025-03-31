import { IChatroom, IPostChatroom, PaginatedResponse, JsonResponseSingle, ChatMessage } from "../../types/GeneralTypes";
import { httpClient } from "../../utils/httpClient";


export class ChatroomsApi{
    static async getChatrooms(filters:Record<string, string> | null = null){
        return httpClient.get<PaginatedResponse<IChatroom>>("chatrooms", {params: filters});
    }

    static async getChatroom(chatroom: string){
        return httpClient.get<JsonResponseSingle<IChatroom>>(`chatroomInfo`, {params: {chatroom}});
    }

    static async getTeamChatrooms()
    {
        return httpClient.get<PaginatedResponse<IChatroom>>("chatrooms/userteams");
    }

    /* Peticiones para obtener las chatrooms paginadas */
    static async getPaginatedChatrooms(page: number){
        return httpClient.get<PaginatedResponse<IChatroom>>(`chatrooms?page=${page}`);
    }

    static async createChatroom (chatroom : IPostChatroom)
    {
        return httpClient.post<JsonResponseSingle<IChatroom>>('chatrooms/create', chatroom);
    }

    static async getMessages(chatroom: string, cursor: string)
    {
        return httpClient.get<PaginatedResponse<ChatMessage>>(`chatmessages`, {params: {
            cursor,
            chatroom 
        }});
    }
}