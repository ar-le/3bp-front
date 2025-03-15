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
    username: string | null,
    role: string | null,
    token: string | null,
    team_id: string | null,
    avatar: string | null
}


