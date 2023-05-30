import ServerAxios from '@/helpers/ServerAxios';

export const fetchUser = () => ServerAxios.get('/v1/users');

export const createUser = (payload) => ServerAxios.post('/v1/users', payload);

export const findUser = (userNumber) => ServerAxios.get(`/v1/users/${userNumber}`);

export const updateUser = (userNumber, payload) => ServerAxios.patch(`/v1/users/${userNumber}`, payload);

export const deleteUser = (userNumber) => ServerAxios.delete(`/v1/users/${userNumber}`);
