export interface ProtectedRouteProps  {
    roles: string[]
    children?: React.ReactNode,
    redirectPath?: string;
  };