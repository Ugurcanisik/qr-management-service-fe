import { useEffect, useState } from 'react';
import {
    api as apiConstant,
    notificationMessages
} from '../constants';
import {findUser} from "@/services/user";

const useUser = (userNumber) => {
    const [fetching, setFetching] = useState(true);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);


    const getUserAsync = async () => {
        try {
            setFetching(true);
            const userData = await findUser(userNumber);
            setUser(userData.data.data);
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
        getUserAsync();
    }, []);

    return {
        fetching,
        user,
        error
    };
};

export default useUser;
