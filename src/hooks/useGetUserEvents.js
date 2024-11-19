import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserEventsStore from "../store/userEventsStore";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserEvents = (eventsCreated, eventsJoined) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const showToast = useShowToast();
    const { userEventsCreated, setUserEventsCreated, userEventsJoined, setUserEventsJoined } = useUserEventsStore();
    // const { userProfile, setUserProfile } = useUserProfileStore(); // testowac czy wywalenie tego nie wywali bledu na profilu

    const getUserEvents = async (eventsCreated, eventsJoined) => {
        setIsLoading(true);

        try {
            // nie uwzględniac eventów, które już się odbyły / w query porownac z today

            if (eventsCreated.length !== 0) {
                const qCreated = query(collection(firestore, "events"), where("uid", "in", eventsCreated), orderBy("startDate", "asc"), limit(2));
                const querySnapshotCreated = await getDocs(qCreated);

                if (!querySnapshotCreated.empty) {
                    const eventsCreatedArray = [];
                    querySnapshotCreated.forEach(doc => {
                        eventsCreatedArray.push({ id: doc.id, ...doc.data() });
                    });
                    setUserEventsCreated(eventsCreatedArray);
                }
            } else {
                setUserEventsCreated([]);
            }

            if (eventsJoined.length !== 0) {
                const qJoined = query(collection(firestore, "events"), where("uid", "in", eventsJoined), orderBy("startDate", "asc"), limit(2));
                const querySnapshotJoined = await getDocs(qJoined);

                if (!querySnapshotJoined.empty) {
                    const eventsJoinedArray = [];
                    querySnapshotJoined.forEach(doc => {
                        eventsJoinedArray.push({ id: doc.id, ...doc.data() });
                    });
                    setUserEventsJoined(eventsJoinedArray);
                }
            } else {
                setUserEventsJoined([]);
            }

        } catch (error) {
            showToast("Błąd", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserEvents(eventsCreated, eventsJoined);
    }, [eventsCreated, eventsJoined, showToast, setUserEventsCreated, setUserEventsJoined]);

    return { isLoading, userEventsCreated, userEventsJoined, getUserEvents };
};

export default useGetUserEvents;