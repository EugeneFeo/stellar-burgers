import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';

import { logoutUser } from '../../services/actions/user';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
