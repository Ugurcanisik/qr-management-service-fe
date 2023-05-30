import { useEffect, useState } from 'react';
import { fetchProducts } from '@/services/products';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';

const useProductList = () => {
    const [fetching, setFetching] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);


    const getAllProductsAsync = async () => {
        try {
            setFetching(true);
            const product = await fetchProducts();
            setProducts(product.data.data);
        } catch (err) {
            if (err?.response?.status === apiConstant.HTTP_404_DATA_NOT_FOUND) {
                setError({ message: notificationMessages.NOT_FOUND_PRODUCTS });
                return;
            }
            setError({ message: notificationMessages.UNEXPECTED_ERROR });
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getAllProductsAsync();
    }, []);

    return {
        fetching,
        products,
        error,
        refreshData:getAllProductsAsync
    };
};

export default useProductList;
