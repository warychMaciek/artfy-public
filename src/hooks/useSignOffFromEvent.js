import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useEventStore from "../store/eventStore";
import useShowToast from "./useShowToast";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSignOffFromEvent = () => {
    const [ isSigningOff, setIsSigningOff ] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);
    const { event, setEvent } = useEventStore();
    const showToast = useShowToast();

    const signOffFromEvent = async () => {
        if (isSigningOff || !authUser) return;
        setIsSigningOff(true);

        try {
            
            const userDocRef = doc(firestore, "users", authUser.uid);
            const eventDocRef = doc(firestore, "events", event.uid);

            const updatedEventsJoined = authUser.eventsJoined.filter(e => e !== event.uid);
            const updatedParticipants = event.participants.filter(participant => participant !== authUser.uid);

            const updatedUser = {
                ...authUser,
                eventsJoined: updatedEventsJoined
            }

            const updatedEvent = {
                ...event,
                participants: updatedParticipants
            }

            await updateDoc(userDocRef, updatedUser);
            await updateDoc(eventDocRef, updatedEvent);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            setEvent(updatedEvent);
            showToast("Udało się!", "Pomyślnie wyrejestrowano z eventu", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsSigningOff(false);
        }
    }

    return { isSigningOff, signOffFromEvent };
}

export default useSignOffFromEvent;