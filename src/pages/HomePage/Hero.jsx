import { Box, Container, Flex, Heading, Image, Text, VStack, useDisclosure } from "@chakra-ui/react"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import GoogleAuth from "../../components/AuthForm/GoogleAuth"
import AuthModal from "../../components/AuthForm/AuthModal"
import { useState } from "react"
import useAuthStore from "../../store/authStore"

const Hero = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ isLogging, setIsLogging ] = useState(true)
    const authUser = useAuthStore(state => state.user)

    const handleClick = isLogging => {
        setIsLogging(isLogging)
        onOpen()
    }

    return (
        <Container 
            bg={"backgroundSecondary"} 
            maxW={1920} 
            h={{ base: "100vh", md: "70vh" }}
            bgImage={{ base: "/hero.png", md: "none" }}
            bgSize={"cover"}
            bgPosition={"center"}
            position={"relative"}
            _before={{ content: "''", display: { base: "block", md: "none"}, bg: "#000", opacity: "0.7", w: "100%", h: "100%", position: "absolute" }}
            py={0}
            px={{ base: 0, xl: "100px" }}
        >
            <Flex gap={8} py={"20px"} h={"100%"}>
                <VStack flex={1} justifyContent={"center"} alignItems={"center"} px={4}>
                    <Box maxW={580}>
                        <Heading 
                            as="h1" 
                            mb={{ base: 4, lg: 6 }} 
                            position={"relative"} 
                            color={{ base: "background", md: "header" }} 
                            fontFamily="header" 
                            fontSize={{ base: "40px", md: "50px", lg: "60px"}}
                        >
                            Łączyć, znaczy tworzyć
                        </Heading>
                        <Text 
                            position={"relative"} 
                            color={{ base: "background", md: "text" }} 
                            fontSize={"17px"}
                            lineHeight={"26px"}
                        >
                            Dynamiczna platforma łącząca modelki i twórców, umożliwiająca modelkom znalezienie pracy oraz kurację interesujących wydarzeń branżowych dla płynnej współpracy.
                        </Text>
                    </Box>
                    {
                        !authUser && (
                            <>
                                <Flex gap={4} mt={4} mb={8}>
                                    <ArtfyButton title="Zaloguj się" gradientStyle={true} handleClick={() => handleClick(true)} />
                                    <ArtfyButton title="Zarejestruj się" handleClick={() => handleClick(false)} />
                                </Flex>
                                {isOpen && <AuthModal isOpen={isOpen} onClose={onClose} isLogging={isLogging} />}
                                <GoogleAuth />
                            </>
                        )
                    }
                </VStack>
                <Box flex={1} display={{ base: "none", md: "flex"}}>
                    <Box overflow="hidden" borderRadius={24}>
                        <Image src="/hero.png" alt="Artfy.us" objectFit={"cover"} h={"100%"} w={"100%"} />
                    </Box>
                </Box>
            </Flex>
        </Container>
    )
}

export default Hero