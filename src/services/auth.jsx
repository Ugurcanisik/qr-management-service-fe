import ServerAxios from '@/helpers/ServerAxios';

export const login = (payload) => ServerAxios.post('/v1/authentication/login', payload);
