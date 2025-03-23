import { IChatroom, JsonResponseList, PaginatedResponse } from "../../types/GeneralTypes";
import { httpClient } from "../../utils/httpClient";


export class ChatroomsApi{
    static async getChatrooms(){
        return httpClient.get<PaginatedResponse<IChatroom>>("chatrooms");
    }

    static async getTeamChatrooms()
    {
        return httpClient.get<PaginatedResponse<IChatroom>>("chatrooms/userteams");
    }

    /* Peticiones para obtener las chatrooms paginadas */
    static async getPaginatedChatrooms(page: number){
        return httpClient.get<PaginatedResponse<IChatroom>>(`chatrooms?page=${page}`);
    }
}