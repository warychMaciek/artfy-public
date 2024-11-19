import { useRef, useState } from "react"
import useAuthStore from "../../store/authStore"
import usePreviewImage from "../../hooks/usePreviewImage"
import useShowToast from "../../hooks/useShowToast"
import useEditProfileImage from "../../hooks/useEditProfileImage"
import { Avatar, Box, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"

const EditProfileImage = ({ isOpen, onClose }) => {
    const authUser = useAuthStore(state => state.user)
    const fileRef = useRef(null)
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImage()
    const { isUpdating, editProfileImage } = useEditProfileImage()
    const showToast = useShowToast()
    const [ error, setError ] = useState('')

    const handleEditProfileImage = async () => {
        if (!selectedFile) {
            setError('Wybierz zdjęcie przed zapisaniem')
            return
        }
        
        try {
            
            await editProfileImage(selectedFile)
            setSelectedFile(null)
            onClose()

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"background"} border={"1px solid"} borderColor={"action"} maxW={"450px"}>
                <ModalHeader color={"text"} fontFamily={"header"}>Zmień swoje zdjęcie profilowe</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack>
                            <Avatar width={"250px"} height={"250px"} src={selectedFile || authUser.profilePicURL} />
                            <Box position={"relative"} bottom={"30px"}>
                                <ArtfyButton gradientStyle={true} title={"Wybierz zdjęcie"} handleClick={() => fileRef.current.click()} />
                            </Box>
                            {error && <Text color={"red"}>{error}</Text>}
                            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                        </VStack>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent={"center"} gap={4}>
                    <ArtfyButton title={"Anuluj"} handleClick={onClose} />
                    <ArtfyButton title={"Zapisz"} gradientStyle={true} handleClick={handleEditProfileImage} isLoading={isUpdating} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditProfileImage