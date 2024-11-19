import { Avatar, Box, Button, Container, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react"
import TopBar from "./TopBar"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "../../store/authStore"
import ArtfyButton from "../ArtfyButton/ArtfyButton"
import AuthModal from "../AuthForm/AuthModal"
import { useEffect, useState } from "react"
import useLogout from "../../hooks/useLogout"

const Navbar = () => {
    const authUser = useAuthStore(state => state.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)
    const [ isScrolled, setIsScrolled ] = useState(false)
    const { handleLogout, isLoggingOut } = useLogout()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const dropdownItemStyles = {
        color: "action",
        fontFamily: "header",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "29px",
        justifyContent: "center",
    }
    const menuItemStyles = {
        fontFamily: "header",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "24px",
        color: "header",
        transition: "0.3s ease",
        _hover: { color: "action" },
        textTransform: "uppercase",
    }
    const menuStickStyles = {
        content: "''",
        display: "block",
        width: "100%",
        height: "100%",
        background: "linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)",
        borderRadius: "30px",
        position: "absolute",
        left: "0",
    }
    const navbarFixedStyles = {
        transform: { base: "none", md: "translateY(-54px)" },
        boxShadow: "0px 15px 30px -20px rgba(0, 0, 0, 0.5)",
    }

    return (
        <Container
            maxW={1920}
            px={0}
            position={"fixed"}
            top={0}
            left={0}
            right={0}
            margin={"auto"}
            transition={"0.3s ease"}
            zIndex={10}
            sx={isScrolled && navbarFixedStyles}
        >
            <TopBar />
            <Flex 
                w={"100%"} 
                px={{ base: 4, xl: "100px" }} 
                py={isScrolled ? { base: 2, md: "8px" } : { base: 2, md: "20px" }} 
                transition={"0.3s ease"}
                position={{ base: "relative", md: "static" }}
                justifyContent={"space-between"}
                alignItems={"center"}
                backgroundColor={"background"}
            >
                <Link
                    as={RouterLink} to={"/"}
                    display={"flex"}
                    color={"action"}
                    fontFamily={"header"}
                    fontSize={{ base: "30px", md: "45px" }}
                    fontWeight={700}
                    lineHeight={"59px"}
                    transition={"0.3s ease"}
                    _hover={{ color: "header" }}
                    textTransform={"uppercase"}
                    role="group"
                >
                    Art<Text color={"header"} _groupHover={{ color: "action" }}>fy</Text>
                </Link>
                <Flex
                    position={{ base: "absolute", md: "static"}}
                    width={{ base: "100vw", md: "auto"}}
                    height={{ base: isMobileMenuOpen ? "calc(100vh - 75px)" : "0", md: "auto"}}
                    backgroundColor={{ base: "background", md: "transparent"}}
                    top={"75px"}
                    left={0}
                    zIndex={1}
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={{ base: 3, md: 6, lg: "40px", '2xl': "80px" }}
                    transition={"0.3s ease"}
                    overflow={"hidden"}
                >
                    <Link
                        as={RouterLink} to={"/"}
                        sx={menuItemStyles}
                    >
                        Home
                    </Link>
                    <Link
                        as={RouterLink} to={"/events"}
                        sx={menuItemStyles}
                    >
                        Eventy
                    </Link>
                    {authUser && (
                        <Link
                            as={RouterLink} to={"/add-event"}
                            sx={menuItemStyles}
                        >
                            Dodaj event
                        </Link>
                    )}
                    <Link
                        as={RouterLink} to={"/subscription"}
                        sx={menuItemStyles}
                    >
                        Subskrypcja
                    </Link>
                    <Link
                        as={RouterLink} to={"/contact"}
                        sx={menuItemStyles}
                    >
                        Kontakt
                    </Link>
                    {authUser ?
                        <>
                            <Link
                                as={RouterLink} to={`${authUser.username}`}
                                sx={menuItemStyles}
                                display={{ base: "block", md: "none" }}
                            >
                                Profil
                            </Link>
                            <Link
                                as={RouterLink} to={"/"}
                                sx={menuItemStyles}
                                display={{ base: "block", md: "none" }}
                            >
                                Moje eventy
                            </Link>
                            <Link
                                onClick={handleLogout}
                                sx={menuItemStyles}
                                display={{ base: "block", md: "none" }}
                            >
                                Wyloguj
                            </Link>
                        </>
                    :
                        <Box display={{ base: "block", md: "none" }}>
                            <ArtfyButton title="register" gradientStyle={true} handleClick={onOpen} />
                        </Box>
                    }
                    
                </Flex>
                <Button 
                    onClick={() => setIsMobileMenuOpen(isMobileMenuOpen => !isMobileMenuOpen)} 
                    display={{ base: "block", md: "none" }} 
                    background={"none"}
                    _hover={{ background: "none" }}
                    pr={0}
                >
                    {authUser ?
                        <AvatarAndHamburger fullName={authUser.fullName} profilePicURL={authUser.profilePicURL} />
                    :
                        <Box
                            position={"relative"}
                            display={"block"}
                            height={"7px"}
                            width={"45px"}
                            borderRadius={"30px"}
                            background={"linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"}
                            _before={{ ...menuStickStyles, transform: "translateY(calc(100% + 4px))" }}
                            _after={{ ...menuStickStyles, transform: "translateY(calc(-100% - 4px))" }}
                        ></Box>
                    }
                </Button>
                <Box display={{ base: "none", md: "block" }}>
                    {authUser ?
                        <Menu>
                            <MenuButton>
                                <AvatarAndHamburger fullName={authUser.fullName} profilePicURL={authUser.profilePicURL} />
                            </MenuButton>
                            <MenuList
                                borderRadius={"12px"}
                                width={"130px"}
                                minW={"unset"}
                            >
                                <MenuItem 
                                    as={RouterLink} 
                                    to={`${authUser.username}`}
                                    sx={dropdownItemStyles}
                                    _hover={{background: "backgroundSecondary"}}
                                    _focus={{background: "backgroundSecondary"}}
                                >
                                    Profil
                                </MenuItem>
                                <MenuItem 
                                    as={RouterLink} 
                                    to={"/add-event"}
                                    sx={dropdownItemStyles}
                                    _hover={{background: "backgroundSecondary"}}
                                    _focus={{background: "backgroundSecondary"}}
                                >
                                    Dodaj event
                                </MenuItem>
                                <MenuItem 
                                    as={RouterLink} 
                                    to={"/"}
                                    sx={dropdownItemStyles}
                                    _hover={{background: "backgroundSecondary"}}
                                    _focus={{background: "backgroundSecondary"}}
                                >
                                    Moje eventy
                                </MenuItem>
                                <MenuItem 
                                    onClick={handleLogout}
                                    sx={dropdownItemStyles}
                                    _hover={{background: "backgroundSecondary"}}
                                    _focus={{background: "backgroundSecondary"}}
                                >
                                    Wyloguj
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    :
                        <ArtfyButton title="Dołącz" gradientStyle={true} handleClick={onOpen} />
                    }
                </Box>
            </Flex>
            {isOpen && <AuthModal isOpen={isOpen} onClose={onClose} isLogging={false} />}
        </Container>
    )
}

export default Navbar

const AvatarAndHamburger = ({ fullName, profilePicURL }) => {
    const menuStickStyles = {
        content: "''",
        display: "block",
        width: "100%",
        height: "100%",
        background: "linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)",
        borderRadius: "30px",
        position: "absolute",
        left: "0",
    }

    return (
        <Flex alignItems={"center"} gap={"10px"}>
            <Avatar size={{ base: "md", md: "lg" }} name={fullName} src={profilePicURL} />
            <Box
                position={"relative"}
                display={"block"}
                height={"7px"}
                width={"45px"}
                borderRadius={"30px"}
                background={"linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"}
                _before={{ ...menuStickStyles, transform: "translateY(calc(100% + 4px))" }}
                _after={{ ...menuStickStyles, transform: "translateY(calc(-100% - 4px))" }}
            ></Box>
        </Flex>
    )
}