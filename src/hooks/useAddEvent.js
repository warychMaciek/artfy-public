import { useState } from "react";
import useAuthStore from "../store/authStore";
import useEventStore from "../store/eventStore";
import useShowToast from "./useShowToast";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { dateToTimestamp } from "../utils/dateToTimestamp";

const useAddEvent = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);
    const setEvent = useEventStore(state => state.setEvent);
    const showToast = useShowToast();
    const navigateTo = useNavigate();

    const addEvent = async (inputs, images) => {
        if (isLoading || !authUser) return;
        setIsLoading(true);

        const startDateTimestamp = dateToTimestamp(inputs.startDate);
        const endDateTimestamp = dateToTimestamp(inputs.endDate);

        const newEventDoc = {
            uid: "",
            startDate: startDateTimestamp,
            startTime: inputs.startTime,
            endDate: endDateTimestamp,
            endTime: inputs.endTime,
            price: inputs.price,
            location: inputs.location,
            title: inputs.title,
            desc: inputs.desc,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            participants: [],
            comments: [],
            photos: [],
            address: inputs.address,
            addressURL: inputs.addressURL,
            scope: inputs.scope,
            type: inputs.type,
            slots: inputs.slots,
            contributors: inputs.contributors
        }

        try {

            const eventDocRef = await addDoc(collection(firestore, "events"), newEventDoc);
            const userDocRef = doc(firestore, "users", authUser.uid);
            
            await updateDoc(userDocRef, {eventsCreated: arrayUnion(eventDocRef.id)});
            await updateDoc(eventDocRef, {uid: eventDocRef.id});

            if (images.length > 0) {
                let index = 0;

                for (const image of images) {
                    const imageRef = ref(storage, `eventsImages/${eventDocRef.id}/${index}`);
                    await uploadString(imageRef, image, "data_url");
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(eventDocRef, {photos: arrayUnion(downloadURL)});
                    newEventDoc.photos.push(downloadURL);

                    index++;
                }

            }

            setEvent(eventDocRef);
            setAuthUser({ ...authUser, eventsCreated: [...authUser.eventsCreated, eventDocRef.id] });
            localStorage.setItem("user-info", JSON.stringify({ ...authUser, eventsCreated: [...authUser.eventsCreated, eventDocRef.id] }));
            showToast("Success", "Event added successfully", "success");
            navigateTo(`/event/${eventDocRef.id}`);
            
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, addEvent };
}

export default useAddEvent;