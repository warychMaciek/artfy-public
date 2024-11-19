import { Container, Heading, Text, VStack, useDisclosure } from "@chakra-ui/react"
import ArtfyLink from "../../components/ArtfyButton/ArtfyLink"
import useAuthStore from "../../store/authStore"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import AuthModal from "../../components/AuthForm/AuthModal"

const CTA = () => {
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Container
            maxW={1920}
            bgImage={"/pro2.jpeg"}
            py={"100px"} px={{ base: 4, xl: "100px" }}
            bgSize={"cover"}
            bgPosition={"center"}
            position={"relative"}
            _before={{ content: "''", display: "block", width: "100%", height: "100%", bg: "linear-gradient(90deg, rgba(130, 2, 99, 0.8) 31.25%, rgba(217, 3, 104, 0.2) 100%)", position: "absolute", top: "0", left: "0" }}
        >
            <VStack
                alignItems={"flex-start"}
                maxW={"710px"}
            >
                <Heading
                    as="h4" 
                    fontFamily={"header"} 
                    color={"textLight"}
                    textTransform={"uppercase"}
                    fontSize={"14px"}
                    fontWeight={600}
                    position={"relative"}
                >
                    Zaczynamy!
                </Heading>
                <Heading
                    as="h2"
                    fontFamily={"header"}
                    color={"background"} 
                    fontSize={{ base: "36px", md: "55px" }}
                    my={"20px"}
                    position={"relative"}
                >
                    Dołącz do społeczności Artfy!
                </Heading>
                <Text
                    color={"textLight"}
                    fontSize={"20px"}
                    fontWeight={400}
                    lineHeight={"26px"}
                    position={"relative"}
                    mb={"35px"}
                >
                    Modelki mogą tworzyć i promować wydarzenia fotograficzne, ustalając opłaty za udział. Fotografowie mogą przeglądać dostępne wydarzenia i dołączać do tych, które ich interesują.
                </Text>
                {
                    authUser ?
                        <ArtfyLink title={"Stwórz wydarzenie"} url={"/add-event"} withIcon={true} addedStyles={{bg: "white", position: "relative"}} />
                    :
                        <>
                            <ArtfyButton title={"Załóż konto"} handleClick={onOpen} addedStyles={{bg: "white", position: "relative"}} />
                            {isOpen && <AuthModal isOpen={isOpen} onClose={onClose} />}
                        </>
                }
            </VStack>
        </Container>
    )
}

export default CTA