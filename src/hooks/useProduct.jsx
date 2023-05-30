import { useEffect, useState } from 'react';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';
import {findProduct} from "@/services/products.jsx";

const useProduct = (productNumber) => {
    const [fetching, setFetching] = useState(true);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null);


    const getProductAsync = async () => {
        try {
            setFetching(true);
            const productData = await findProduct(productNumber);
            setProduct(productData.data.data);
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
        getProductAsync();
    }, []);

    return {
        fetching,
        product,
        error
    };
};

export default useProduct;
