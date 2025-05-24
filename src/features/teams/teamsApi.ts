import { IUpdateTeamRecruiting } from "../../types/GeneralTypes";
import { httpClient } from "../../utils/httpClient";

export class TeamsApi{
    static async getAll()
    {
        return httpClient.get('teams');
    }

    static async getTeam(id: string)
    {
        return httpClient.get('teams/get',{params: {team :id}}); 
    }

    static async updateRecruiting(data: IUpdateTeamRecruiting)
    {
        console.log(data);
        
        return httpClient.put('teams/recruiting', data);
    }
}