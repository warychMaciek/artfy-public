import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const showToast = useShowToast();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state => state.login);
    const navigateTo = useNavigate();

    const login = async (inputs, closeModal) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill all the fields", "error");
        }

        try {
            
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
                closeModal();
                navigateTo("/events");
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return { loading, error, login };
}

export default useLogin;