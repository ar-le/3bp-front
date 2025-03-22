import { AxiosError, AxiosResponse } from "axios";
import { httpClient } from "../../utils/httpClient";
import { ITransmission, JsonResponseList, JsonResponseSingle } from "../../types/GeneralTypes";

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

}