import ServerAxios from '@/helpers/ServerAxios';

export const fetchCategory = () => ServerAxios.get('/v1/category');

export const createCategory = (payload) => ServerAxios.post('/v1/category', payload);

export const findCategory = (categoryNumber) => ServerAxios.get(`/v1/category/${categoryNumber}`);

export const updateCategory = (categoryNumber, payload) => ServerAxios.patch(`/v1/category/${categoryNumber}`, payload);

export const deleteCategory = (categoryNumber) => ServerAxios.delete(`/v1/category/${categoryNumber}`);
