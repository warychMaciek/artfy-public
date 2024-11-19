import { Box, Flex, Image, Text, VStack, useDisclosure } from "@chakra-ui/react"
import ArtfyButton from "../../components/ArtfyButton/ArtfyButton"
import useGetUsersProfilesByIds from "../../hooks/useGetUsersProfilesByIds"
import Person from "../../components/Person/Person"
import EventSignUp from "../../components/EventSignUp/EventSignUp"
import useAuthStore from "../../store/authStore"
import AskQuestion from "../../components/AskQuestion/AskQuestion"

const EventSide = props => {
    const { photo, price, participantsIds, slots, eventId } = props
    const { isLoading, users } = useGetUsersProfilesByIds(participantsIds, 'participants')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const authUser = useAuthStore(state => state.user)
    const isSignedUp = authUser && authUser.eventsJoined.includes(eventId)
    // const {
    //     isOpen: isAskQuestionOpen,
    //     onOpen: onAskQuestionOpen,
    //     onClose: onAskQuestionClose
    // } = useDisclosure()

    if (isLoading) return <h1>loading...</h1>

    return (
        <VStack gap={{ base: 4, md: 6 }} flex={1}>
            <Box overflow={"hidden"} borderRadius={"42px"} w={"full"} maxHeight={"600px"}>
                <Image src={photo} objectFit={"cover"} objectPosition={"center"} w={"100%"} h={"100%"} />
            </Box>
            <Box
                w={"full"}
                border={"1px solid"}
                borderColor={"action"}
                color={"action"}
                borderRadius={"30px"}
                p={"8px 20px"}
                textAlign={"center"}
                fontFamily={"header"}
                fontWeight={600}
                fontSize={"14px"}
                lineHeight={"24px"}
            >
                {`${price} PLN`}
            </Box>
            {authUser && (
                <Flex w={"full"} alignItems={"center"} gap={4}>
                    <ArtfyButton
                        title={isSignedUp ? "Wyrejestruj się" : "Zapisz się"}
                        gradientStyle={isSignedUp ? false : true}
                        handleClick={onOpen}
                        addedStyles={{ flex: 1 }}
                    />
                    <ArtfyButton 
                        title={"Zadaj pytanie"}
                        gradientStyle={false}
                        addedStyles={{ flex: 1 }}
                    />
                </Flex>
            )}
            <VStack
                backgroundColor={"background"}
                borderRadius={"30px"}
                padding={"35px"}
                boxShadow={"0 10px 25px 0 rgba(0, 0, 0, 0.07)"}
                position={"relative"}
                margin={"5px 0"}
                alignItems={"flex-start"}
                w={"full"}
            >
                <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                    <Text
                        fontWeight={700}
                        fontFamily={"header"}
                        color={"header"}
                        fontSize={"20px"}
                        lineHeight={"29px"}
                    >
                        Uczestnicy
                    </Text>
                    <Box
                        w={"40px"}
                        h={"40px"}
                        background={"linear-gradient(101.43deg, #D90368 0%, transparent 101.4%) #820263"}
                        borderRadius={"30px"}
                        color={"background"}
                        fontFamily={"header"}
                        fontWeight={600}
                        fontSize={"14px"}
                        lineHeight={"24px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        {`${participantsIds.length}/${slots.value}`}
                    </Box>
                </Flex>
                {
                    users.length > 0 && (
                        <VStack alignItems={"flex-start"}>
                            {users.map((user, index) => (
                                <Person username={user.username} profilePicURL={user.profilePicURL} fullName={user.fullName} key={index} />
                            ))}
                        </VStack>
                    )
                }
            </VStack>
            { isOpen && <EventSignUp isOpen={isOpen} onClose={onClose} isSignedUp={isSignedUp} /> }
            {/* { isAskQuestionOpen && <AskQuestion isOpen={isAskQuestionOpen} onClose={onAskQuestionClose} onOpen={onAskQuestionOpen} /> } */}
        </VStack>
    )
}

export default EventSide