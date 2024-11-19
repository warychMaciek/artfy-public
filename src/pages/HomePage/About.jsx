import { Box, Container, Flex, Heading, Image, List, ListIcon, ListItem, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import AuthModal from "../../components/AuthForm/AuthModal"
import useAuthStore from "../../store/authStore"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"

const About = () => {
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Container
            maxW={1920}
            bgImage={{ base: "/about.png", md: "none" }}
            bgSize={"cover"}
            h={{ base: "100vh", md: "auto" }}
            bgPosition={"center"}
            position={"relative"}
            _before={{ content: "''", display: { base: "block", md: "none"}, bg: "#000", opacity: "0.7", w: "100%", h: "100%", position: "absolute" }}
            p={0}
        >
            <Flex gap={8} py={"100px"} px={{ base: 0, xl: "100px" }} h={"100%"} justifyContent={{ base: "center", md: "unset" }}>
                <Box flex={1} display={{ base: "none", md: "flex"}}>
                    <Box overflow="hidden" borderRadius={24} w={"100%"}>
                        <Image src="/about.png" alt="About Artfy.us" objectFit={"cover"} h={"100%"} w={"100%"} />
                    </Box>
                </Box>
                <VStack flex={1} spacing={5} justifyContent={"center"} alignItems={"flex-start"} px={4} position={"relative"} maxW={{ base: "580px", md: "100%" }}>
                    <Heading 
                        as="h4" 
                        fontFamily={"header"} 
                        color={"actionSecondary"}
                        textTransform={"uppercase"}
                        fontSize={"14px"}
                        fontWeight={600}
                        position={"relative"}
                        w={"100%"}
                        _before={{ 
                            content: "''", 
                            display: "block", 
                            position: "absolute", 
                            width: { base: "25px", lg: "40px"}, 
                            height: { base: "25px", lg: "40px"},
                            borderRadius: "50%",
                            top: "-30px",
                            right: "25%",
                            border: "2px solid",
                            borderColor: "actionSecondary",
                            zIndex: "1",
                            transform: "translateY(-35%)"
                        }}
                        _after={{ 
                            content: "''", 
                            display: "block", 
                            position: "absolute", 
                            width: { base: "25px", lg: "40px"}, 
                            height: { base: "25px", lg: "40px"},
                            borderRadius: "50%",
                            top: "-30px",
                            right: "25%",
                            backgroundColor: "decorativeSecondary",
                            border: "2px solid",
                            borderColor: "decorativeSecondary",
                        }}
                    >
                        About us
                    </Heading>
                    <Heading
                        as="h2"
                        fontFamily={"header"}
                        color={{ base: "background", md: "header" }} 
                        fontSize={{ base: "32px", md: "45px" }}
                        w={"100%"}
                    >
                        Kim Jesteśmy Co Robimy
                    </Heading>
                    <Text
                        color={{ base: "background", md: "text" }}
                        fontSize={"17px"}
                        lineHeight={"26px"}
                    >
                        Artfy to innowacyjna przestrzeń, która zmienia sposób, w jaki fotografowie i modelki tworzą, uczą się i zarabiają na swojej pasji. Nasza platforma umożliwia organizację wydarzeń z zakresu modelingu, fotografii oraz pokrewnych dziedzin, pozwalając zarówno modelkom, jak i fotografom na zdobycie dochodu dzięki swojej wiedzy i umiejętnościom.
                    </Text>
                    <List
                        color={{ base: "background", md: "text" }}
                        fontSize={"17px"}
                        lineHeight={"26px"}
                        spacing={2}
                        my={2}
                    >
                        <ListItem>
                            <ListIcon as={CheckCircleIcon} color={"actionSecondary"} />
                            Samodzielne zarabianie
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckCircleIcon} color={"actionSecondary"} />
                            Wymiana wiedzy
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CheckCircleIcon} color={"actionSecondary"} />
                            Różnorodność wydarzeń
                        </ListItem>
                    </List>
                    {
                        !authUser && (
                            <>
                                <ArtfyButton title={"Załóż konto"} gradientStyle={true} handleClick={onOpen} />
                                {isOpen && <AuthModal isOpen={isOpen} onClose={onClose} />}
                            </>
                        )
                    }
                </VStack>
            </Flex>
        </Container>
    )
}

export default About