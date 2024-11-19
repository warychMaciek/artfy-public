import { useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEventStore from "../store/eventStore";

const useSignUpForEvent = () => {
    const [ isSigningUp, setIsSigningUp ] = useState(false);
    const authUser = useAuthStore(state => state.user);
    const setAuthUser = useAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile);
    const { event, setEvent } = useEventStore();
    const showToast = useShowToast();

    const signUpForEvent = async () => {
        if (isSigningUp || !authUser) return;
        setIsSigningUp(true);

        try {
            
            const userDocRef = doc(firestore, "users", authUser.uid);
            const eventDocRef = doc(firestore, "events", event.uid);

            const updatedUser = {
                ...authUser,
                eventsJoined: [...authUser.eventsJoined, event.uid]
            }

            const updatedEvent = {
                ...event,
                participants: [...event.participants, authUser.uid]
            }

            await updateDoc(userDocRef, updatedUser);
            await updateDoc(eventDocRef, updatedEvent);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            setEvent(updatedEvent);
            showToast("Udało się!", "Pomyślnie zapisano na event", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsSigningUp(false);
        }

    }

    return { signUpForEvent, isSigningUp };
}

export default useSignUpForEvent;