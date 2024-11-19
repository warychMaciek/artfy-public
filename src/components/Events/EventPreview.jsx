import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Heading, Image, Text, VStack, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { formatDate } from "../../utils/formatDate"

const EventPreview = ({ event }) => {
    const { id, title, startDate, location, photos } = event

    return (
        <Box position={"relative"} w={"full"}>
            <Box w={"80%"} borderRadius={"30px"} overflow={"hidden"} h={"300px"}>
                {
                    photos[0] ?
                        <Image src={photos[0]} alt="" objectFit={"cover"} w={"100%"} h={"100%"} objectPosition={"center"} />
                    :
                        <Box bgColor={"gray.200"} h={"100%"} w={"100%"}></Box>
                }
            </Box>
            <VStack 
                position={"absolute"} 
                right={0} top={"50%"} 
                transform={"translateY(-50%)"} 
                p={"35px"}
                borderRadius={"30px"}
                bgColor={"background"}
                alignItems={"flex-start"}
                w={{ base: "80%", md: "300px" }}
                maxW={"80%"}
                boxShadow={"0 4px 4px 0 rgba(0, 0, 0, 0.25)"}
            >
                <Link
                    to={`/event/${id}`}
                    as={RouterLink}
                    color={"header"}
                    fontFamily={"header"}
                    fontSize={"20px"}
                    lineHeight={"25px"}
                    fontWeight={700}
                    mb={"10px"}
                >
                    {title}
                </Link>
                <Text
                    fontSize={"17px"}
                    lineHeight={"19px"}
                    fontWeight={400}
                    color={"text"}
                >
                    {formatDate(startDate.toDate())}
                </Text>
                <Text
                    fontSize={"17px"}
                    lineHeight={"19px"}
                    fontWeight={400}
                    color={"text"}
                    mb={"20px"}
                >
                    {location.label}
                </Text>
                <Link to={`/event/${id}`}
                    as={RouterLink}
                    fontFamily={"header"}
                    color={"action"}
                    textTransform={"uppercase"}
                    fontWeight={600}
                    fontSize={"14px"}
                    lineHeight={"20px"}
                >
                    Więcej informacji <ArrowForwardIcon />
                </Link>
            </VStack>
        </Box>
    )
}

export default EventPreview