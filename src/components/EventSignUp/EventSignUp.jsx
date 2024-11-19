import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import ArtfyButton from "../ArtfyButton/ArtfyButton"
import useSignUpForEvent from "../../hooks/useSignUpForEvent"
import useSignOffFromEvent from "../../hooks/useSignOffFromEvent";

const EventSignUp = ({ isOpen, onClose, isSignedUp }) => {
    const { isSigningUp, signUpForEvent } = useSignUpForEvent()
    const { isSigningOff, signOffFromEvent } = useSignOffFromEvent()
    const modalText = isSignedUp ? 'Czy na pewno chcesz wyrejestrować się z tego eventu?' : 'Czy na pewno chcesz zapisać się na ten event?'

    const handleSigningUp = () => {
        signUpForEvent()
        onClose()
    }

    const handleSigningOff = () => {
        signOffFromEvent()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"background"} border={"1px solid"} borderColor={"action"} maxW={{ base: "450px", md: "600px" }}>
                <ModalHeader color={"text"} fontFamily={"header"}>{modalText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <ArtfyButton 
                            title={isSignedUp ? "Wyrejestruj się" : "Zapisz się"} 
                            gradientStyle={true} 
                            handleClick={isSignedUp ? handleSigningOff : handleSigningUp}
                            isLoading={isSignedUp ? isSigningOff : isSigningUp}
                        />
                        <ArtfyButton title={"Anuluj"} handleClick={onClose} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>     
    )
}

export default EventSignUp