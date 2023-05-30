import { useEffect, useState } from 'react';
import { fetchCategory } from '@/services/category.jsx';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';

const useCategoryList = () => {
    const [fetching, setFetching] = useState(true);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);


    const getAllCategoryAsync = async () => {
        try {
            setFetching(true);
            const categoryData = await fetchCategory();
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
        getAllCategoryAsync();
    }, []);

    return {
        fetching,
        category,
        error,
        refreshData:getAllCategoryAsync
    };
};

export default useCategoryList;
