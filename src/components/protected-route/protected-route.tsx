import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();

  const { isAuth, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return null;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from?.pathname || '/';

    return <Navigate to={from} replace />;
  }

  return children;
};
