import { Box, Button, Heading, VStack } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import useGetUserEvents from "../../hooks/useGetUserEvents"
import EventPreview from "../../components/Events/EventPreview"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import useShowToast from "../../hooks/useShowToast"
import useUserEventsStore from "../../store/userEventsStore"
import { auth, firestore, storage } from "../../firebase/firebase"
import { deleteObject, ref } from "firebase/storage"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"

const ProfileSidebar = () => {
    const { userProfile } = useUserProfileStore()
    const authUser = useAuthStore(state => state.user)
    const { isLoading, userEventsCreated, userEventsJoined, getUserEvents } = useGetUserEvents(userProfile.eventsCreated, userProfile.eventsJoined)
    const [ isDeleting, setIsDeleting ] = useState(false)
    const showToast = useShowToast()
    const deleteUserEvent = useUserEventsStore(state => state.deleteUserEvent)
    const setAuthUser = useAuthStore(state => state.setUser)

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten event?")) return
        if (isDeleting) return

        try {

            setIsDeleting(true)

            // dodac usuwanie folderu z obrazami eventu !!!
            // const eventStorageRef = ref(storage, `eventsImages/${eventId}`)
            // await deleteObject(eventStorageRef)
            
            const userRef = doc(firestore, "users", authUser.uid)
            await deleteDoc(doc(firestore, "events", eventId))

            await updateDoc(userRef, {
                eventsCreated: arrayRemove(eventId)
            })

            deleteUserEvent(eventId)

            showToast("Udało się!", "Event usunięty.", "success")

            setAuthUser({ ...authUser, eventsCreated: authUser.eventsCreated.filter(event => event !== eventId) })

            getUserEvents(authUser.eventsCreated, authUser.eventsJoined)
            
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsDeleting(false)
        } 
    }

    const headingStyles = {
        fontFamily: "header", 
        fontSize: "25px", 
        fontWeight: 700, 
        color: "header", 
        textAlign: "center",
        marginBottom: "20px"
    }
    const containerStyles = {
        w: "full",
        boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.07)",
        padding: "35px",
        borderRadius: "30px",
    }

    return (
        <>
            <VStack sx={containerStyles}>
                <Heading as="h3" sx={headingStyles}>Organizowane przeze mnie</Heading>
                <VStack gap={"35px"} w={"full"}>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && userEventsCreated.length === 0 && <p>Brak wydarzeń</p>}
                    {!isLoading && userEventsCreated.map(event => (
                        <Box w={"full"} position={"relative"} key={event.id}>
                            {visitingOwnProfileAndAuth && (
                                <Button
                                    position={"absolute"} 
                                    top={"15px"} 
                                    left={"15px"}
                                    padding={0}
                                    border={"1px solid"}
                                    borderColor={"action"}
                                    backgroundColor={"background"}
                                    opacity={"0.6"}
                                    transition={"0.3s ease"}
                                    _hover={{ opacity: "1" }}
                                    zIndex={1}
                                    onClick={() => handleDeleteEvent(event.id)}
                                    isLoading={isDeleting}
                                >
                                    <DeleteIcon color={"action"} />
                                </Button>
                            )}
                            <EventPreview event={event} />
                        </Box>
                    ))}
                </VStack>
            </VStack>
            <VStack sx={containerStyles}>
                <Heading as="h3" sx={headingStyles}>Biorę udział w</Heading>
                <VStack gap={"35px"} w={"full"}>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && userEventsJoined && userEventsJoined.length === 0 && <p>Brak wydarzeń</p>}
                    {!isLoading && userEventsJoined.map(event => (
                        <EventPreview key={event.id} event={event} />
                    ))}
                </VStack>
            </VStack>
        </>
    )
}

export default ProfileSidebar