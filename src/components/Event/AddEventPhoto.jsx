import { useRef, useState } from "react"
import usePreviewImage from "../../hooks/usePreviewImage"
import { Box, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"

const AddEventPhoto = ({ isOpen, onClose, saveEventImage }) => {
    const fileRef = useRef(null)
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImage()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const addEventImage = () => {
        if (!selectedFile) {
            setError('Wybierz zdjęcie przed zapisaniem')
            return
        }

        setIsLoading(true)
        saveEventImage(selectedFile)
        setSelectedFile(null)
        onClose()
        setIsLoading(false)
        setError('')
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"background"} border={"1px solid"} borderColor={"action"} maxW={{ base: "450px", md: "600px" }}>
                <ModalHeader color={"text"} fontFamily={"header"}>Dodaj zdjęcie</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <VStack>
                            <Box w={{ base: "300px", md: "400px", xl: "500px" }} height={{ base: "300px", md: "400px", xl: "500px" }} borderRadius={"42px"} overflow={"hidden"}>
                                <Image w={"100%"} h={"100%"} objectFit={"cover"} src={selectedFile} />
                            </Box>
                            <Box position={"relative"} bottom={"30px"}>
                                <ArtfyButton gradientStyle={true} title={"Wybierz zdjęcie"} handleClick={() => fileRef.current.click()} />
                            </Box>
                            {error && <Text color={"red"}>{error}</Text>}
                            <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                        </VStack>
                    </FormControl>
                    <ModalFooter justifyContent={"center"} gap={4}>
                        <ArtfyButton title={"Anuluj"} handleClick={onClose} />
                        <ArtfyButton title={"Zapisz"} gradientStyle={true} handleClick={addEventImage} isLoading={isLoading} />
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>        
    )
}

export default AddEventPhoto