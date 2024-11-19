import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const showToast = useShowToast();

    const getUserProfile = async (searchedUser) => {
        setIsLoading(true);
        setUsers([]);

        try {
            
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, 
                or(
                    where('username', '==', searchedUser),
                    where('fullName', '==', searchedUser)
                )
            );

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return showToast("Error", "User not found", "error");

            querySnapshot.forEach(doc => {
                setUsers(users => ([...users, doc.data()]));
            });

        } catch (error) {
            showToast("Error", error.message, "error");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, getUserProfile, users, setUsers };
}

export default useSearchUser;