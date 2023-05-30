import { useEffect, useState } from 'react';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';
import {fetchUser} from "@/services/user";

const useUserList = () => {
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);


    const getAllUsersAsync = async () => {
        try {
            setFetching(true);
            const users = await fetchUser();
            setUsers(users.data.data);
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
        getAllUsersAsync();
    }, []);

    return {
        fetching,
        users,
        error,
        refreshData:getAllUsersAsync
    };
};

export default useUserList;
