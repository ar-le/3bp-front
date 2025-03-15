import { AxiosError, AxiosResponse } from "axios";
import { httpClient } from "../../utils/httpClient";
import { ILoggedUser, ILogin, IRegisterUser } from "../../types/UserTypes";


export class AuthApi {

    static httpResponseOk(response: AxiosResponse)
    {
        return response.status >= 200 && response.status <= 299;
    }

    static async availableUsername(username : string){
        
        try{
            await httpClient.get(`availableUsername/${username}`)
            return true;
        }
        catch(error)
        {
            const axError = error as AxiosError;
            //400 es el código que devuelve el servidor si no está disponible el username
            if(axError.status != 400) return true;
            return false;
        }
    }

    static async availableEmail(email : string){
        try{
            await httpClient.get(`availableEmail/${email}`)
            return true;
        }
        catch(error )
        {
            const axError = error as AxiosError;
            if(axError.status != 400) return true;
            return false;
        }
    }


    static async login(data :ILogin)
    {
        const response = await httpClient.post<ILoggedUser>('login', data);
        
        return response;
    }

    static async register(data : IRegisterUser)
    {
        const response = await httpClient.post<ILoggedUser>('register', data);
        return response;
    }
}

