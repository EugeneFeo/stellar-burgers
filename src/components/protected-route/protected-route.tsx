import { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode =>
  children;
