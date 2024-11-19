import { Box, Button, Container, Flex, Heading, Image, VStack, useDisclosure } from "@chakra-ui/react"
import useAuthStore from "../../store/authStore"
import useUserProfileStore from "../../store/userProfileStore"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import ArtfyLink from "../../components/ArtfyButton/ArtfyLink"
import AddGalleryImages from "../../components/Gallery/AddGalleryImages"
import useGetUserGallery from "../../hooks/useGetUserGallery"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import useShowToast from "../../hooks/useShowToast"
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../../firebase/firebase"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import useGalleryImagesStore from "../../store/galleryImagesStore"
import ProfileSidebar from "./ProfileSidebar"

const ProfileGallery = () => {
    const { userProfile } = useUserProfileStore()
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, photos } = useGetUserGallery()
    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username
    const [ isDeleting, setIsDeleting ] = useState(false)
    const showToast = useShowToast()
    const deletePhoto = useGalleryImagesStore(state => state.deletePhoto)

    const noPhotosFound = !isLoading && photos.length === 0

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return
        if (isDeleting) return

        try {

            setIsDeleting(true)
            const imageRef = ref(storage, `images/${authUser.uid}/${imageId}`)
            await deleteObject(imageRef)
            const userRef = doc(firestore, "users", authUser.uid)
            await deleteDoc(doc(firestore, "images", imageId))

            await updateDoc(userRef, {
                photos: arrayRemove(imageId)
            })

            deletePhoto(imageId)
            showToast("Udało się!", "Zdjęcie usunięte.", "success")
            
        } catch (error) {
            showToast("Błąd", error.message, "error")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Container maxW={1920} bgColor={"background"} px={{ base: 4, xl: "100px" }} mb={"60px"}>
            <Flex flexDirection={{ base: "column", lg: "row" }} gap={{ base: 15, lg: 10, "2xl": 20 }}>
                <VStack flex={{ base: 1, md: 2 }} w={"full"}>

                    { visitingOwnProfileAndAuth && (
                        <Flex flexDir={{ base: "column-reverse", md: "row" }} gap={4} mb={"20px"}>
                            <ArtfyButton title={"Dodaj zdjęcie"} gradientStyle={true} handleClick={onOpen} />
                            <ArtfyLink title={"Dodaj event"} gradientStyle={true} url={"/add-event"} />
                            <ArtfyLink title={"Moje eventy"} gradientStyle={true} />
                        </Flex>
                    )}

                    { noPhotosFound && <Heading as={"h2"} marginTop={"20px"} fontFamily={"header"} fontSize={"24px"} textAlign={"center"}>Brak zdjęć w galerii</Heading> }

                    { !isLoading && (
                        <Box sx={{ columnCount: { base: 1, sm: 2, md: 1, lg: 2 }, columnGap: { sm: "20px", lg: "40px" } }}>
                            {photos.map(photo => (
                                <Box w={"full"} borderRadius={"42px"} overflow={"hidden"} position={"relative"} mb={{ base: "20px", md: "40px" }} key={photo.id}>
                                    { visitingOwnProfileAndAuth && (
                                        <Button
                                            position={"absolute"} 
                                            top={"15px"} 
                                            right={"15px"}
                                            padding={0}
                                            border={"1px solid"}
                                            borderColor={"action"}
                                            backgroundColor={"background"}
                                            opacity={"0.6"}
                                            transition={"0.3s ease"}
                                            _hover={{ opacity: "1" }}
                                            onClick={() => handleDeleteImage(photo.id)}
                                            isLoading={isDeleting}
                                        >
                                            <DeleteIcon color={"action"} />
                                        </Button>
                                    )}
                                    <Image src={photo.imageURL} w={"100%"} h={"100%"} objectFit={"cover"} />
                                </Box>
                            ))}
                        </Box>
                    )}

                </VStack>

                <VStack flex={1} gap={12}>
                    <ProfileSidebar />
                </VStack>
            </Flex>
            { isOpen && <AddGalleryImages isOpen={isOpen} onClose={onClose} /> }
        </Container>
    )
}

export default ProfileGallery