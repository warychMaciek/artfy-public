import { Flex, Image, Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth, firestore } from "../../firebase/firebase"
import useShowToast from "../../hooks/useShowToast"
import useAuthStore from "../../store/authStore"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const GoogleAuth = ({ closeModal }) => {
    const [ signInWithGoogle, , , error] = useSignInWithGoogle(auth)
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)
    const navigateTo = useNavigate()

    const handleGoogleAuth = async () => {
        try {
            
            const newUser = await signInWithGoogle()

            if (!newUser && error) {
                showToast("Błąd", error.message, "error")
                return
            }

            const userRef = doc(firestore, "users", newUser.user.uid)
            const userSnap = await getDoc(userRef)

            if (userSnap.exists()) {

                const userDoc = userSnap.data()
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
                closeModal && closeModal()
                navigateTo("/events")

            } else {

                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    profilePicURL: newUser.user.photoURL,
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

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
                closeModal && closeModal()
                navigateTo("/events")

            }

        } catch (error) {
            showToast("Błąd", error.message, "error")
        }
    }

    return (
        <Flex
            onClick={handleGoogleAuth}
            alignItems={"center"} 
            justifyContent={"center"} 
            cursor={"pointer"}
            fontFamily={"header"}
            fontWeight={600}
            fontSize={"14px"}
            lineHeight={"24px"}
            textTransform={"uppercase"}
            padding={"10px 30px"}
            borderRadius={"30px"}
            bg={"transparent"}
            border={"1px solid"}
            borderColor={"decorative"}
            transition={"0.3s ease"}
            position={"relative"}
            _hover={{ boxShadow: "0px 0px 10px 0px #04A777" }}
        >
            <Image src="/google.png" w={5} alt="Google logo" />
            <Text mx={2} color={"decorative"}>
                Dołącz z Google
            </Text>
        </Flex>
    )
}

export default GoogleAuth