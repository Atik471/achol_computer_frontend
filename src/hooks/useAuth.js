import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authServices.js';
import { setAccessToken } from '../services/api.js';
import { AuthContext } from '../contexts/AuthProvider.jsx';
import { useContext } from 'react';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // save token to memory
      setAccessToken(data.accessToken);

      // refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useContext(AuthContext);
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.clear();
    },
  });
};
