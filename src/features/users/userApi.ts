import {ChatUserInfo, PaginatedResponse, JsonResponseSingle, JsonResponseList, MessageResponse } from "../../types/GeneralTypes";
import { IUserProfile, NewUserPoints } from "../../types/UserTypes";
import { httpClient } from "../../utils/httpClient";


export class UsersApi{
    static async getModCharacters()
    {
        return httpClient.get<JsonResponseList<ChatUserInfo>>(`users/mod/characters`);
    }

    static async getUserProfileInfo(user:string)
    {
        return httpClient.get<JsonResponseSingle<IUserProfile>>('users/profile', {params: {id: user}});
    }

    static async givePoints(user:string, points:number)
    {
        return httpClient.put<JsonResponseSingle<IUserProfile>>('users/givePoints', {user , points});
    }

    static async joinTeam(team: string, password: string)
    {
        return httpClient.get<MessageResponse>('joinTeam', {params : {team, password}})
    }


}
