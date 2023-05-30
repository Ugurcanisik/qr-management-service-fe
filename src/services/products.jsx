import ServerAxios from '@/helpers/ServerAxios';

export const fetchProducts = () => ServerAxios.get('/v1/products');

export const createProduct = (payload) => ServerAxios.post('/v1/products', payload);

export const findProduct = (productNumber) => ServerAxios.get(`/v1/products/${productNumber}`);

export const updateProduct = (productNumber, payload) => ServerAxios.patch(`/v1/products/${productNumber}`, payload);

export const deleteProduct = (productNumber) => ServerAxios.delete(`/v1/products/${productNumber}`);
