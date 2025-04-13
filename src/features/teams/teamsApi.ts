import { httpClient } from "../../utils/httpClient";

export class TeamsApi{
    static async getAll()
    {
        return httpClient.get('teams');
    }
}