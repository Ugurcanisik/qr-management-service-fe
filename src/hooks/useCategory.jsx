import { useEffect, useState } from 'react';
import { findCategory } from '@/services/category.jsx';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';

const useCategory = (categoryNumber) => {
    const [fetching, setFetching] = useState(true);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);


    const getCategoryAsync = async () => {
        try {
            setFetching(true);
            const categoryData = await findCategory(categoryNumber);
            setCategory(categoryData.data.data);
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
        getCategoryAsync();
    }, []);

    return {
        fetching,
        category,
        error
    };
};

export default useCategory;
