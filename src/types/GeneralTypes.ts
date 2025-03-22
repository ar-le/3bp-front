export interface ApiMessage{
    msg : string
}


export interface ITransmission{
    id : string,
    title : string,
    content: string,
    type: string,
    date: string
}

export interface JsonResponseList<T> 
{
    total: number,
    data: T[]
}
export interface JsonResponseSingle<T>  
{
    data: T
}

