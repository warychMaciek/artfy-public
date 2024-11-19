import { VStack, Text, Heading, Flex, Box, Link } from "@chakra-ui/react"
import { formatDate } from "../../utils/formatDate"
import useGetUsersProfilesByIds from "../../hooks/useGetUsersProfilesByIds"
import Person from "../../components/Person/Person"

const EventMain = props => {
    const { createdAt, title, description, type, startDate, startTime, endDate, endTime, location, address, contributorsIds, scope, addressURL } = props
    const { isLoading, users } = useGetUsersProfilesByIds(contributorsIds, 'contributors')

    if (isLoading) return <h1>loading...</h1>

    const startDateFormatted = formatDate(startDate.toDate())
    const endDateFormatted = formatDate(endDate.toDate())

    const boxStyles = {
        backgroundColor: "background",
        borderRadius: "30px",
        padding: "35px",
        boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.07)",
        position: "relative",
        margin: "5px 0",
        alignItems: "flex-start",
        width: "full"
    }

    const boxHeaderStyles = {
        fontWeight: 700,
        fontFamily: "header",
        color: "header",
        fontSize: "20px",
        lineHeight: "29px"
    }

    const boxTextStyles = {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "26px"
    }

    return (
        <VStack
            alignItems={"start"}
            gap={{ base: 4, md: 6 }}
            flex={{ base: 1, lg: 2 }}
        >
            <Text
                fontFamily={"header"}
                color={"actionSecondary"}
                fontSize={"14px"}
                fontWeight={600}
            >
                {formatDate(createdAt)}
            </Text>
            <Heading
                as="h1"
                fontFamily={"header"}
                fontSize={{ base: "32px", md: "45px" }}
                color={"header"}
            >
                {title}
            </Heading>
            <Text
                color={"text"}
                fontSize={{ base: "17px", md: "20px" }}
                lineHeight={"26px"}
                fontWeight={400}
            >
                {description}
            </Text>
            <VStack sx={boxStyles}>
                <Text sx={boxHeaderStyles}>Rodzaj eventu</Text>
                <Text sx={boxTextStyles} color={"text"}>{type}</Text>
            </VStack>
            <VStack sx={boxStyles}>
                <Text sx={boxHeaderStyles}>Strona internetowa</Text>
                <Link sx={boxTextStyles} color={"action"} href={addressURL}>{addressURL}</Link>
            </VStack>
            <Flex flexDirection={{ base: "column", md: "row" }} w={"full"} gap={{ base: 4, md: 8 }}>
                <VStack gap={4} flex={1}>
                    <VStack sx={boxStyles}>
                        <Text sx={boxHeaderStyles}>Termin</Text>
                        <Text sx={boxTextStyles} color={"text"}>{`Start: ${startTime} / ${startDateFormatted}`}</Text>
                        <Text sx={boxTextStyles} color={"text"}>{`Koniec: ${endTime} / ${endDateFormatted}`}</Text>
                    </VStack>
                    <VStack sx={boxStyles}>
                        <Text sx={boxHeaderStyles}>Lokalizacja</Text>
                        <Text sx={boxTextStyles} color={"text"}>{location}</Text>
                        <Text sx={boxTextStyles} color={"text"}>{address}</Text>
                    </VStack>
                </VStack>
                {
                    users.length > 0 && (
                        <VStack sx={boxStyles} gap={4} flex={1}>
                            <Text sx={boxHeaderStyles}>Partnerzy</Text>
                            {users.map((user, index) => (
                                <Person username={user.username} profilePicURL={user.profilePicURL} fullName={user.fullName} key={index} />
                            ))}
                        </VStack>
                    )
                }
                
            </Flex>
            {
                scope.length > 0 && (
                    <Flex gap={{ base: 2, md: 4 }} flexWrap={"wrap"}>
                        {scope.map(tag => (
                            <Box 
                                key={tag.value}
                                p={"8px 20px"}
                                border={"1px solid"}
                                borderColor={"action"}
                                color={"action"}
                                borderRadius={"30px"}
                                textTransform={"uppercase"}
                                fontFamily={"header"}
                                fontWeight={600}
                                fontSize={"14px"}
                                lineHeight={"24px"}
                            >
                                {tag.label}
                            </Box>
                        ))}
                    </Flex>
                )
            }
        </VStack>
    )
}

export default EventMain