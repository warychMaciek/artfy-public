import { EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { Flex, Link } from "@chakra-ui/react"
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa"

const TopBar = () => {
    return (
        <Flex
            bg={"linear-gradient(101.43deg, #D90368 0%, #820263 101.4%)"}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: 8, md: 0 }}
            px={{ base: 4, xl: "100px" }}
            py={"15px"}
            display={{ base: "none", md: "flex" }}
        >
            <Flex gap={"35px"}>
                <Link 
                    href="mailto:Hello@Email.com"
                    color={"textLight"}
                    fontSize={"15px"}
                    lineHeight={"24px"}
                    fontWeight={400}
                    transition={"0.3s ease"}
                    _hover={{ color: "actionTertiary" }}
                    role="group"
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                >
                    <EmailIcon color={"background"} transition={"0.3s ease"} _groupHover={{ color: "actionTertiary" }} />
                    Hello@Email.com
                </Link>
                <Link href="tel:+62 123 456 789"
                    color={"textLight"}
                    fontSize={"15px"}
                    lineHeight={"24px"}
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
            </Flex>
            <Flex gap={{ base: 10, md: "15px" }} alignItems={"center"}>
                <Link 
                    href="https://www.facebook.com/" 
                    isExternal
                    sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                >
                    <FaFacebook color={"background"} />
                </Link>
                <Link 
                    href="https://twitter.com/" 
                    isExternal
                    sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                >
                    <FaTwitter color={"background"} />
                </Link>
                <Link 
                    href="https://www.instagram.com/" 
                    isExternal
                    sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                >
                    <FaInstagram color={"background"} />
                </Link>
                <Link 
                    href="https://pl.pinterest.com/" 
                    isExternal
                    sx={{ '& svg': {transition: "0.3s ease", width: "20px", height: "20px"} , '&:hover svg': {fill: "actionTertiary"} }}
                >
                    <FaPinterest color={"background"} />
                </Link>
            </Flex>
        </Flex>
    )
}

export default TopBar