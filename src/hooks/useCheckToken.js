import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCheckToken = () => {
    return useQuery({
        queryKey: ['check-token'],
        queryFn: async () => {
            try {
                const res = await axios.get('/protected.php', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                );
                // If successful, return user data
                return res.data;
            } catch (error) {
                // Throw error to react-query
                throw new Error(error.response?.data?.error || 'Token check failed');
            }
        },
        refetchInterval: 3600000, // 1 hour in ms
        refetchIntervalInBackground: true, // keeps checking even when tab not focused
        refetchOnWindowFocus: true,
        onError: (err) => {
            console.log('Token is invalid or expired:', err.message);
            // Optional: redirect to login or clear token
            localStorage.removeItem('token');
            window.location.href = '/login';
        },
    });
};

export default useCheckToken;