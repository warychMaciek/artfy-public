import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useEventStore from "../store/eventStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetEventById = (id) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const showToast = useShowToast();
    const { event, setEvent } = useEventStore();

    useEffect(() => {
        const getEvent = async () => {
            setIsLoading(true);

            try {

                const q = query(collection(firestore, "events"), where("uid", "==", id));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setEvent(null);

                let eventDoc;
                querySnapshot.forEach(doc => {
                    eventDoc = doc.data();
                });

                setEvent(eventDoc);
                
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        getEvent();
    }, [setEvent, id, showToast]);

    return { isLoading, event };
}

export default useGetEventById;