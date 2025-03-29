export interface ApiMessage {
  msg: string;
}

export interface ITransmission {
  id: string;
  title: string;
  content: string;
  type: string;
  date: string;
}

export interface JsonResponseList<T> {
  total: number;
  data: T[];
}
export interface JsonResponseSingle<T> {
  data: T;
}

export interface IChatroom {
  id: string;
  name: string;
  description: string;
  creator: {
    id: string;
    username: string;
  };
  team_id: string;
}

export interface IPostChatroom {
  name: string;
  description: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
