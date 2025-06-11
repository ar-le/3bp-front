import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login, selectTeam, selectUser, setTeam } from "../authSlice";
import { ProtectedRouteProps } from "./ProtectedRouteTypes";
import { LocalStorageManager } from "../../../utils/localStorageManagement";
import { ILoggedUser } from "../../../types/UserTypes";
import { useEffect } from "react";
import { createWebsocketConnection } from "../../../utils/echo";
import { httpClient } from "../../../utils/httpClient";

function AuthGuard({
  redirectPath = "/",
  children,
  roles,
}: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  let user: ILoggedUser | null = useAppSelector(selectUser);
  let team : string |null = useAppSelector(selectTeam);
  console.log("authroute");
  console.log(user);

  //cuando se lee un user nuevo loguearlo
  useEffect(() => {
    if (user != null) {
      dispatch(login(user));

    }

    //if (user) createWebsocketConnection(user.token);
  }, [user]);

  //si se lee un equipo añadirlo al estado
  useEffect(() => {
    if(team != null || team != '')
      dispatch(setTeam(team ?? ''))
   
  },[team])

  //si no hay user buscar en localstorage
  if (!useAppSelector(selectUser)) {
    user = LocalStorageManager.get<ILoggedUser>("loggedUser");
    if (user) createWebsocketConnection(user.token);
    
  }

  httpClient.interceptors.request.use(function (config) {
      if (user) config.headers["Authorization"] = `Bearer ${user.token}`;

      return config;
    });

  if(!useAppSelector(selectTeam))
  {
    team = LocalStorageManager.get<string>('team');
  }

  //si hay equipo añadir una clase para que modifique el css
  if(team)
  {
    document.querySelector('body')?.classList.add(team.toLowerCase());
  }

  /*Se redirige si:
        -Hay usuario pero no hay roles (significa que la ruta es solo para guests)
        -No hay usuario pero hay roles (hay que estar logueado para acceder)
        -Hay usuario pero no tiene el rol correcto para la ruta
    */

  if (
    (user?.token && roles.length == 0) ||
    (!user && roles.length > 0) ||
    (user && user.role && !roles.includes(user.role))
  )
    return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
}

export default AuthGuard;
