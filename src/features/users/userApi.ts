import {ChatUserInfo, PaginatedResponse, JsonResponseSingle, JsonResponseList, MessageResponse } from "../../types/GeneralTypes";
import { IUser, IUserProfile, NewUserPoints, PostUser } from "../../types/UserTypes";
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

    static async getAll(page:string)
    {
        return httpClient.get<PaginatedResponse<IUser>>('users', {params: {page: page}});
    }

    static async delete(id: string)
    {
        return httpClient.delete(`users/${id}`);
    }

    static async get(id:string)
    {
        return httpClient.get(`users/${id}`);
    }

    static async create(user : PostUser)
    {
        return httpClient.post<IUser>(`users`, user);
    }

    static async update(user : PostUser)
    {
        return httpClient.put<IUser>(`users`, user);
    }


}
