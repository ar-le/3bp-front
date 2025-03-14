import { AxiosResponse } from "axios";
import { httpClient } from "../../utils/httpClient";
import { ILoggedUser, ILogin, IRegisterUser } from "../../types/UserTypes";


export class AuthApi {

    static httpResponseOk(response: AxiosResponse)
    {
        return response.status >= 200 && response.status <= 299;
    }

    static async availableUsername(username : string){
        
        try{
            const response = await httpClient.get('availableUsername', { 
                params : {
                    username: username
                }
            })
            return true;
        }
        catch(error)
        {
            return false;
        }
    }

    static async availableEmail(email : string){
        
        try{
            const response = await httpClient.get('availableEmail', { 
                params : {
                    email
                }
            })
            return true;
        }
        catch(error)
        {
            return false;
        }
    }


    static async login(data :ILogin)
    {
        const response = await httpClient.post<ILoggedUser>('login', data);
        //actualizar authslice
        return response;
    }

    static async register(data : IRegisterUser)
    {
        const response = await httpClient.post<ILoggedUser>('register', data);
        return response;
    }
}

export async function loginIndependiente(data :ILogin)
    {
        //const response = await httpClient.post<ILoggedUser>('login', data);
        const response = await fetch('/login');
        //actualizar authslice
        return response;
    }
