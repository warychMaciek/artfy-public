import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useContributorsStore from "../store/contributorsStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useParticipantsStore from "../store/participantsStore";

const useGetUsersProfilesByIds = (ids, role) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const showToast = useShowToast();
    const { contributors, setContributors } = useContributorsStore();
    const { participants, setParticipants } = useParticipantsStore();
    const users = role === 'participants' ? participants : contributors;
    const setUsers = role === 'participants' ? setParticipants : setContributors;
    
    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);

            try {

                const q = query(collection(firestore, "users"), where("uid", "in", ids));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setUsers([]);

                const usersDocs = [];
                querySnapshot.forEach(doc => {
                    const userData = doc.data();
                    let singleUser = {
                        fullName: userData.fullName,
                        profilePicURL: userData.profilePicURL,
                        username: userData.username
                    }
                    usersDocs.push(singleUser);
                });

                setUsers(usersDocs);
                
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        if (ids.length > 0) {
            getUsers();
        } else {
            setUsers([]);
        }
    }, [setUsers, ids, showToast]);

    return { isLoading, users };
}

export default useGetUsersProfilesByIds;