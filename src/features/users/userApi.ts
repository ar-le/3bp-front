import {ChatUserInfo, PaginatedResponse, JsonResponseSingle, JsonResponseList } from "../../types/GeneralTypes";
import { httpClient } from "../../utils/httpClient";


export class UsersApi{
    static async getModCharacters()
    {
        return httpClient.get<JsonResponseList<ChatUserInfo>>(`users/mod/characters`);
    }

}
