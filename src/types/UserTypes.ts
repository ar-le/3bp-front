import { IChatroom, ITeam } from "./GeneralTypes"

export interface ILogin {
    email : string,
    password: string
}

export interface INewUser{
    username: string,
    email: string,
    password: string,
    confirmPassword : string,
    extension : string,
    base64Avatar: string,
    accepts_cookies: boolean,
    accepts_communication: boolean,
    role: string,
    points: number,
    team_id : string
}

export type IRegisterUser = Omit<INewUser, 'role' | 'points' | 'team_id'>

export interface ILoggedUser {
    id: string |null,
    username: string | null,
    role: string | null,
    token: string,
    team: ITeam,
    avatar: string | null
}

export interface IUserProfile{
    id : string,
    username: string,
    avatar: string,
    totalMessages: number,
    mostUsedChats: IChatroom[],
    team? : ITeam,
    points? : number,
    recruitingTeam? : ITeam,
    joined: string
}

//export type NewUserPoints = Pick<IUserProfile, 'points'>;

export interface NewUserPoints {
    points: number
}

export interface IUser {
    id: string;
    username: string;
    avatar: string | null;
    team: ITeam;
    role: string; 
    email: string;
    points: number;
  }

  export interface PostUser {
    username: string;
    password: string;
    email: string;
    points: number;
    role: 'admin' | 'mod' | 'user';
    team_id?: string;
    accepts_cookies: boolean;
    accepts_communication: boolean;
    extension : string,
    base64Avatar: string,
    id? : string
  }
  
  export interface PutUser extends Omit<PostUser, 'password'> {
    id: string;
    password?: string;
  }