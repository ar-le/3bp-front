import { AxiosError, AxiosResponse } from "axios";
import { httpClient } from "../../utils/httpClient";
import { ITransmission, JsonResponseList, JsonResponseSingle, PostTransmission, PutTransmission } from "../../types/GeneralTypes";

export class TransmissionsApi {
    static async getAll()
    {
        const response = httpClient.get<JsonResponseList<ITransmission>>('transmissions');
        return response;
    }

    static async get(id: string)
    {
        const response = httpClient.get<JsonResponseSingle<ITransmission>>(`transmission/${id}`);
        return response;
    }

    static async create(transmission : PostTransmission)
    {
        return httpClient.post<ITransmission>('transmissions', transmission);
    }

    static async update(transmission : PutTransmission)
    {
        return httpClient.put<ITransmission>('transmissions', transmission);
    }

    static async delete(id: string)
    {
        return httpClient.delete<ITransmission>(`transmissions/${id}`);
    }

}