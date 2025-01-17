import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const useRegisterWithCredentials = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login);
    const navigateTo = useNavigate();

    const signup = async (inputs, closeModal) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }

        const usersRef = collection(firestore, "users");

        const q = query(usersRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return;
        }

        try {

            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    profilePicURL: "",
                    bio: "",
                    birthDate: "",
                    location: "",
                    createdAt: Date.now(),
                    eventsCreated: [],
                    eventsJoined: [],
                    role: "",
                    photos: [],
                    reviews: [],
                    scope: []
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                closeModal();
                navigateTo("/events");
            }
            
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {loading, error, signup};
}

export default useRegisterWithCredentials;