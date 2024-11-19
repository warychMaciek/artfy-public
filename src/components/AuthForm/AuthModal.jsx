import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import GoogleAuth from "./GoogleAuth"
import Login from "./Login"
import Register from "./Register"

const AuthModal = ({ isOpen, onClose, isLogging }) => {
    const [isLoginForm, setIsLoginForm] = useState(isLogging)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={"background"} border={"1px solid"} borderColor={"action"} maxW={"450px"}>
                <ModalHeader color={"text"} fontFamily={"header"}>{isLoginForm ? 'Zaloguj się' : 'Zarejestruj się'} do Artfy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} py={4}>
                        {
                            isLoginForm ? 
                            <Login closeModal={onClose} />
                            : 
                            <Register closeModal={onClose} />
                        }
                    </VStack>
                </ModalBody>
                <Divider w={"80%"} mx={"auto"} my={4} borderColor={"text"} />
                <ModalFooter justifyContent={"center"}>
                    <VStack spacing={6}>
                        <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Text color={"text"} fontSize={"16px"}>
                                {isLoginForm ? "Nie masz konta?" : "Masz już konto?"}
                            </Text>
                            <Button color={"action"} fontSize={"16px"} fontWeight={400} variant={"link"}
                                onClick={() => setIsLoginForm(isLoginForm => !isLoginForm)}
                            >
                                {isLoginForm ? "Zarejestruj się" : "Zaloguj się"}
                            </Button>
                        </Flex>

                        <Flex align={"center"} justifyContent={"center"} width={"full"} gap={1}>
                            <Box flex={2} h={"1px"} bg={"text"} opacity={"0.5"} />
                            <Text mx={1} color={"text"} opacity={"0.75"} textTransform={"uppercase"}>lub</Text>
                            <Box flex={2} h={"1px"} bg={"text"} opacity={"0.5"} />
                        </Flex>

                        <GoogleAuth closeModal={onClose} />
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AuthModal