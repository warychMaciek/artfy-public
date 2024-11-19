import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEventsStore from "../store/eventsStore";
import { dateToTimestamp } from "../utils/dateToTimestamp";

const useGetEvents = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const showToast = useShowToast();
    const { events, setEvents, loadMoreEvents } = useEventsStore();
    const [ lastVisibleDoc, setLastVisibleDoc ] = useState(null);
    const [ isLoadingMore, setIsLoadingMore ] = useState(false);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ showMoreButton, setShowMoreButton ] = useState(false);

    const getLastVisibleDoc = snapshot => snapshot.docs[snapshot.docs.length - 2];

    const getMoreEvents = async (inputs) => {
        setIsLoadingMore(true);
        const { location, startDate, endDate, type } = inputs;

        const startDateTimestamp = startDate ? dateToTimestamp(startDate) : null;
        const endDateTimestamp = endDate ? dateToTimestamp(endDate) : null;

        try {

            let q = collection(firestore, "events");

            if (location && location.value && location.value !== "all") {
                q = query(q, where("location.value", "==", location.value));
            }

            if (startDateTimestamp) {
                q = query(q, where("startDate", ">=", startDateTimestamp), where("endDate", ">", startDateTimestamp));
            }

            if (endDateTimestamp) {
                q = query(q, where("endDate", "<=", endDateTimestamp), where("startDate", "<", endDateTimestamp));
            }

            if (type && type.value && type.value !== "all") {
                q = query(q, where("type.value", "==", type.value));
            }

            q = query(q, orderBy("createdAt", "desc"), startAfter(lastVisibleDoc), limit(9));
            
            const querySnapshot = await getDocs(q);
            const moreEventsArray = [];

            if (querySnapshot.empty) return;

            setLastVisibleDoc(getLastVisibleDoc(querySnapshot));

            let index = 0;
            querySnapshot.forEach(doc => {
                if (index < 8) {
                    moreEventsArray.push({id: doc.id, ...doc.data()});
                }
                index++;
            });

            loadMoreEvents(moreEventsArray);

            querySnapshot.docs.length > 8 ? setShowMoreButton(true) : setShowMoreButton(false);
            
        } catch (error) {
            showToast("Błąd", error.message, "error");
        } finally {
            setIsLoadingMore(false);
        }

    }

    const searchEvents = async (inputs) => {
        setIsSearching(true);
        const { location, startDate, endDate, type } = inputs;

        const startDateTimestamp = startDate ? dateToTimestamp(startDate) : null;
        const endDateTimestamp = endDate ? dateToTimestamp(endDate) : null;

        try {

            let q = collection(firestore, "events");

            if (location && location.value && location.value !== "all") {
                q = query(q, where("location.value", "==", location.value));
            }

            if (startDateTimestamp) {
                q = query(q, where("startDate", ">=", startDateTimestamp), where("endDate", ">", startDateTimestamp));
            }

            if (endDateTimestamp) {
                q = query(q, where("endDate", "<=", endDateTimestamp), where("startDate", "<", endDateTimestamp));
            }

            if (type && type.value && type.value !== "all") {
                q = query(q, where("type.value", "==", type.value));
            }

            q = query(q, orderBy("createdAt", "desc"), limit(9));
            
            const querySnapshot = await getDocs(q);
            const eventsArray = [];

            if (querySnapshot.empty) return setEvents(null);

            setLastVisibleDoc(getLastVisibleDoc(querySnapshot));

            let index = 0;
            querySnapshot.forEach(doc => {
                if (index < 8) {
                    eventsArray.push({id: doc.id, ...doc.data()});
                }
                index++;
            });

            setEvents(eventsArray);

            querySnapshot.docs.length > 8 ? setShowMoreButton(true) : setShowMoreButton(false);

        } catch (error) {
            showToast("Błąd", error.message, "error");
        } finally {
            setIsSearching(false);
        }

    }

    useEffect(() => {
        const getEvents = async () => {
            setIsLoading(true);

            try {
                
                const q = query(collection(firestore, "events"), orderBy("createdAt", "desc"), limit(9));
                const querySnapshot = await getDocs(q);
                const eventsArray = [];

                if (querySnapshot.empty) return setEvents(null);

                setLastVisibleDoc(getLastVisibleDoc(querySnapshot));

                let index = 0;
                querySnapshot.forEach(doc => {
                    if (index < 8) {
                        eventsArray.push({id: doc.id, ...doc.data()});
                    }
                    index++;
                });

                setEvents(eventsArray);

                querySnapshot.docs.length > 8 ? setShowMoreButton(true) : setShowMoreButton(false);

            } catch (error) {
                showToast("Błąd", error.message, "error");
            } finally {
                setIsLoading(false);
            }

        }

        getEvents();

    }, []);

    return { isLoading, events, getMoreEvents, isLoadingMore, searchEvents, isSearching, showMoreButton };
}

export default useGetEvents;