import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"

const Person = props => {
    const { username, profilePicURL, fullName } = props

    return (
        <Link
            as={RouterLink}
            to={`/${username}`}
            role="group"
        >
            <Flex gap={4} alignItems={"center"}>
                <Avatar boxShadow={"0 4px 4px 0 rgba(0, 0, 0, 0.25)"} size={{ base: "sm", md: "md" }} src={profilePicURL} />
                <Text 
                    color={"header"} 
                    fontFamily={"header"} 
                    fontWeight={700} 
                    fontSize={"16px"} 
                    lineHeight={"29px"}
                    transition={"0.3s ease"}
                    _groupHover={{ color: "action" }}
                >
                    {fullName}
                </Text>
            </Flex>
        </Link>
    )
}

export default Person