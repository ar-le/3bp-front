/* import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {  login, loginAsync, selectRole, selectUsername } from "../authSlice";
import { ProtectedRouteProps } from "./ProtectedRouteTypes";
import { LocalStorageManager } from "../../../utils/localStorageManagement";
import { ILoggedUser } from "../../../types/UserTypes";


function AuthGuard({
    redirectPath = "/",
    children,
    roles
}: ProtectedRouteProps) {
    const dispatch = useAppDispatch();
    let user: ILoggedUser | null = useAppSelector(selectUser);

    //si no hay user buscar en localstorage
    if(!user){
        user = LocalStorageManager.get<ILoggedUser>('loggedUser');
        //si hay información guardarla en el estado
        if(user) dispatch(login(user));
    } */

    /*Se redirige si:
        -Hay usuario pero no hay roles (significa que la ruta es solo para guests)
        -No hay usuario pero hay roles (hay que estar logueado para acceder)
        -Hay usuario pero no tiene el rol correcto para la ruta
    */
 
/*    
    if(
        (user?.token && roles.length == 0) || 
        (!user?.token && roles.length > 0 )|| 
        (user && user.role && !roles.includes(user.role))
    )
        return <Navigate to={redirectPath} replace />;

    return children ? children : <Outlet />;
}

export default AuthGuard; */