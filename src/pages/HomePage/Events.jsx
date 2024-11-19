import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import ArtfyLink from "../../components/ArtfyButton/ArtfyLink"
import EventPreview from "../../components/Events/EventPreview"
import useGetEvents from "../../hooks/useGetEvents"

const Events = () => {
    const { isLoading, events } = useGetEvents()

    return (
        <Container maxW={1920} bgColor={"backgroundSecondary"} py={"100px"} px={{ base: 4, xl: "100px" }}>
            <Flex flexDir={{ base: "column-reverse", lg: "row" }} gap={"50px"}>
                <VStack spacing={"35px"} flex={1}>
                    {isLoading ?
                        "Loading..."
                        :
                        events.slice(0, 2).map(event => (
                            <EventPreview key={event.id} event={event} />
                        ))
                    }
                </VStack>
                <VStack flex={1} spacing={5} justifyContent={"center"} alignItems={"flex-start"} px={4} position={"relative"} maxW={{ base: "580px", md: "100%" }}>
                    <Heading
                        as="h2"
                        fontFamily={"header"}
                        color={"header" }
                        fontSize={{ base: "32px", md: "45px" }}
                        position={"relative"}
                        w={"100%"}
                        _before={{ 
                            content: "''", 
                            display: "block", 
                            position: "absolute", 
                            width: { base: "25px", lg: "40px"}, 
                            height: { base: "25px", lg: "40px"},
                            borderRadius: "50%",
                            top: { base: "-50px", lg: "-120px"},
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
                            top: { base: "-50px", lg: "-120px"},
                            right: "25%",
                            backgroundColor: "decorativeSecondary",
                            border: "2px solid",
                            borderColor: "decorativeSecondary",
                        }}
                    >
                        Organizuj lub bierz udział!
                    </Heading>
                    <Text
                        color={"text"}
                        fontSize={"17px"}
                        lineHeight={"26px"}
                    >
                        Od warsztatów fotograficznych po sesje zdjęciowe w plenerze - na Artfy znajdziesz różnorodne wydarzenia, które spełnią Twoje oczekiwania i pozwolą Ci rozwijać się w branży.
                    </Text>
                    <ArtfyLink title={"Lista wydarzeń"} gradientStyle={true} url={'/events'} withIcon={true} />
                </VStack>
            </Flex>
        </Container>
    )
}

export default Events