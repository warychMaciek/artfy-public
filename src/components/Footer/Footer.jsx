import { EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { Box, Container, Flex, Grid, GridItem, Heading, Link, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import Caret from "../../assets/icons/caret.svg?react"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import useAuthStore from "../../store/authStore"

const Footer = () => {
    const authUser = useAuthStore(state => state.user)

    return (
        <Container 
            maxW={1920}
            bg={"linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"}
            pt={"100px"}
            px={{ base: 4, xl: "100px" }}
        >
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={"30px"}>
                <GridItem>
                    <Link as={RouterLink} to={"/"}
                        color={"background"}
                        fontFamily={"header"}
                        fontSize={{ base: "30px", md: "45px" }}
                        fontWeight={700}
                        lineHeight={"59px"}
                        transition={"0.3s ease"}
                        _hover={{ color: "actionTertiary" }}
                        textTransform={"uppercase"}
                    >
                        Artfy
                    </Link>
                    <Text
                        color={"textLight"}
                        fontSize={"17px"}
                        lineHeight={"26px"}
                        fontWeight={400}
                        my={"25px"}
                        maxW={"320px"}
                    >
                        Zapraszamy do kontaktu
                    </Text>
                    <VStack spacing={"15px"} alignItems={"flex-start"}>
                        <Link href="mailto:kontakt@artfy.us"
                            color={"textLight"}
                            fontSize={"17px"}
                            lineHeight={"26px"}
                            fontWeight={400}
                            transition={"0.3s ease"}
                            _hover={{ color: "actionTertiary" }}
                            role="group"
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                        >
                            <EmailIcon color={"background"} transition={"0.3s ease"} _groupHover={{ color: "actionTertiary" }} />
                            kontakt@artfy.us
                        </Link>
                        <Link href="tel:+62 123 456 789"
                            color={"textLight"}
                            fontSize={"17px"}
                            lineHeight={"26px"}
                            fontWeight={400}
                            transition={"0.3s ease"}
                            _hover={{ color: "actionTertiary" }}
                            role="group"
                            display={"flex"}
                            alignItems={"center"}
                            gap={"5px"}
                        >
                            <PhoneIcon color={"background"} transition={"0.3s ease"} _groupHover={{ color: "actionTertiary" }} />
                            +62 123 456 789
                        </Link>
                    </VStack>
                </GridItem>
                <GridItem>
                    <Heading
                        as={"h6"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"25px"}
                        lineHeight={"35px"}
                        color={"background"}
                        mb={"25px"}
                    >
                        Menu
                    </Heading>
                    <List spacing={"16px"}>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Home
                            </Link>
                        </ListItem>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/events"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Eventy
                            </Link>
                        </ListItem>
                        {authUser && (
                            <ListItem display={"flex"} alignItems={"center"}>
                                <ListIcon as={Caret} />
                                <Link 
                                    as={RouterLink} 
                                    to={"/add-event"}
                                    color={"textLight"}
                                    fontSize={"17px"}
                                    lineHeight={"26px"}
                                    fontWeight={400}
                                    transition={"0.3s ease"}
                                    _hover={{ color: "actionTertiary" }}
                                >
                                    Dodaj Event
                                </Link>
                            </ListItem>
                        )}
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/contact"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Kontakt
                            </Link>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem>
                    <Heading
                        as={"h6"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"25px"}
                        lineHeight={"35px"}
                        color={"background"}
                        mb={"25px"}
                    >
                        Przydatne Linki
                    </Heading>
                    <List spacing={"16px"}>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/privacy-policy"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Polityka Prywatności
                            </Link>
                        </ListItem>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/disclaimer"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Disclaimer
                            </Link>
                        </ListItem>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/terms-and-conditions"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                Zasady Korzystania
                            </Link>
                        </ListItem>
                        <ListItem display={"flex"} alignItems={"center"}>
                            <ListIcon as={Caret} />
                            <Link 
                                as={RouterLink} 
                                to={"/gdpr"}
                                color={"textLight"}
                                fontSize={"17px"}
                                lineHeight={"26px"}
                                fontWeight={400}
                                transition={"0.3s ease"}
                                _hover={{ color: "actionTertiary" }}
                            >
                                GDPR
                            </Link>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem>
                    <Heading
                        as={"h6"}
                        fontFamily={"header"}
                        fontWeight={700}
                        fontSize={"25px"}
                        lineHeight={"35px"}
                        color={"background"}
                        mb={"25px"}
                    >
                        Znajdź nas na:
                    </Heading>
                    <Text color={"textLight"} fontSize={"17px"} lineHeight={"26px"} fontWeight={400} mb={"25px"} maxW={"320px"}>
                        Zapraszamy do odwiedzenia i śledzenia nas na innych platfomach
                    </Text>
                    <Flex gap={"12px"} alignItems={"center"}>
                        <Link 
                            href="https://www.facebook.com/" 
                            isExternal
                            sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                        >
                            <FaFacebook color={"background"} />
                        </Link>
                        <Link 
                            href="https://www.instagram.com/" 
                            isExternal
                            sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                        >
                            <FaInstagram color={"background"} />
                        </Link>
                        <Link 
                            href="https://pl.linkedin.com/" 
                            isExternal
                            sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                        >
                            <FaLinkedin color={"background"} />
                        </Link>
                    </Flex>
                </GridItem>
            </Grid>
            <Box
                mt={"60px"}
                py={"30px"}
                borderTop={"1px solid rgba(255, 255, 255, 0.25)"}
                color={"background"}
                fontFamily={"header"}
                fontWeight={600}
                fontSize={"14px"}
                textAlign={"center"}
                lineHeight={"24px"}
                textTransform={"uppercase"}
            >
                Allright reserved - Artfy Inc.
            </Box>
        </Container>
    )
}

export default Footer